import * as React from "react"

import {
  TaskAssignee,
  TaskBrief,
  TaskCreatedAt,
  TaskDueDate,
  TaskTitle,
} from "@/components/assessment/task-fields"
import { PriorityIcon } from "@/components/priority-icon"
import { Checkbox } from "@/components/ui/checkbox"
import { briefs } from "@/lib/briefs"
import type { Task } from "@/lib/types"

type TaskItemProps = {
  task: Task
  onToggle: (id: number) => void
  briefView?: boolean
  compactView?: boolean
}

export function TaskItem({
  task,
  onToggle,
  briefView,
  compactView,
}: TaskItemProps) {
  const checkboxId = React.useId()

  return (
    <li className="flex items-start gap-3 py-3 text-sm">
      <PriorityIcon priority={task.priority} />
      <Checkbox
        id={checkboxId}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="mt-0.5 size-4.5 rounded-full border-muted-foreground/50"
      />
      <TaskTitle
        id={checkboxId}
        title={task.title}
        completed={task.completed}
      />
      <div className="flex shrink-0 items-center gap-1.5">
        {!compactView && <TaskAssignee assignee={task.assignee} />}
        <TaskDueDate
          dueDate={task.dueDate}
          isDueToday={briefView && dueOnBriefDay(task)}
          compactView={compactView}
        />
        {!briefView && !compactView && (
          <TaskBrief title={task.briefTitle ?? ""} />
        )}
        {!compactView && <TaskCreatedAt createdAt={task.createdAt} />}
      </div>
    </li>
  )
}

function dueOnBriefDay(task: Task) {
  const brief = briefs.find((item) => item.id === task.briefId)
  return brief != null && task.dueDate?.getTime() === brief.date.getTime()
}