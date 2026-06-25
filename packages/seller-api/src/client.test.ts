import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { api, configureApi } from "./client";
import { hasLink, resolveUrlTemplate } from "./hateoas/link-resolver";

const server = setupServer(
  http.get("http://api.test/api/resource", () =>
    HttpResponse.json({ value: "ok" }, { headers: { "content-type": "application/hal+json" } }),
  ),
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("seller API contracts", () => {
  it("follows relative HAL links through the configured API base", async () => {
    configureApi({ baseUrl: "http://api.test/api" });
    await expect(api.followLink<{ value: string }>({ href: "/resource" })).resolves.toEqual({ value: "ok" });
  });

  it("does not inject bearer credentials into frontend requests", async () => {
    let authorizationHeader: string | null = null;
    server.use(
      http.get("http://api.test/api/cookie-only", ({ request }) => {
        authorizationHeader = request.headers.get("authorization");
        return HttpResponse.json(
          { value: "ok" },
          { headers: { "content-type": "application/hal+json" } },
        );
      }),
    );

    configureApi({ baseUrl: "http://api.test/api", platform: undefined });
    await api.get<{ value: string }>("/cookie-only");

    expect(authorizationHeader).toBeNull();
  });

  it("refreshes through the platform and retries one unauthorized request", async () => {
    let protectedCalls = 0;
    const refresh = vi.fn().mockResolvedValue(undefined);
    server.use(
      http.get("http://api.test/api/protected", () => {
        protectedCalls += 1;
        if (protectedCalls === 1) {
          return new HttpResponse(null, { status: 401, statusText: "Unauthorized" });
        }

        return HttpResponse.json(
          { value: "ok" },
          { headers: { "content-type": "application/hal+json" } },
        );
      }),
    );

    configureApi({
      baseUrl: "http://api.test/api",
      platform: {
        session: {
          refresh,
        },
      },
    });

    await expect(api.get<{ value: string }>("/protected")).resolves.toEqual({ value: "ok" });
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(protectedCalls).toBe(2);
  });

  it("resolves templated links and capabilities", () => {
    const link = resolveUrlTemplate({ productId: "p-1" }, { href: "/products/{productId}", templated: true });
    expect(link.href).toBe("/products/p-1");
    expect(hasLink({ edit: link }, "edit")).toBe(true);
  });
});
