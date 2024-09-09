import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/utils/class-name'
import { IFormFieldComboboxSlot, SelectOptions } from '@/@types/form-field'
import { ControllerRenderProps } from 'react-hook-form'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Scrollbar } from '@radix-ui/react-scroll-area'

interface FormFieldComboboxProps {
  slot: IFormFieldComboboxSlot
  field: ControllerRenderProps<any>
}
export function FormFieldCombobox({ field, slot }: FormFieldComboboxProps) {
  const options = slot?.options ?? []
  const isMultiple = slot.multiple

  const [multipleOptionSelected, setMultipleOptionSelected] = useState<
    SelectOptions[]
  >([])
  const [singleOptionSelected, setSingleOptionSelected] =
    useState<SelectOptions | null>(null)

  const isShowPlaceholderAllowed =
    !singleOptionSelected && !field.value && !slot.multiple

  useEffect(() => {
    if (field.value) {
      setSingleOptionSelected(field.value)
    }
    if (field.value && slot.multiple) {
      setMultipleOptionSelected(field.value)
    }
  }, [field.value])

  return (
    <Popover>
      <PopoverTrigger id={field.name} asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            'h-12 bg-white dark:bg-background w-full justify-between',
            !field.value && 'text-gray-400',
          )}
        >
          {isMultiple && (
            <div className="space-x-2">
              {multipleOptionSelected.map((option) => (
                <Badge className="text-white dark:bg-black" key={option.value}>
                  {option.label}
                </Badge>
              ))}
              {multipleOptionSelected.length < 1 && (
                <span className="text-gray-400">{slot.placeholder}</span>
              )}
            </div>
          )}

          {!isMultiple && <span>{field.value?.label}</span>}

          {isShowPlaceholderAllowed && (
            <span className="text-gray-400">{slot.placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width]">
        <Command>
          <CommandInput
            className="placeholder:text-gray-400"
            placeholder={slot.placeholder}
          />
          <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>

          <CommandList>
            <ScrollArea className="max-h-[200px]">
              <CommandGroup>
                {options.map((option, index) => (
                  <CommandItem
                    className={cn(
                      'my-1 gap-2 hover:cursor-pointer hover:!bg-input transition-all',
                      field.value?.value === option.value ||
                        (multipleOptionSelected.some(
                          ({ value }) => value === option.value,
                        ) &&
                          'bg-input aria-selected:bg-input brightness-95'),
                    )}
                    key={option.label + index}
                    onSelect={() => {
                      if (slot.multiple) {
                        setMultipleOptionSelected((prevState) => {
                          const optionAlreadySelected = prevState.find(
                            (v) => v.value === option.value,
                          )

                          if (optionAlreadySelected) {
                            const filteredList = [
                              ...prevState.filter(
                                (o) => o.value !== optionAlreadySelected.value,
                              ),
                            ]
                            field.onChange(filteredList)
                            return filteredList
                          }
                          const newState = [...prevState, option]
                          field.onChange(newState)
                          return newState
                        })
                      } else {
                        setSingleOptionSelected(() => {
                          field.onChange(option)
                          return option
                        })
                      }
                    }}
                    value={String(option.label)}
                  >
                    {isMultiple && (
                      <Check
                        className={cn(
                          'h-4 w-4',

                          multipleOptionSelected.some(
                            ({ value }) => value === option.value,
                          )
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    )}

                    {!isMultiple && (
                      <Check
                        className={cn(
                          'h-4 w-4',
                          singleOptionSelected &&
                            singleOptionSelected.value === option.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    )}
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              <Scrollbar orientation="vertical" />
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
