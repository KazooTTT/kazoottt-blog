'use client'

import React from 'react'
import Giscus from '@giscus/react'

const id = 'inject-comments'

const GiscusComment = () => {
	const [theme, setTheme] = React.useState('preferred_color_scheme')

	React.useEffect(() => {
		// Initial theme setup
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme) {
			setTheme(savedTheme)
		}

		// Listen for theme changes
		const handleThemeChange = (e: CustomEvent<{ theme: string }>) => {
			setTheme(e.detail.theme)
		}

		document.addEventListener('theme-change', handleThemeChange as EventListener)

		// Listen for astro:after-swap events (view transitions)
		const handleAfterSwap = () => {
			const currentTheme = localStorage.getItem('theme')
			if (currentTheme) {
				setTheme(currentTheme)
			}
		}

		document.addEventListener('astro:after-swap', handleAfterSwap)

		return () => {
			document.removeEventListener('theme-change', handleThemeChange as EventListener)
			document.removeEventListener('astro:after-swap', handleAfterSwap)
		}
	}, [])

	return (
		<div id={id} className='mt-8 w-full'>
			<Giscus
				id={id}
				repo='KazooTTT/kazoottt-blog'
				repoId='R_kgDOMa4jRQ'
				category='Announcements'
				categoryId='DIC_kwDOMa4jRc4CjRFe'
				mapping='pathname'
				strict='0'
				reactionsEnabled='1'
				emitMetadata='0'
				inputPosition='bottom'
				theme={theme}
				lang='zh-CN'
				loading='eager'
			/>
		</div>
	)
}

export default GiscusComment
