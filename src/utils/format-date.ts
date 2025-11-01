import { format } from 'date-fns'

export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
})

export function formattedDateFNS(date: Date) {
  return date && format(new Date(date), 'dd/MM/yyyy')
}

export const formatDate = (isoString: string): string => {
  return new Date(isoString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
