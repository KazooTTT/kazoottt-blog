import type { CollectionEntry } from 'astro:content'
import React, { useState } from 'react'

type Post = CollectionEntry<'post'>
interface Props {
	posts: Post[]
	currentDate?: Date
}

interface DateTimeFormatOptions {
	year?: 'numeric' | '2-digit'
	month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
	day?: 'numeric' | '2-digit'
}

const weekDays = ['一', '二', '三', '四', '五', '六', '日']

const getFormattedDate = (date: Date, options: DateTimeFormatOptions): string => {
	return new Intl.DateTimeFormat('zh-CN', options).format(date)
}

export const Calendar: React.FC<Props> = ({ posts, currentDate: initialDate = new Date() }) => {
	const [currentDate, setCurrentDate] = useState(new Date(initialDate))

	// 将日记按日期分组
	const postsByDate = new Map<string, Post[]>()
	posts.forEach((post) => {
		const date = getFormattedDate(new Date(post.data.date), {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
		if (!postsByDate.has(date)) {
			postsByDate.set(date, [])
		}
		postsByDate.get(date)?.push(post)
	})

	// 获取所有有日记的月份
	const months = posts.map((post) => {
		const date = new Date(post.data.date)
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
	})
	const uniqueMonths = Array.from(new Set(months)).sort()

	const getCurrentMonthStr = (): string => {
		return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`
	}

	const canNavigateToMonth = (direction: 'prev' | 'next'): boolean => {
		const currentMonthStr = getCurrentMonthStr()
		if (direction === 'prev') {
			return uniqueMonths.some((m) => m < currentMonthStr)
		} else {
			const now = new Date()
			const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth())
			const thisMonth = new Date(now.getFullYear(), now.getMonth())
			return currentMonth < thisMonth
		}
	}

	const renderCalendarDays = () => {
		// 获取当月的第一天和最后一天
		const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
		const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

		// 获取当月第一天是星期几
		const firstDayWeekday = firstDayOfMonth.getDay()
		const adjustedFirstDayWeekday = firstDayWeekday === 0 ? 7 : firstDayWeekday

		// 计算日历表格需要显示的天数
		const daysInPrevMonth = adjustedFirstDayWeekday - 1
		const daysInCurrentMonth = lastDayOfMonth.getDate()
		const totalDays = Math.ceil((daysInPrevMonth + daysInCurrentMonth) / 7) * 7

		// 获取上个月的最后几天
		const lastDayOfPrevMonth = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			0
		).getDate()

		const days = []
		for (let i = 0; i < totalDays; i++) {
			const dayNumber = i - daysInPrevMonth + 1
			const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInCurrentMonth
			const displayDay = isCurrentMonth
				? dayNumber
				: dayNumber <= 0
					? lastDayOfPrevMonth + dayNumber
					: dayNumber - daysInCurrentMonth

			const date = new Date(
				currentDate.getFullYear(),
				isCurrentMonth
					? currentDate.getMonth()
					: dayNumber <= 0
						? currentDate.getMonth() - 1
						: currentDate.getMonth() + 1,
				displayDay
			)

			const formattedDate = getFormattedDate(date, {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			})

			const postsForDay = Array.from(postsByDate.get(formattedDate) || [])
			const hasPost = postsForDay.length > 0

			days.push(
				<div
					key={i}
					className={`calendar-day min-h-[100px] rounded-lg border p-2 ${
						isCurrentMonth ? 'bg-primary-foreground' : 'bg-muted/50'
					} ${hasPost ? 'border-green-400/50' : 'border-border'}`}
				>
					<div className='mb-1 text-right'>
						<span
							className={`inline-block h-7 w-7 rounded-full text-center leading-7 ${
								!isCurrentMonth ? 'text-muted-foreground' : ''
							} ${hasPost ? 'bg-green-400/20' : ''}`}
						>
							{displayDay}
						</span>
					</div>
					{hasPost && (
						<div className='space-y-1 text-xs'>
							{postsForDay.map((post: Post) => (
								<a
									key={post.slug}
									href={`/diary/${post.slug}/`}
									className='line-clamp-2 block transition-colors hover:text-green-400'
									title={post.data.title}
								>
									{post.data.title}
								</a>
							))}
						</div>
					)}
				</div>
			)
		}

		return days
	}

	const handlePrevMonth = () => {
		if (canNavigateToMonth('prev')) {
			setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
		}
	}

	const handleNextMonth = () => {
		if (canNavigateToMonth('next')) {
			setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
		}
	}

	return (
		<div className='mx-auto w-full max-w-4xl'>
			<div className='mb-4 flex items-center justify-between'>
				<button
					onClick={handlePrevMonth}
					disabled={!canNavigateToMonth('prev')}
					className={`rounded-lg border border-border px-4 py-2 hover:border-green-400/50 ${
						!canNavigateToMonth('prev') ? 'cursor-not-allowed opacity-50' : ''
					}`}
				>
					上个月
				</button>
				<h2 className='text-xl font-bold'>
					{currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
				</h2>
				<button
					onClick={handleNextMonth}
					disabled={!canNavigateToMonth('next')}
					className={`rounded-lg border border-border px-4 py-2 hover:border-green-400/50 ${
						!canNavigateToMonth('next') ? 'cursor-not-allowed opacity-50' : ''
					}`}
				>
					下个月
				</button>
			</div>

			<div className='grid grid-cols-7 gap-1'>
				{weekDays.map((day) => (
					<div key={day} className='py-2 text-center font-medium'>
						{day}
					</div>
				))}
				{renderCalendarDays()}
			</div>
		</div>
	)
}
