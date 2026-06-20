export type SellerRuntimeConfig = {
  appName: string;
  apiBaseUrl: string;
  remotes: {
    productManifest: string;
    inventoryManifest: string;
  };
};

export const defaultRuntimeConfig: SellerRuntimeConfig = {
  appName: "Grab Store",
  apiBaseUrl: "/api",
  remotes: {
    productManifest: "/mfe/product/mf-manifest.json",
    inventoryManifest: "/mfe/inventory/mf-manifest.json",
  },
};
