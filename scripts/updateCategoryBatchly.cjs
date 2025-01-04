// 批量修改 ./src/content/post/* 中的frontmatter中的category

const fs = require('fs')
const path = require('path')

const contentDir = path.join(__dirname, '../src/content/post')
// full path, root path, parent path

const getCategoryMode = 'parent'
const isGetCategoryFromPath = false

function toCamelCase(str) {
	return str
		.split(' ')
		.map((word, index) => {
			if (index === 0) return word.toLowerCase()
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		})
		.join('')
}

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

	if (pathParts.length > 1) {
		if (getCategoryMode === 'full') {
			// Join all directory parts except the filename and convert to camelCase if contains spaces
			const category = pathParts.slice(0, -1).join('-')
			return category.includes(' ') ? toCamelCase(category) : category
		} else if (getCategoryMode === 'root') {
			// Just use the first directory after "post" and convert to camelCase if contains spaces
			const category = pathParts[0]
			return category.includes(' ') ? toCamelCase(category) : category
		} else if (getCategoryMode === 'parent') {
			// Just use the last directory before the filename
			const category = pathParts[pathParts.length - 2]
			return category.includes(' ') ? toCamelCase(category) : category
		}
	}

	return null
}

function processFile(filePath) {
	const fileContent = fs.readFileSync(filePath, 'utf8')

	if (!isGetCategoryFromPath) {
		return
	}

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
