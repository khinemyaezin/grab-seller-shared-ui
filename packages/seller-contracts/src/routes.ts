export type RouteNode = {
  path: string;
  label?: string;
  children?: RouteNode[];
};

export const routeTree: RouteNode[] = [
  {
    path: "",
    label: "Home",
    children: [
      {
        path: "products",
        label: "Products",
        children: [
          { path: "new", label: "New Product" },
          { path: ":productId", label: "Edit Product" },
        ],
      },
      {
        path: "locations",
        label: "Locations",
        children: [
          { path: "new", label: "New Location" },
          {
            path: ":locationId",
            label: "Edit Location",
            children: [
              {
                path: "zones",
                label: "Zones",
                children: [
                  { path: "new", label: "New Zone" },
                  {
                    path: ":zoneId",
                    label: "Edit Zone",
                    children: [
                      {
                        path: "bins/new",
                        label: "New Bin",
                      },
                      {
                        path: "bins/:binId",
                        label: "Edit Bin",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { path: "login", label: "Login" },
      { path: "register", label: "Register" },
      { path: "contexts", label: "Contexts" },
      { path: "individual", label: "Individual Onboarding" },
      { path: "retailer", label: "Retailer Onboarding" },
    ],
  },
];

export const routes = {
  home: "",
  login: "login",
  register: "register",
  contextSelection: "contexts",
  individualOnboarding: 'individual',
  retailerOnboarding: 'retailer',

  // Products
  products: "products",
  newProduct: "products/new",
  editProduct: (id: string) => `products/${id}`,

  // Locations & Inventory
  locations: "locations",
  newLocation: "locations/new",
  editLocation: (locationId: string) => `locations/${locationId}`,
  zones: (locationId: string) => `locations/${locationId}/zones`,
  newZone: (locationId: string) => `locations/${locationId}/zones/new`,
  editZone: (locationId: string, zoneId: string) => `locations/${locationId}/zones/${zoneId}`,
  newBin: (locationId: string, zoneId: string) => `locations/${locationId}/zones/${zoneId}/bins/new`,
  editBin: (locationId: string, zoneId: string, binId: string) => `locations/${locationId}/zones/${zoneId}/bins/${binId}`,
} as const;
