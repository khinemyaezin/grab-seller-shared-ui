import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "../../theme";
import { SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";

export function ThemeToggleSidebarItem() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        tooltip={resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
      >
        {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
        <span>{resolvedTheme === "dark" ? "Light" : "Dark"}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
