import { describe, expect, test } from "vitest";
import { getMetaobjectVideo } from "./getMetaobjectVideo.js";

describe("getMetaobjectVideo", () => {
  test("returns null when field is missing", () => {
    expect(getMetaobjectVideo(undefined)).toBeNull();
    expect(getMetaobjectVideo(null)).toBeNull();
    expect(getMetaobjectVideo({})).toBeNull();
    expect(getMetaobjectVideo({ reference: null })).toBeNull();
  });

  test("returns null when no source has a url", () => {
    expect(
      getMetaobjectVideo({
        reference: { sources: [null, { url: "  " }, { mimeType: "video/mp4" }] },
      }),
    ).toBeNull();
  });

  test("keeps usable sources in order, trimmed", () => {
    const result = getMetaobjectVideo({
      reference: {
        sources: [
          { url: " https://cdn.example.com/a.mp4 ", mimeType: "video/mp4" },
          { url: "" },
          { url: "https://cdn.example.com/a.m3u8" },
        ],
      },
    });
    expect(result).toEqual({
      sources: [
        { url: "https://cdn.example.com/a.mp4", mimeType: "video/mp4" },
        { url: "https://cdn.example.com/a.m3u8", mimeType: null },
      ],
      previewImage: null,
    });
  });

  test("includes the preview image when it has a url", () => {
    const result = getMetaobjectVideo({
      reference: {
        sources: [{ url: "https://cdn.example.com/a.mp4" }],
        previewImage: { url: "https://cdn.example.com/a.jpg", width: 1920 },
      },
    });
    expect(result?.previewImage).toEqual({
      url: "https://cdn.example.com/a.jpg",
      altText: null,
      width: 1920,
      height: null,
    });
  });
});
