import { describe, expect, test } from "vitest";
import { getOffsetWindow } from "./getOffsetWindow.js";

describe("getOffsetWindow", () => {
  test("returns forward window with first", () => {
    const result = getOffsetWindow(100, { first: 10 });
    expect(result).toEqual({
      start: 0,
      end: 10,
      direction: "forward",
    });
  });

  test("returns forward window with afterOffset", () => {
    const result = getOffsetWindow(100, { afterOffset: 5, first: 10 });
    expect(result).toEqual({
      start: 6,
      end: 16,
      direction: "forward",
    });
  });

  test("returns backward window with last", () => {
    const result = getOffsetWindow(100, { last: 10 });
    expect(result).toEqual({
      start: 90,
      end: 100,
      direction: "backward",
    });
  });

  test("returns backward window with beforeOffset", () => {
    const result = getOffsetWindow(100, { beforeOffset: 50, last: 10 });
    expect(result).toEqual({
      start: 40,
      end: 50,
      direction: "backward",
    });
  });

  test("returns all items when no args provided", () => {
    const result = getOffsetWindow(100, {});
    expect(result).toEqual({
      start: 0,
      end: 100,
      direction: "forward",
    });
  });

  test("handles zero items", () => {
    const result = getOffsetWindow(0, { first: 10 });
    expect(result.end).toBe(0);
  });

  test("clamps to total items", () => {
    const result = getOffsetWindow(100, { afterOffset: 95, first: 10 });
    expect(result.end).toBeLessThanOrEqual(100);
  });
});
