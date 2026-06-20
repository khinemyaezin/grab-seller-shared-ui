import type { ApiRootResponse } from "./app-types.js";
import { api } from "./client.js";

export const appService = {
    getRoot: (headers?: Record<string, string>): Promise<ApiRootResponse> =>
      api.followLink<ApiRootResponse>({ href: "/" }, "GET", undefined, undefined, headers),
};
