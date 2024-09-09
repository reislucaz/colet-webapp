export const fallback = (alt: string): string => {
  alt = alt.trim()
  if (alt.length <= 3) {
    return alt
  }

  const formattedAlt = alt.split(/\s+/).map((word) => word.slice(0, 1))
  return `${formattedAlt[0]}${
    formattedAlt.length > 1 ? formattedAlt[formattedAlt.length - 1] : ''
  }`
}
