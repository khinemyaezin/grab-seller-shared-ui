export const routes = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  products: "/dashboard/products",
  newProduct: "/dashboard/products/new",
  editProduct: (productId: string) => `/dashboard/products/${productId}`,
  locations: "/dashboard/locations",
  newLocation: "/dashboard/locations/new",
  editLocation: (locationId: string) => `/dashboard/locations/${locationId}`,
  zones: (locationId: string) => `/dashboard/locations/${locationId}/zones`,
  newZone: (locationId: string) => `/dashboard/locations/${locationId}/zones/new`,
  editZone: (locationId: string, zoneId: string) =>
    `/dashboard/locations/${locationId}/zones/${zoneId}`,
  newBin: (locationId: string, zoneId: string) =>
    `/dashboard/locations/${locationId}/zones/${zoneId}/bins/new`,
  editBin: (locationId: string, zoneId: string, binId: string) => `/dashboard/locations/${locationId}/zones/${zoneId}/bins/${binId}`
} as const;
