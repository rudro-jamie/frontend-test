import { TaskItem } from "@/components/assessment/task-item"
import type { Task } from "@/lib/types"

type BriefTaskListProps = {
  tasks: Task[]
  onToggle: (id: number) => void
}

export function BriefTaskList({ tasks, onToggle }: BriefTaskListProps) {
  return (
    <ul className="divide-y">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} briefView />
      ))}
    </ul>
  )
}
