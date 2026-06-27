export const ModuleRoutes = {
    "identity": "get-identity-root",
    "inventory": "get-inventory-root",
    "catalog": "get-catalog-root"
} as const; 
export type ModuleRoutesType = typeof ModuleRoutes;
export type ModuleRouteKey = keyof ModuleRoutesType; 
export type ModuleRouteValue = ModuleRoutesType[ModuleRouteKey];