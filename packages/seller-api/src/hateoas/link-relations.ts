export const Rel = {
  SELF: "self",
  CATALOG: "catalog",
  INVENTORY: "inventory",

  PRODUCTS: "products",
  PRODUCT: "product",
  CATEGORIES: "categories",
  CATEGORY: "category",
  VARIANT_TYPES: "variant-types",
  VARIANT_OPTIONS: "variant-options",

  INVENTORIES: "inventories",
  LOCATIONS: "locations",
  ZONES: "zones",
  BINS: "bins",

  CREATE: "create",
  UPDATE: "update",
  ACTIVATE: "activate",
  DEACTIVATE: "deactivate",

  SEARCH: "search",
  VARIATION_MATRIX: "variation-matrix",

  PARENT: "parent",
  CHILDREN: "children",
  TREE: "tree",
  COMBINATION: "combination",
  BUILD: "build",
  COMBINATIONS: "combinations",
  MOVEMENTS: "movements",
  RESERVATIONS: "reservations",
} as const;

export type LinkRelation = (typeof Rel)[keyof typeof Rel];
