import { CalendarIcon, CalendarPlusIcon } from "lucide-react"

import { avatarColor } from "@/lib/avatar"
import { formatDay } from "@/lib/format"
import { cn } from "@/lib/utils"

export function TaskTitle({
  id,
  title,
  completed,
}: {
  id: string
  title: string
  completed: boolean
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "min-w-0 flex-1 cursor-pointer leading-snug",
        completed && "text-muted-foreground line-through"
      )}
    >
      {title}
    </label>
  )
}

export function TaskAssignee({ assignee }: { assignee: string }) {
  const firstName = assignee.split(" ")[0]

  return (
    <span
      title={assignee}
      className={cn(
        "flex h-6 items-center gap-1 rounded-full border text-xs leading-none text-muted-foreground",
        "border-transparent sm:border-border sm:pr-1.5 sm:pl-1"
      )}
    >
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded-full text-[9px] font-medium text-white",
          avatarColor(assignee)
        )}
      >
        {firstName[0]}
      </span>
      <span className="hidden sm:inline">{firstName}</span>
    </span>
  )
}

export function TaskDueDate({
  dueDate,
  isDueToday,
  compactView,
}: {
  dueDate?: Date
  isDueToday?: boolean
  compactView?: boolean
}) {
  return (
    <span
      className={cn(
        "flex h-6 items-center gap-1 rounded-full border px-1.5 text-xs leading-none text-muted-foreground",
        compactView ? "flex" : "hidden md:flex"
      )}
    >
      {dueDate ? (
        <>
          <CalendarIcon className="size-3" />
          {isDueToday ? "Today" : formatDay(dueDate)}
        </>
      ) : (
        <>
          <CalendarPlusIcon className="size-3" />
          Set date
        </>
      )}
    </span>
  )
}

export function TaskBrief({ title }: { title: string }) {
  return (
    <span className="hidden w-32 truncate text-muted-foreground lg:block">
      {title}
    </span>
  )
}

export function TaskCreatedAt({ createdAt }: { createdAt: Date }) {
  return (
    <span className="hidden w-12 text-right text-muted-foreground lg:block">
      {formatDay(createdAt)}
    </span>
  )
}
