import * as React from "react"
import { ArrowUpIcon, BotIcon, XIcon } from "lucide-react"

import { CompactTaskList } from "@/components/assesment/lists/compact-task-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { Task } from "@/lib/types"

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; text: string; taskIds: number[] }

const CURRENT_USER = "Rudro"

function topTaskIds(tasks: Task[]) {
  return tasks
    .filter((task) => task.assignee === CURRENT_USER && !task.completed)
    .sort(
      (a, b) =>
        (a.dueDate?.getTime() ?? Infinity) - (b.dueDate?.getTime() ?? Infinity)
    )
    .slice(0, 3)
    .map((task) => task.id)
}

type ChatWidgetProps = {
  tasks: Task[]
  onToggle: (id: number) => void
}

export function ChatWidget({ tasks, onToggle }: ChatWidgetProps) {
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState("")
  const [messages, setMessages] = React.useState<Message[]>(() => [
    { id: 1, role: "user", text: "What should I focus on today?" },
    {
      id: 2,
      role: "assistant",
      text: "Here are your top 3 tasks, sorted by due date:",
      taskIds: topTaskIds(tasks),
    },
  ])
  const endRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" })
  }, [messages, open])

  const send = (event: React.FormEvent) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) {
      return
    }

    setMessages((current) => [
      ...current,
      { id: current.length + 1, role: "user", text },
      {
        id: current.length + 2,
        role: "assistant",
        text: "Based on your open tasks, I'd start with these:",
        taskIds: topTaskIds(tasks),
      },
    ])
    setDraft("")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            size="icon"
            aria-label={open ? "Close assistant" : "Open assistant"}
            className="fixed right-4 bottom-4 z-40 size-12 rounded-full shadow-lg"
          />
        }
      >
        {open ? <XIcon className="size-5" /> : <BotIcon className="size-5" />}
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        className="h-[36rem] max-h-[calc(100svh-6rem)] w-[min(28rem,calc(100vw-2rem))] gap-0 p-0"
      >
        <div className="flex items-center gap-2 px-4 pt-4 pb-2">
          <BotIcon className="size-4 text-muted-foreground" />
          <PopoverTitle>Assistant</PopoverTitle>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
          {messages.map((message) =>
            message.role === "user" ? (
              <p
                key={message.id}
                className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground"
              >
                {message.text}
              </p>
            ) : (
              <div key={message.id} className="flex flex-col gap-2">
                <p>{message.text}</p>
                <CompactTaskList
                  tasks={message.taskIds.flatMap((id) => {
                    const task = tasks.find((item) => item.id === id)
                    return task ? [task] : []
                  })}
                  onToggle={onToggle}
                />
              </div>
            )
          )}
          <div ref={endRef} />
        </div>

        <form onSubmit={send} className="flex gap-2 p-3">
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask about your tasks…"
            aria-label="Message"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!draft.trim()}
            aria-label="Send"
          >
            <ArrowUpIcon />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
