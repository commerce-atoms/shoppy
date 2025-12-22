import { describe, expect, test } from "vitest";
import { getCartLineKey, createCartLineKeyFn } from "./getCartLineKey.js";
import type { CartLine } from "../types/cartLine.js";

describe("getCartLineKey", () => {
  test("returns line.id as key", () => {
    const line: CartLine = {
      id: "line-123",
      quantity: 1,
      price: 10.0,
    };
    expect(getCartLineKey(line)).toBe("line-123");
  });

  test("handles empty id", () => {
    const line: CartLine = {
      id: "",
      quantity: 1,
      price: 10.0,
    };
    expect(getCartLineKey(line)).toBe("");
  });
});

describe("createCartLineKeyFn", () => {
  test("creates custom key function", () => {
    const customKeyFn = createCartLineKeyFn((line) => {
      return `${line.merchandiseId || line.id}-custom`;
    });

    const line: CartLine = {
      id: "line-123",
      quantity: 1,
      price: 10.0,
      merchandiseId: "variant-456",
    };

    expect(customKeyFn(line)).toBe("variant-456-custom");
  });

  test("creates key function with attributes", () => {
    const byVariantAndAttrs = createCartLineKeyFn((line) => {
      const attrs = line.customAttributes
        ?.map((a) => `${a.key}:${a.value}`)
        .sort()
        .join("|") || "";
      return `${line.merchandiseId || line.id}|${attrs}`;
    });

    const line: CartLine = {
      id: "line-123",
      quantity: 1,
      price: 10.0,
      merchandiseId: "variant-456",
      customAttributes: [
        { key: "color", value: "red" },
        { key: "size", value: "large" },
      ],
    };

    expect(byVariantAndAttrs(line)).toBe("variant-456|color:red|size:large");
  });
});

