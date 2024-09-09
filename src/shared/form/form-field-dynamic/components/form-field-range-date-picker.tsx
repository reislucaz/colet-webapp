'use client'

import * as React from 'react'
import { addDays, format, Locale } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange, SelectRangeEventHandler } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/utils/class-name'

import { ptBR } from 'date-fns/locale'

interface FormFieldRangeDatePickerProps {
  date?: DateRange
  setDate: SelectRangeEventHandler
  placeholder?: string
  className?: string
  disabled?: boolean
  locale?: Locale
}

export function FormFieldRangeDatePicker({
  placeholder,
  locale = ptBR,
}: FormFieldRangeDatePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'relative h-12 w-full bg-white dark:bg-background justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="absolute right-2 size-4 opacity-50" />
            {date?.from ? (
              date.to ? (
                <span className="flex gap-2">
                  <span className="capitalize">
                    {format(date.from, 'LLL dd, y', { locale })}
                  </span>
                  -
                  <span className="capitalize">
                    {format(date.to, 'LLL dd, y', { locale })}
                  </span>
                </span>
              ) : (
                format(date.from, 'LLL dd, y', { locale })
              )
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            locale={locale}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
