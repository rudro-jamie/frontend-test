import { BriefTaskList } from "@/components/assesment/lists/brief-task-list"
import { PageHeader } from "@/components/page-header"
import { formatLongDate } from "@/lib/format"
import type { Brief, Task } from "@/lib/types"

type BriefPageProps = {
  brief: Brief
  tasks: Task[]
  onToggle: (id: number) => void
}

export function BriefPage({ brief, tasks, onToggle }: BriefPageProps) {
  const briefTasks = tasks
    .filter((task) => task.briefId === brief.id)
    .sort(
      (a, b) =>
        (a.dueDate?.getTime() ?? Infinity) - (b.dueDate?.getTime() ?? Infinity)
    )

  return (
    <>
      <PageHeader title="Daily brief" />
      <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-4 text-sm leading-relaxed md:p-8">
        <header className="flex flex-col gap-1">
          <p className="text-muted-foreground">{formatLongDate(brief.date)}</p>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            {brief.title}
          </h1>
          <p className="mt-2">{brief.summary}</p>
        </header>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold">Schedule</h2>
          <ul className="flex flex-col gap-1">
            {brief.agenda.map((item) => (
              <li key={item.time}>
                <span className="tabular-nums">{item.time}</span> · {item.title}{" "}
                <span className="text-muted-foreground">
                  ({item.duration}
                  {item.location && `, ${item.location}`})
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold">Tasks</h2>
          <BriefTaskList tasks={briefTasks} onToggle={onToggle} />
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold">Heads up</h2>
          {brief.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </section>
      </article>
    </>
  )
}
