import * as React from "react"

import { AppSidebar, type View } from "@/components/app-sidebar"
import { ChatWidget } from "@/components/chat-widget"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { briefs } from "@/lib/briefs"
import { tasks as initialTasks } from "@/lib/tasks"
import { BriefPage } from "@/pages/brief-page"
import { TasksPage } from "@/pages/tasks-page"

export default function App() {
  const [view, setView] = React.useState<View>("brief")
  const [tasks, setTasks] = React.useState(initialTasks)

  const toggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const openTaskCount = tasks.filter((task) => !task.completed).length

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          view={view}
          onViewChange={setView}
          openTaskCount={openTaskCount}
        />
        <SidebarInset>
          {view === "tasks" ? (
            <TasksPage tasks={tasks} onToggle={toggleTask} />
          ) : (
            <BriefPage brief={briefs[0]} tasks={tasks} onToggle={toggleTask} />
          )}
        </SidebarInset>
      </SidebarProvider>
      <ChatWidget tasks={tasks} onToggle={toggleTask} />
    </TooltipProvider>
  )
}
