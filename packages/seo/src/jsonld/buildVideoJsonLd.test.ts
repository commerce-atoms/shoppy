import { describe, expect, test } from "vitest";
import { buildVideoJsonLd } from "./buildVideoJsonLd.js";

const required = {
  name: "Film",
  thumbnailUrl: "https://example.com/poster.jpg",
  uploadDate: "2026-03-01",
};

describe("buildVideoJsonLd", () => {
  test("returns undefined when name is empty", () => {
    expect(buildVideoJsonLd({ ...required, name: "  " })).toBeUndefined();
  });

  test("returns undefined when uploadDate is missing", () => {
    expect(buildVideoJsonLd({ ...required, uploadDate: null })).toBeUndefined();
  });

  test("returns undefined when no thumbnail survives", () => {
    expect(
      buildVideoJsonLd({ ...required, thumbnailUrl: ["", null] })
    ).toBeUndefined();
  });

  test("builds a minimal VideoObject", () => {
    expect(buildVideoJsonLd(required)).toEqual({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Film",
      thumbnailUrl: ["https://example.com/poster.jpg"],
      uploadDate: "2026-03-01",
    });
  });

  test("includes optional fields when present", () => {
    expect(
      buildVideoJsonLd({
        ...required,
        description: " A film ",
        duration: "PT3M20S",
        contentUrl: "https://cdn.example.com/film.mp4",
        embedUrl: "https://www.youtube.com/embed/abc",
        url: "https://example.com/works/film",
      })
    ).toEqual({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Film",
      thumbnailUrl: ["https://example.com/poster.jpg"],
      uploadDate: "2026-03-01",
      description: "A film",
      duration: "PT3M20S",
      contentUrl: "https://cdn.example.com/film.mp4",
      embedUrl: "https://www.youtube.com/embed/abc",
      url: "https://example.com/works/film",
    });
  });

  test("cleans thumbnails: drops empties, trims, dedupes", () => {
    const result = buildVideoJsonLd({
      ...required,
      thumbnailUrl: [
        "https://a.jpg",
        " https://a.jpg ",
        undefined,
        "https://b.jpg",
      ],
    }) as { thumbnailUrl?: string[] };
    expect(result.thumbnailUrl).toEqual(["https://a.jpg", "https://b.jpg"]);
  });

  test("omits empty optional fields", () => {
    const result = buildVideoJsonLd({
      ...required,
      description: "",
      embedUrl: null,
    }) as Record<string, unknown>;
    expect(result).not.toHaveProperty("description");
    expect(result).not.toHaveProperty("embedUrl");
  });
});
