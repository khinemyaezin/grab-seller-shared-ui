import { useEffect } from "react";
import { usePlatform } from "@/context";

export function useShellBreadcrumb(leaf: string | undefined) {
  const platform = usePlatform();

  useEffect(() => {
    if (!leaf) {
      return;
    }

    platform?.events.publish("shell:breadcrumb:v1", { leaf });

    return () => {
      platform?.events.publish("shell:breadcrumb:v1", { leaf: null });
    };
  }, [leaf]);
}
