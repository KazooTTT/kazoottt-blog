import type { CategoryHierarchy } from '@/types'
import React, { useState } from 'react'

interface CategoriesViewProps {
	allCategories: [string, number][]
	allCategoriesHierarchy: CategoryHierarchy[]
	defaultViewMode?: 'tree' | 'list'
}

const CategoriesView: React.FC<CategoriesViewProps> = ({
	allCategories,
	allCategoriesHierarchy,
	defaultViewMode = 'tree'
}) => {
	const [viewMode, setViewMode] = useState<'tree' | 'list'>(defaultViewMode)

	return (
		<div>
			<div className='mb-6 mt-5 flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Categories</h1>

				<div className='flex items-center gap-x-2'>
					<span className='text-sm'>View:</span>
					<div className='flex overflow-hidden rounded-md border'>
						<button
							onClick={() => setViewMode('tree')}
							className={`view-mode-btn px-2 py-1 text-sm 
                ${viewMode === 'tree' ? 'bg-primary text-white' : 'bg-white text-gray-700'}
                border-r`}
						>
							Tree
						</button>
						<button
							onClick={() => setViewMode('list')}
							className={`view-mode-btn px-2 py-1 text-sm 
                ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-700'}
                border-l`}
						>
							List
						</button>
					</div>
				</div>
			</div>

			{allCategoriesHierarchy.length === 0 && <p>No posts yet.</p>}

			{/* List View */}
			{viewMode === 'list' && (
				<div className='flex flex-col gap-y-3'>
					{allCategories.map(([category, count]) => (
						<div key={category} className='flex items-center gap-x-2'>
							<a
								className='inline-block underline underline-offset-4 hover:text-foreground/75'
								href={`/categories/${category}/`}
								title={`View posts of the Category: ${category}`}
							>
								{category}
							</a>
							<span className='inline-block'>
								- {count} post{count > 1 && 's'}
							</span>
						</div>
					))}
				</div>
			)}

			{/* Tree View */}
			{viewMode === 'tree' && (
				<div className='flex flex-col gap-y-3'>
					{allCategoriesHierarchy.map((category) => (
						<div key={category.fullCategory}>
							{/* Render root-level categories */}
							<div className='flex items-center gap-x-2'>
								<a
									className='inline-block underline underline-offset-4 hover:text-foreground/75'
									href={`/categories/${category.fullCategory}/`}
									title={`View posts of the Category: ${category.fullCategory}`}
								>
									{category.category}
								</a>
								<span className='inline-block'>
									- {category.count} post{category.count > 1 && 's'}
								</span>
							</div>

							{/* Render nested categories with indentation */}
							{category.children && Object.values(category.children).length > 0 && (
								<div className='pl-8'>
									{Object.values(category.children).map((childCategory) => (
										<div key={childCategory.fullCategory} className='flex items-center gap-x-2'>
											<a
												className='inline-block underline underline-offset-4 hover:text-foreground/75'
												href={`/categories/${childCategory.fullCategory}/`}
												title={`View posts of the Category: ${childCategory.fullCategory}`}
											>
												{childCategory.category}
											</a>
											<span className='inline-block'>
												- {childCategory.count} post{childCategory.count > 1 && 's'}
											</span>
										</div>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default CategoriesView
