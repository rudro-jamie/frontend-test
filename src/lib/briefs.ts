import type { Brief } from "./types"

export const briefs: Brief[] = [
  {
    id: "1",
    date: new Date("2026-10-12"),
    title: "Monday brief",
    summary:
      "Morning, Rudro. You have two frontend tasks due today: the onboarding PR review and the empty states for the tasks page. Meetings end by 14:30, so the afternoon is free for focused work. The Base UI migration is still your biggest open item this month.",
    agenda: [
      { time: "09:30", title: "Frontend standup", duration: "15 min" },
      {
        time: "11:00",
        title: "Settings redesign handoff with Luke",
        duration: "45 min",
        location: "Figma",
      },
      {
        time: "14:00",
        title: "1:1 with Egor",
        duration: "30 min",
        location: "Google Meet",
      },
    ],
    notes: [
      "Luke shares the new settings layout at 11:00. The dark mode contrast fix lands on the same page, so hold it until after the handoff.",
      "Egor will ask for a Base UI migration status in your 1:1. Have the list of remaining components ready.",
      "Alex moves staging to the new cluster on Thursday. Preview deploys may be down for an hour or two.",
    ],
  },
]
