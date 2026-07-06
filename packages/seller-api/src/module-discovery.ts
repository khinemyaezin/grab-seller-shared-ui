import { ref } from "./hateoas/link-ref";

export const ModuleDiscovery = {
    "identity": ref.ROOT_INDENTITY,
    "merchant": ref.ROOT_MERCHANT
} as const; 
export type ModuleDiscoveryType = typeof ModuleDiscovery;
export type ModuleName = keyof ModuleDiscoveryType; 
export type ModuleLink = ModuleDiscoveryType[ModuleName];