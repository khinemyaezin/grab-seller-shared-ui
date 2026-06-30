export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  admin: {
    users: "/admin/users",
    editUser: (userId:string) => `/admin/users/${userId}`
  },
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
  editBin: (locationId: string, zoneId: string, binId: string) => `/dashboard/locations/${locationId}/zones/${zoneId}/bins/${binId}`,

  newSellerAccount: '/accounts/new',
  sellerAccount: (sellerId:string)=> `/accounts/${sellerId}`,
  editSellerAccount: (sellerId:string) => `/accounts/:sellerId/edit`
} as const;
