import { describe, expect, test } from "vitest";
import { calculateSubtotal } from "./calculateSubtotal.js";
import type { CartLine } from "../types/cartLine.js";

describe("calculateSubtotal", () => {
  test("calculates subtotal for single line", () => {
    const lines: CartLine[] = [{ id: "1", quantity: 2, price: 10.0 }];
    const result = calculateSubtotal(lines);
    expect(result).toBe(20.0);
  });

  test("calculates subtotal for multiple lines", () => {
    const lines: CartLine[] = [
      { id: "1", quantity: 2, price: 10.0 },
      { id: "2", quantity: 1, price: 20.0 },
    ];
    const result = calculateSubtotal(lines);
    expect(result).toBe(40.0);
  });

  test("returns zero for empty array", () => {
    const result = calculateSubtotal([]);
    expect(result).toBe(0);
  });

  test("handles zero quantity", () => {
    const lines: CartLine[] = [{ id: "1", quantity: 0, price: 10.0 }];
    const result = calculateSubtotal(lines);
    expect(result).toBe(0);
  });

  test("handles decimal prices", () => {
    const lines: CartLine[] = [
      { id: "1", quantity: 2, price: 9.99 },
      { id: "2", quantity: 1, price: 19.99 },
    ];
    const result = calculateSubtotal(lines);
    expect(result).toBeCloseTo(39.97);
  });
});
