import type { HalLinks, HateoasLink } from "./hateoas.js";

export interface ApiRootResponse {
  _links: HalLinks;
}

export interface ApiRoot {
  self?: HateoasLink;
  catalog?: HateoasLink;
  inventory?: HateoasLink;
}
