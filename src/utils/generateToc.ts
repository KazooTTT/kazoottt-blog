import type { MarkdownHeading } from 'astro'

export interface TocItem extends MarkdownHeading {
	subheadings: Array<TocItem>
}

function diveChildren(item: TocItem, depth: number): Array<TocItem> {
	if (depth === 1 || !item.subheadings.length) {
		return item.subheadings
	} else {
		// e.g., 2
		return diveChildren(item.subheadings[item.subheadings.length - 1] as TocItem, depth - 1)
	}
}

export function generateToc(headings: ReadonlyArray<MarkdownHeading>) {
	const toc: Array<TocItem> = []

	headings.forEach((h) => {
		const heading: TocItem = { ...h, subheadings: [] }

		if (heading.depth === 1) {
			toc.push(heading)
		} else if (heading.depth === 2) {
			const lastH1 = toc[toc.length - 1]
			if (lastH1 && lastH1.depth === 1) {
				lastH1.subheadings.push(heading)
			} else {
				toc.push(heading)
			}
		} else {
			const lastItem = toc[toc.length - 1]
			if (!lastItem) {
				toc.push(heading)
				return
			}

			if (lastItem.depth === 1 && lastItem.subheadings.length > 0) {
				const lastH2 = lastItem.subheadings[lastItem.subheadings.length - 1]
				if (heading.depth < lastH2.depth) {
					throw new Error(`Orphan heading found: ${heading.text}.`)
				}
				const gap = heading.depth - lastH2.depth
				const target = diveChildren(lastH2, gap)
				target.push(heading)
			} else {
				if (heading.depth < lastItem.depth) {
					throw new Error(`Orphan heading found: ${heading.text}.`)
				}
				const gap = heading.depth - lastItem.depth
				const target = diveChildren(lastItem, gap)
				target.push(heading)
			}
		}
	})
	return toc
}
