import { Table, Home, Inbox, Search, Settings, DoorClosed, Bell } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Principal",
    url: "main",
    icon: Home,
  },
  {
    title: "Cadastro",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Itens",
    url: "#",
    icon: Table,
  },
  {
    title: "Notificações",
    url: "#",
    icon: Bell,
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
  {
    title: "Sair",
    url: ".",
    icon: DoorClosed,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
