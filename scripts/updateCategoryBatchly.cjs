// 批量修改 ./src/content/post/* 中的frontmatter中的category

const fs = require('fs')
const path = require('path')

const contentDir = path.join(__dirname, '../src/content/post')

function processDirectory(dir) {
	fs.readdirSync(dir).forEach((item) => {
		const itemPath = path.join(dir, item)
		const stats = fs.statSync(itemPath)

		if (stats.isDirectory()) {
			processDirectory(itemPath)
		} else if (stats.isFile() && path.extname(item) === '.md') {
			processFile(itemPath)
		}
	})
}

function getCategoryFromPath(filePath) {
	const relativePath = path.relative(contentDir, filePath)
	const pathParts = relativePath.split(path.sep)

	// The category is the first directory after "post"
	if (pathParts.length > 1) {
		return pathParts[0]
	}

	return null
}

function processFile(filePath) {
	const fileContent = fs.readFileSync(filePath, 'utf8')
	const category = getCategoryFromPath(filePath)

	if (!category) {
		console.log(`No category found for: ${filePath}`)
		return
	}

	const frontmatter = fileContent.match(/^---\n[\s\S]*?\n---/)
	if (frontmatter) {
		const frontmatterContent = frontmatter[0]
		const frontmatterLines = frontmatterContent.split('\n')

		let categoryUpdated = false
		const updatedFrontmatterLines = frontmatterLines.map((line) => {
			if (line.startsWith('category:')) {
				categoryUpdated = true
				return `category: ${category}`
			}
			return line
		})

		// Add category if it doesn't exist
		if (!categoryUpdated) {
			updatedFrontmatterLines.splice(-1, 0, `category: ${category}`)
		}

		const updatedFrontmatter = updatedFrontmatterLines.join('\n')
		const updatedFileContent = fileContent.replace(frontmatterContent, updatedFrontmatter)
		fs.writeFileSync(filePath, updatedFileContent, 'utf8')
		console.log(`Updated category to '${category}' for: ${filePath}`)
	}
}

processDirectory(contentDir)
