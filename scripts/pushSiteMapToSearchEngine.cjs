const https = require('https')
const { XMLParser } = require('fast-xml-parser')
const axios = require('axios')
const { google } = require('googleapis')
const fs = require('fs')

// Daily push quota, can be modified based on actual needs
const QUOTA = 100
const BAIDU_LIMIT = 20

async function parseSitemap(site) {
	try {
		const sitemapUrl = `${site}/sitemap-index.xml`
		const response = await axios.get(sitemapUrl, {
			httpsAgent: new https.Agent({ rejectUnauthorized: false })
		})

		const parser = new XMLParser()
		const result = parser.parse(response.data)

		// Handle different sitemap formats
		let urls = []
		if (result.sitemapindex && result.sitemapindex.sitemap) {
			// Handle sitemap index format
			const sitemaps = Array.isArray(result.sitemapindex.sitemap)
				? result.sitemapindex.sitemap
				: [result.sitemapindex.sitemap]

			// Get URLs from each sitemap
			for (const sitemap of sitemaps) {
				const sitemapResponse = await axios.get(sitemap.loc, {
					httpsAgent: new https.Agent({ rejectUnauthorized: false })
				})
				const sitemapResult = parser.parse(sitemapResponse.data)

				if (sitemapResult.urlset && sitemapResult.urlset.url) {
					const sitemapUrls = Array.isArray(sitemapResult.urlset.url)
						? sitemapResult.urlset.url.map((u) => u.loc)
						: [sitemapResult.urlset.url.loc]
					urls.push(...sitemapUrls)
				}
			}
		} else if (result.urlset && result.urlset.url) {
			// Handle direct urlset format
			urls = Array.isArray(result.urlset.url)
				? result.urlset.url.map((u) => u.loc)
				: [result.urlset.url.loc]
		}

		return urls
	} catch (error) {
		console.error('Please check if your URL is correct.')
		console.error(
			'The correct format should be a complete domain including https://, without sitemap.xml'
		)
		console.error('Correct example: https://ghlcode.cn')
		console.error('For details see: https://ghlcode.cn/fe032806-5362-4d82-b746-a0b26ce8b9d9')
		console.error('Error details:', error.message)
		return null
	}
}

async function pushToBing(site, urls, apiKey) {
	const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${apiKey}`

	const payload = {
		siteUrl: site,
		urlList: urls
	}

	try {
		const response = await axios.post(endpoint, payload, {
			httpsAgent: new https.Agent({ rejectUnauthorized: false })
		})

		if (response.status === 200) {
			console.log('Successfully pushed to Bing.')
		}
	} catch (error) {
		console.error('Error pushing to Bing:', error.response?.data?.Message || error.message)
	}
}

async function pushToBaidu(site, urls, token) {
	// Write into the txt
	urls.forEach((url) => {
		fs.appendFileSync('urls.txt', url + '\n')
	})
	const apiUrl = `http://data.zz.baidu.com/urls?site=${site}&token=${token}`

	try {
		const response = await axios.post(apiUrl, urls.join('\\n'), {
			headers: { 'Content-Type': 'text/plain' }
		})

		const result = response.data
		if (result.success) {
			console.log('Successfully pushed to Baidu.')
		} else if (result.error) {
			console.error('Error pushing to Baidu:', result.message)
		} else {
			console.error('Unknown response from Baidu:', result)
		}
	} catch (error) {
		console.error('Error pushing to Baidu:', error.response?.data?.message || error.message)
	}
}

async function pushToGoogle(urls, credentials) {
	try {
		const auth = new google.auth.GoogleAuth({
			credentials,
			scopes: ['https://www.googleapis.com/auth/indexing']
		})

		const indexing = google.indexing({ version: 'v3', auth })

		for (const url of urls) {
			try {
				await indexing.urlNotifications.publish({
					requestBody: {
						url: url,
						type: 'URL_UPDATED'
					}
				})
				console.log(`Successfully pushed ${url} to Google`)
			} catch (error) {
				console.error(`Error pushing ${url} to Google:`, error.message)
			}

			// Rate limiting to avoid hitting Google's quotas
			await new Promise((resolve) => setTimeout(resolve, 100))
		}

		console.log('Completed pushing to Google.')
	} catch (error) {
		console.error('Error setting up Google client:', error.message)
	}
}

async function main() {
	// Get command line arguments
	const args = process.argv.slice(2)
	const url = 'https://kazoottt.top'
	const baiduToken = process.env.BAIDU_TOKEN
	const bingApiKey = process.env.BING_API_KEY
	const googleCredentials = process.env.GOOGLE_CREDENTIALS
		? JSON.parse(process.env.GOOGLE_CREDENTIALS)
		: null

	if (!url) {
		console.error('Please configure URL in Github Action Secrets')
		console.error('For details see: https://ghlcode.cn/fe032806-5362-4d82-b746-a0b26ce8b9d9')
		return
	}

	// Parse URLs
	const urls = await parseSitemap(url)
	if (!urls || urls.length === 0) {
		return
	}

	// Check if URLs exceed quota
	const selectedUrls =
		urls.length > QUOTA ? urls.sort(() => Math.random() - 0.5).slice(0, QUOTA) : urls

	// Push to Bing
	if (bingApiKey) {
		console.log('Pushing to Baidu, please wait...')
		await pushToBing(url, selectedUrls, bingApiKey)
	}

	// Push to Baidu
	if (baiduToken) {
		console.log('Pushing to Baidu, please wait...')
		await pushToBaidu(url, selectedUrls, baiduToken)
	}

	// Push to Google
	if (googleCredentials) {
		console.log('Pushing to Google, please wait...')
		await pushToGoogle(selectedUrls, googleCredentials)
	}
}

main().catch(console.error)
