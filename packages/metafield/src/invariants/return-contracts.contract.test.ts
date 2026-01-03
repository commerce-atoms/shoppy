// Contract test: validates return type contracts for metaobject helpers.
// Policy: Helpers must never return `undefined` - use `null` for missing values and `[]` for missing lists.

import { describe, expect, it } from "vitest";
import { getMetaobjectString } from "../metaobjects/getMetaobjectString.js";
import { getMetaobjectStringList } from "../metaobjects/getMetaobjectStringList.js";
import { getMetaobjectMediaImage } from "../metaobjects/getMetaobjectMediaImage.js";
import { getMetaobjectMediaImageList } from "../metaobjects/getMetaobjectMediaImageList.js";
import type { MetaobjectLike } from "../types/metaobject.js";

describe("Return Contract: Never Undefined", () => {
  describe("getMetaobjectString", () => {
    it("returns null, never undefined, when metaobject is undefined", () => {
      const result = getMetaobjectString(undefined, "title");
      expect(result).not.toBeUndefined();
      expect(result).toBeNull();
    });

    it("returns null, never undefined, when metaobject is null", () => {
      const result = getMetaobjectString(null, "title");
      expect(result).not.toBeUndefined();
      expect(result).toBeNull();
    });

    it("returns null, never undefined, when field is missing", () => {
      const metaobject: MetaobjectLike = {
        fields: [{ key: "other", value: "value" }],
      };
      const result = getMetaobjectString(metaobject, "title");
      expect(result).not.toBeUndefined();
      expect(result).toBeNull();
    });

    it("returns string, never undefined, when field has value", () => {
      const metaobject: MetaobjectLike = {
        fields: [{ key: "title", value: "Test Title" }],
      };
      const result = getMetaobjectString(metaobject, "title");
      expect(result).not.toBeUndefined();
      expect(typeof result).toBe("string");
    });
  });

  describe("getMetaobjectStringList", () => {
    it("returns empty array, never undefined, when metaobject is undefined", () => {
      const result = getMetaobjectStringList(undefined, "tags");
      expect(result).not.toBeUndefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);
    });

    it("returns empty array, never undefined, when metaobject is null", () => {
      const result = getMetaobjectStringList(null, "tags");
      expect(result).not.toBeUndefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);
    });

    it("returns empty array, never undefined, when field is missing", () => {
      const metaobject: MetaobjectLike = {
        fields: [{ key: "other", value: "value" }],
      };
      const result = getMetaobjectStringList(metaobject, "tags");
      expect(result).not.toBeUndefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);
    });

    it("returns array, never undefined, when field has value", () => {
      const metaobject: MetaobjectLike = {
        fields: [{ key: "tags", value: '["tag1", "tag2"]' }],
      };
      const result = getMetaobjectStringList(metaobject, "tags");
      expect(result).not.toBeUndefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getMetaobjectMediaImage", () => {
    it("returns null, never undefined, when field is undefined", () => {
      const result = getMetaobjectMediaImage(undefined);
      expect(result).not.toBeUndefined();
      expect(result).toBeNull();
    });

    it("returns null, never undefined, when field is null", () => {
      const result = getMetaobjectMediaImage(null);
      expect(result).not.toBeUndefined();
      expect(result).toBeNull();
    });

    it("returns null, never undefined, when image is missing", () => {
      const result = getMetaobjectMediaImage({});
      expect(result).not.toBeUndefined();
      expect(result).toBeNull();
    });

    it("returns object, never undefined, when image has url", () => {
      const result = getMetaobjectMediaImage({
        reference: {
          image: {
            url: "https://example.com/image.jpg",
          },
        },
      });
      expect(result).not.toBeUndefined();
      expect(result).not.toBeNull();
      expect(typeof result).toBe("object");
    });
  });

  describe("getMetaobjectMediaImageList", () => {
    it("returns empty array, never undefined, when field is undefined", () => {
      const result = getMetaobjectMediaImageList(undefined);
      expect(result).not.toBeUndefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);
    });

    it("returns empty array, never undefined, when field is null", () => {
      const result = getMetaobjectMediaImageList(null);
      expect(result).not.toBeUndefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);
    });

    it("returns empty array, never undefined, when references are missing", () => {
      const result = getMetaobjectMediaImageList({});
      expect(result).not.toBeUndefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);
    });

    it("returns array, never undefined, when images exist", () => {
      const result = getMetaobjectMediaImageList({
        references: {
          nodes: [
            {
              image: {
                url: "https://example.com/image.jpg",
              },
            },
          ],
        },
      });
      expect(result).not.toBeUndefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
