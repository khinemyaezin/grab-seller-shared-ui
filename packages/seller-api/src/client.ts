import type { HateoasLink } from "./hateoas.js";
import { removeTemplateFromUrl } from "./hateoas/link-resolver.js";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  token?: string;
  params?: Record<string, string>;
};

export type ApiClientConfig = {
  baseUrl?: string;
  getAccessToken?: () => string | null | Promise<string | null>;
};

let clientConfig: Required<Pick<ApiClientConfig, "baseUrl">> & ApiClientConfig = {
  baseUrl: "/api",
};

export function configureApi(config: ApiClientConfig): void {
  clientConfig = { ...clientConfig, ...config };
}

class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data: unknown,
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "ApiError";
  }
}

async function buildUrl(endpoint: string, params?: Record<string, string>): Promise<string> {
  if (!params) return endpoint;
  const searchParams = new URLSearchParams(params);
  return `${endpoint}?${searchParams.toString()}`;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", headers = {}, body, token: suppliedToken, params } = options
  const token = suppliedToken ?? await clientConfig.getAccessToken?.() ?? undefined;

  const url = await buildUrl(endpoint, params)
  
  const fullUrl = url.startsWith("http")
    ? url
    : `${clientConfig.baseUrl}${url}`

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/hal+json, application/problem+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    credentials: "include",
  }

  const response = await fetch(fullUrl, config)

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new ApiError(response.status, response.statusText, data)
  }

  if (response.status === 204) {
    return undefined as T
  }

  const contentType = response.headers.get("content-type")
  const contentLength = response.headers.get("content-length")

  if (contentLength === "0") {
    return undefined as T
  }

  if (!contentType?.includes("application/hal+json")) {
    return undefined as T
  }

  const text = await response.text()

  if (!text.trim()) {
    return undefined as T
  }

  return JSON.parse(text) as T
}

export const api = {
  get: <T>(endpoint: string, params?: Record<string, string>, token?: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { params, token, headers }),

  post: <T>(endpoint: string, body: unknown, token?: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: "POST", body, token, headers }),

  put: <T>(endpoint: string, body: unknown, token?: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: "PUT", body, token, headers }),

  patch: <T>(endpoint: string, body: unknown, token?: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: "PATCH", body, token, headers }),

  delete: <T>(endpoint: string, token?: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: "DELETE", token, headers }),

  followLink: <T>(link: HateoasLink, method: HttpMethod = "GET", body?: unknown, params?: Record<string, string>, headers?: Record<string, string>) => {
    const href = removeTemplateFromUrl(link);
    return request<T>(href, { method, body, params, headers });
  },
};

export { ApiError };
