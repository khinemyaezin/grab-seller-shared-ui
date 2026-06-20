import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
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

  it("resolves templated links and capabilities", () => {
    const link = resolveUrlTemplate({ productId: "p-1" }, { href: "/products/{productId}", templated: true });
    expect(link.href).toBe("/products/p-1");
    expect(hasLink({ edit: link }, "edit")).toBe(true);
  });
});
