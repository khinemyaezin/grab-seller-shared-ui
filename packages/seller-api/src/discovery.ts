import type { ApiRoot } from "./app-types.js";
import { appService } from "./app.js";
import { resolveLink } from "./hateoas/link-resolver.js";

export async function fetchApiRoot(): Promise<ApiRoot> {
  const response = await appService.getRoot();
  return {
    self: resolveLink(response._links, "self"),
    catalog: resolveLink(response._links, "get-catalog-root"),
    inventory: resolveLink(response._links, "get-inventory-root"),
  };
}
