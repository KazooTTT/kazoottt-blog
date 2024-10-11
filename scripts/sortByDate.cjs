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

	// 按日期排序文件
	fileInfos.sort((a, b) => a.date - b.date)

	// 重命名文件
	fileInfos.forEach((file, index) => {
		// 如果文件名已经是数字数字空格开头，则移除这个前缀
		const oldFileName = file.name
		const cleanFileName = oldFileName.replace(/^\d{2}\s/, '')

		const newName = `${index.toString().padStart(2, '0')} ${cleanFileName}`
		const newPath = path.join(dir, newName)
		fs.renameSync(file.path, newPath)
		console.log(`重命名 ${file.name} 为 ${newName}`)
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
