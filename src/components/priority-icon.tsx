import type { Task } from "@/lib/types"
import { cn } from "@/lib/utils"

const priorityLevel = { low: 1, medium: 2, high: 3 } as const

export function PriorityIcon({ priority }: { priority: Task["priority"] }) {
  const level = priorityLevel[priority]

  return (
    <span
      title={`${priority} priority`}
      className="mt-1 flex h-3 shrink-0 items-end gap-0.5"
    >
      {[1, 2, 3].map((bar) => (
        <span
          key={bar}
          className={cn(
            "w-[3px] rounded-[1px]",
            bar <= level ? "bg-muted-foreground" : "bg-muted-foreground/25"
          )}
          style={{ height: `${bar * 33}%` }}
        />
      ))}
    </span>
  )
}
