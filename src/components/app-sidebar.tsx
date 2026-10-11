import {
  ListTodoIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
  SunriseIcon,
} from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type View = "tasks" | "brief"

const items = [
  { view: "brief", label: "Daily brief", icon: SunriseIcon },
  { view: "tasks", label: "Tasks", icon: ListTodoIcon },
] as const

type AppSidebarProps = {
  view: View
  onViewChange: (view: View) => void
  openTaskCount: number
}

export function AppSidebar({
  view,
  onViewChange,
  openTaskCount,
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1">
          <a
            href="/"
            className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-md px-2 outline-none group-data-[collapsible=icon]:flex-none group-data-[collapsible=icon]:px-0 focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          >
            <img
              src="/favicon.svg"
              alt=""
              className="size-6 shrink-0 rounded-md group-data-[collapsible=icon]:mx-auto dark:ring-1 dark:ring-white/15"
            />
            <span className="truncate text-sm font-medium group-data-[collapsible=icon]:hidden">
              Jamie
            </span>
          </a>
          <ThemeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.view}>
                  <SidebarMenuButton
                    isActive={view === item.view}
                    tooltip={item.label}
                    onClick={() => onViewChange(item.view)}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                  {item.view === "tasks" && openTaskCount > 0 && (
                    <SidebarMenuBadge>{openTaskCount}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

const nextTheme = { light: "dark", dark: "system", system: "light" } as const
const themeIcon = { light: SunIcon, dark: MoonIcon, system: MonitorIcon }
const themeLabel = {
  light: "Light theme",
  dark: "Dark theme",
  system: "System theme",
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const Icon = themeIcon[theme]

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={themeLabel[theme]}
            onClick={() => setTheme(nextTheme[theme])}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          />
        }
      >
        <Icon />
      </TooltipTrigger>
      <TooltipContent side="right">{themeLabel[theme]}</TooltipContent>
    </Tooltip>
  )
}
