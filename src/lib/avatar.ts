const avatarColors = [
  "bg-emerald-500",
  "bg-pink-500",
  "bg-sky-500",
  "bg-amber-500",
  "bg-violet-500",
]

export function avatarColor(name: string) {
  let hash = 0
  for (const char of name) {
    hash = (hash * 7 + char.charCodeAt(0)) % avatarColors.length
  }
  return avatarColors[hash]
}
