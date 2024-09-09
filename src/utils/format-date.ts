import { format } from 'date-fns'

export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
})

export function formattedDateFNS(date: Date) {
  return date && format(new Date(date), 'dd/MM/yyyy')
}
