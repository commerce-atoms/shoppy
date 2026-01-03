import { describe, expect, test } from "vitest";
import { getMetaobjectString } from "./getMetaobjectString.js";
import type { MetaobjectLike } from "../types/metaobject.js";

describe("getMetaobjectString", () => {
  test("returns null when metaobject is undefined", () => {
    const result = getMetaobjectString(undefined, "title");
    expect(result).toBeNull();
  });

  test("returns null when metaobject is null", () => {
    const result = getMetaobjectString(null, "title");
    expect(result).toBeNull();
  });

  test("returns null when field is missing", () => {
    const metaobject: MetaobjectLike = {
      fields: [{ key: "description", value: "Test" }],
    };
    const result = getMetaobjectString(metaobject, "title");
    expect(result).toBeNull();
  });

  test("returns null when field value is null", () => {
    const metaobject: MetaobjectLike = {
      fields: [{ key: "title", value: null }],
    };
    const result = getMetaobjectString(metaobject, "title");
    expect(result).toBeNull();
  });

  test("returns null when field value is empty string", () => {
    const metaobject: MetaobjectLike = {
      fields: [{ key: "title", value: "" }],
    };
    const result = getMetaobjectString(metaobject, "title");
    expect(result).toBeNull();
  });

  test("returns null when field value is only whitespace", () => {
    const metaobject: MetaobjectLike = {
      fields: [{ key: "title", value: "   \n\t  " }],
    };
    const result = getMetaobjectString(metaobject, "title");
    expect(result).toBeNull();
  });

  test("returns trimmed string when field has value", () => {
    const metaobject: MetaobjectLike = {
      fields: [{ key: "title", value: "  Hello World  " }],
    };
    const result = getMetaobjectString(metaobject, "title");
    expect(result).toBe("Hello World");
  });
});
