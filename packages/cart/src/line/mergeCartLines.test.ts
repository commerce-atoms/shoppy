import { describe, expect, test } from "vitest";
import { mergeCartLines } from "./mergeCartLines.js";
import type { CartLine } from "../types/cartLine.js";

describe("mergeCartLines", () => {
  test("merges non-overlapping lines", () => {
    const a: CartLine[] = [{ id: "1", quantity: 1, price: 10.0 }];
    const b: CartLine[] = [{ id: "2", quantity: 2, price: 20.0 }];
    const result = mergeCartLines(a, b);
    expect(result).toHaveLength(2);
  });

  test("combines quantities for overlapping lines", () => {
    const a: CartLine[] = [{ id: "1", quantity: 1, price: 10.0 }];
    const b: CartLine[] = [{ id: "1", quantity: 2, price: 10.0 }];
    const result = mergeCartLines(a, b);
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(3);
    expect(result[0].price).toBe(10.0); // Price from first array preserved
  });

  test("preserves price from first array when merging", () => {
    const a: CartLine[] = [{ id: "1", quantity: 1, price: 10.0 }];
    const b: CartLine[] = [{ id: "1", quantity: 1, price: 20.0 }];
    const result = mergeCartLines(a, b);
    expect(result[0].price).toBe(10.0);
  });

  test("handles empty arrays", () => {
    const result = mergeCartLines([], []);
    expect(result).toHaveLength(0);
  });
});
