import {
  LogOutIcon,
  MoonIcon,
  MoreVerticalIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";

import { useTheme } from "../../theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

export function NavUser({
  user,
  onLogout,
  menuItems,
}: {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout: () => void;
  menuItems?: React.ReactNode;
}) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="w-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || "User"}
                  className="size-8 rounded-lg object-cover"
                />
              ) : (
                <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-semibold">
                  <UserIcon className="size-4" />
                </div>
              )}
              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="truncate font-semibold">{user.name || "User"}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User"}
                    className="size-8 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-semibold">
                    <UserIcon className="size-4" />
                  </div>
                )}
                <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                  <span className="truncate font-semibold">{user.name || "User"}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {menuItems}
            <DropdownMenuItem onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
              {resolvedTheme === "dark" ? <SunIcon className="mr-2 size-4" /> : <MoonIcon className="mr-2 size-4" />}
              {resolvedTheme === "dark" ? "Dark" : "Light"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOutIcon className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
