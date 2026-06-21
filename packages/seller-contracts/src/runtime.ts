export type SellerRuntimeConfig = {
  readonly appName: string;
  readonly apiBaseUrl: string;
  readonly remotes: {
    readonly productManifest: string;
    readonly inventoryManifest: string;
  };
};

export const defaultRuntimeConfig: Readonly<SellerRuntimeConfig> = {
  appName: "Grab Store",
  apiBaseUrl: "/api",
  remotes: {
    productManifest: "/mfe/grab-seller-product/mf-manifest.json",
    inventoryManifest: "/mfe/grab-seller-inventory/mf-manifest.json",
  },
};
