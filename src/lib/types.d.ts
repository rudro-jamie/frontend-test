export type Task = {
  id: number
  title: string
  dueDate?: Date
  createdAt: Date
  completed: boolean
  priority: "low" | "medium" | "high"
  assignee: string
  briefId?: string
  briefTitle?: string
}

export type AgendaItem = {
  time: string
  title: string
  duration: string
  location?: string
}

export type Brief = {
  id: string
  date: Date
  title: string
  summary: string
  agenda: AgendaItem[]
  notes: string[]
}
