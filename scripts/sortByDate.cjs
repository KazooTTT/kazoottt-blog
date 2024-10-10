const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const contentDir = path.join(__dirname, '../src/content/post')

function processDirectory(dir) {
	const files = fs.readdirSync(dir).filter((file) => path.extname(file) === '.md')
	const fileInfos = files.map((file) => {
		const filePath = path.join(dir, file)
		const content = fs.readFileSync(filePath, 'utf8')
		const { data } = matter(content)
		return {
			name: file,
			path: filePath,
			date: new Date(data.date)
		}
	})

	// Sort files by date
	fileInfos.sort((a, b) => a.date - b.date)

	// Rename files
	fileInfos.forEach((file, index) => {
		const newName = `${index.toString().padStart(2, '0')} ${file.name}`
		const newPath = path.join(dir, newName)
		fs.renameSync(file.path, newPath)
		console.log(`Renamed ${file.name} to ${newName}`)
	})
}

function processAllDirectories(baseDir) {
	const items = fs.readdirSync(baseDir)
	items.forEach((item) => {
		const itemPath = path.join(baseDir, item)
		if (fs.statSync(itemPath).isDirectory()) {
			processDirectory(itemPath)
		}
	})
}

processAllDirectories(contentDir)
