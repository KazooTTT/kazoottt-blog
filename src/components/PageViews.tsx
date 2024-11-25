'use client'

import { useEffect, useState } from 'react'

interface PageViewsProps {
	slug: string
}

export default function PageViews({ slug }: PageViewsProps) {
	const [views, setViews] = useState<number | null>(null)

	useEffect(() => {
		console.log('PageViews component mounted with slug:', slug)
		async function updatePageView() {
			try {
				// First increment the view count
				const postResponse = await fetch(`/api/pageview/${slug}`, {
					method: 'POST'
				})
				if (!postResponse.ok) throw new Error('Failed to increment view count')

				// Then get the updated count
				const { views } = await postResponse.json()
				console.log('Updated views:', views)
				setViews(views)
			} catch (error) {
				console.error('Error updating page views:', error)
				setViews(null)
			}
		}

		updatePageView()
	}, [slug])

	return <span className='text-sm text-gray-500'>Views: {views === null ? '-' : views}</span>
}
