import * as React from "react"
import { format, startOfYear, endOfYear, eachMonthOfInterval } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { DayPicker } from "react-day-picker"
import dayjs from "dayjs"
import { PopoverClose } from "@radix-ui/react-popover"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
	placeholder?: string
	onSelect: (date?: Date) => void
	initialValue?: Date
}

export function DatePicker({
	className,
	showOutsideDays = true,
	placeholder = "Pick a date",
	initialValue,
	onSelect,
	...props
}: CalendarProps) {
	const [date, setDate] = React.useState(initialValue)
	const [month, setMonth] = React.useState<number>(
		date
			? date.getMonth()
			: props.defaultMonth
				? props.defaultMonth.getMonth()
				: new Date().getMonth(),
	)
	const [year, setYear] = React.useState<number>(
		date
			? date.getFullYear()
			: props.defaultMonth
				? props.defaultMonth.getFullYear()
				: new Date().getFullYear(),
	)

	const years = React.useMemo(() => {
		const currentYear = new Date().getFullYear()
		return Array.from(
			{ length: currentYear - 1900 + 1 },
			(_, i) => currentYear - i,
		)
	}, [])

	const months = React.useMemo(() => {
		if (year) {
			return eachMonthOfInterval({
				start: startOfYear(new Date(year, 0, 1)),
				end: endOfYear(new Date(year, 0, 1)),
			})
		}
		return []
	}, [year])

	const handleYearChange = (selectedYear: string) => {
		const newYear = parseInt(selectedYear, 10)
		setYear(newYear)
		if (date) {
			const newDate = new Date(date)
			newDate.setFullYear(newYear)
			setDate(newDate)
			onSelect(newDate)
		}
	}

	const handleMonthChange = (selectedMonth: string) => {
		const newMonth = parseInt(selectedMonth, 10)
		setMonth(newMonth)
		if (date) {
			const newDate = new Date(date)
			newDate.setMonth(newMonth)
			setDate(newDate)
			onSelect(newDate)
		} else {
			setDate(new Date(year, newMonth, 1))
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"m-0 w-full justify-between px-3 text-left font-normal",
						className,
					)}
				>
					{date ? dayjs(date).format("MM/DD/YYYY") : <span>{placeholder}</span>}
					<CalendarIcon className="h-4 w-4 text-muted-foreground" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<div className="flex justify-between space-x-1 p-2">
					<Select onValueChange={handleYearChange} value={year.toString()}>
						<SelectTrigger className="w-[120px]">
							<SelectValue placeholder="Year" />
						</SelectTrigger>
						<SelectContent>
							{years.map((y) => (
								<SelectItem key={y} value={y.toString()}>
									{y}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select onValueChange={handleMonthChange} value={month.toString()}>
						<SelectTrigger className="w-[120px]">
							<SelectValue placeholder="Month" />
						</SelectTrigger>
						<SelectContent>
							{months.map((m, index) => (
								<SelectItem key={index} value={index.toString()}>
									{format(m, "MMMM")}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<PopoverClose asChild>
					<Calendar
						// {...props}
						mode="single"
						selected={date}
						month={new Date(year, month)}
						onMonthChange={(newMonth) => {
							setMonth(newMonth.getMonth())
							setYear(newMonth.getFullYear())
						}}
						initialFocus
						showOutsideDays={showOutsideDays}
						className={cn("p-3")}
						onSelect={(date) => {
							if (date) {
								setMonth(date.getMonth())
								setYear(date.getFullYear())
							}
							setDate(date)
							onSelect(date)
						}}
						toDate={props.toDate}
						defaultMonth={props.defaultMonth}
					/>
				</PopoverClose>
			</PopoverContent>
		</Popover>
	)
}
