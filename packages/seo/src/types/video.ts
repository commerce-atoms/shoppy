/**
 * Input for building VideoObject JSON-LD.
 * Typically emitted on a page whose main content is a single video.
 */
export interface VideoJsonLdInput {
  /**
   * Video title.
   */
  name: string;

  /**
   * Short description of the video.
   */
  description?: string | null;

  /**
   * Absolute thumbnail / poster URL(s).
   * Empty values are dropped and duplicates removed.
   */
  thumbnailUrl: Array<string | null | undefined> | string | null | undefined;

  /**
   * ISO 8601 date (or date-time) the video was first published.
   */
  uploadDate: string | null | undefined;

  /**
   * ISO 8601 duration, e.g. `PT3M20S`.
   */
  duration?: string | null;

  /**
   * Absolute URL of the video file itself.
   */
  contentUrl?: string | null;

  /**
   * Absolute URL of an embeddable player (e.g. `https://www.youtube.com/embed/<id>`).
   */
  embedUrl?: string | null;

  /**
   * Canonical URL of the page hosting the video.
   */
  url?: string | null;
}
