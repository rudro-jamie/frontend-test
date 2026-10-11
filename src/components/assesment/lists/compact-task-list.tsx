import { TaskItem } from "@/components/assesment/task-item"
import type { Task } from "@/lib/types"

type CompactTaskListProps = {
  tasks: Task[]
  onToggle: (id: number) => void
}

export function CompactTaskList({ tasks, onToggle }: CompactTaskListProps) {
  return (
    <ul className="flex flex-col">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} compactView />
      ))}
    </ul>
  )
}
