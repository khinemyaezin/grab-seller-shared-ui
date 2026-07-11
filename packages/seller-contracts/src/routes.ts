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
} as const;
