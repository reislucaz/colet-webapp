import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function timeAgo(date: Date) {
  return formatDistanceToNow(date, {
    addSuffix: true,
    includeSeconds: true,
    locale: ptBR,
  })
}
