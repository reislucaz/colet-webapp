'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/utils/class-name'
import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex gap-2',
        caption_label: 'text-sm font-medium capitalize text-center hidden',
        cell: cn(
          'inline-flex h-8 w-full items-center justify-center text-center text-sm font-medium',
        ),
        day: cn(
          'h-full w-full hover:bg-primary hover:text-accent dark:hover:bg-secondary hover:text-white rounded-md',
        ),
        day_disabled: cn('text-muted-foreground/50'),
        day_hidden: 'invisible',
        day_outside: cn(
          'text-muted-foreground/50 dark:text-white/50 [&[aria-selected=true]]:text-accent dark:[&[aria-selected=true]]:text-slate-200/50',
        ),
        day_range_start: 'rounded-r-none !rounded-l-md',
        day_range_end: 'rounded-l-none !rounded-r-md',
        day_range_middle:
          'aria-selected:bg-gray-300 aria-selected:text-accent-foreground rounded-none',
        day_selected: cn(
          ' bg-primary text-accent dark:bg-secondary dark:text-white',
        ),
        day_today: cn('bg-accent'),
        head_cell:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] capitalize',
        head_row: 'flex w-full justify-around mt-4 items-center',
        month: 'w-max',
        nav: 'space-x-1 mt-4 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'h-7 bg-none p-0 opacity-50 hover:opacity-100',
        ),

        root: '@container',
        row: 'flex justify-between w-full mt-2',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full space-y-1',
        tbody: 'w-full',
        dropdown_year: 'flex gap-2 w-full items-center justify-between',
        dropdown_icon: 'hidden',
        dropdown_month: 'flex gap-2 w-full items-center justify-between',
        vhidden: 'hidden',
        caption_dropdowns: 'flex gap-2 w-full justify-center items-center',
        dropdown:
          'border-gray700 max-w-[11.5rem] bg-background appearance-none ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between border-b px-2 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="size-4" {...props} />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="size-4" {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
