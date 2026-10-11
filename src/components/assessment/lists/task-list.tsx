import { TaskItem } from "@/components/assessment/task-item"
import type { Task } from "@/lib/types"

type TaskListProps = {
  tasks: Task[]
  onToggle: (id: number) => void
}

export function TaskList({ tasks, onToggle }: TaskListProps) {
  return (
    <ul className="mx-auto w-full max-w-5xl divide-y px-4 py-2 md:px-8 md:py-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  )
}
