'use client'

import React from 'react'
import Giscus from '@giscus/react'

const id = 'inject-comments'

const GiscusComment = () => {
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
				theme={localStorage.getItem('theme') ?? 'preferred_color_scheme'}
				lang='zh-CN'
				loading='lazy'
			/>
		</div>
	)
}

export default GiscusComment
