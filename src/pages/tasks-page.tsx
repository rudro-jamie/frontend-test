import { TaskList } from "@/components/assessment/lists/task-list"
import { PageHeader } from "@/components/page-header"
import type { Task } from "@/lib/types"

type TasksPageProps = {
  tasks: Task[]
  onToggle: (id: number) => void
}

export function TasksPage({ tasks, onToggle }: TasksPageProps) {
  const newestFirst = [...tasks].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  )

  return (
    <>
      <PageHeader title="Tasks" />
      <TaskList tasks={newestFirst} onToggle={onToggle} />
    </>
  )
}
