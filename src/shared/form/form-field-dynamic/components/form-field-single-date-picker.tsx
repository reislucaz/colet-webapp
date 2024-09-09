'use client'

import * as React from 'react'
import { format, Locale } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/utils/class-name'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ptBR } from 'date-fns/locale'

interface FormFieldSingleDatePickerProps {
  date?: Date
  setDate: (date?: Date) => void
  placeholder?: string
  disabled?: boolean
  locale?: Locale
}

export function FormFieldSingleDatePicker({
  date,
  setDate,
  placeholder,
  locale = ptBR,
}: FormFieldSingleDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'relative h-12  w-full bg-white dark:bg-background justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          {date ? (
            format(date, 'PPP', { locale })
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
          <CalendarIcon className="absolute right-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[250px] p-0">
        <Calendar
          className="flex w-full justify-center p-3"
          locale={locale}
          mode="single"
          onSelect={setDate}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  )
}
