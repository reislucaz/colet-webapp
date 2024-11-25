export function timeAgo(date: Date) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) {
    return `${years} ano${years > 1 ? 's' : ''} atrás`
  }

  if (months > 0) {
    return `${months} mês${months > 1 ? 's' : ''} atrás`
  }

  if (weeks > 0) {
    return `${weeks} semana${weeks > 1 ? 's' : ''} atrás`
  }

  if (days > 0) {
    return `${days} dia${days > 1 ? 's' : ''} atrás`
  }

  if (hours > 0) {
    return `${hours} hora${hours > 1 ? 's' : ''} atrás`
  }

  if (minutes > 0) {
    return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`
  }

  return `${seconds} segundo${seconds > 1 ? 's' : ''} atrás`
}
