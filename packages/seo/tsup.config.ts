import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'meta/buildPageMeta': 'src/meta/buildPageMeta.ts',
    'meta/buildProductMeta': 'src/meta/buildProductMeta.ts',
    'meta/buildCollectionMeta': 'src/meta/buildCollectionMeta.ts',
    'jsonld/buildProductJsonLd': 'src/jsonld/buildProductJsonLd.ts',
    'jsonld/buildCollectionJsonLd': 'src/jsonld/buildCollectionJsonLd.ts',
    'normalize/stripHtml': 'src/normalize/stripHtml.ts',
    'normalize/normalizeText': 'src/normalize/normalizeText.ts',
    'normalize/pickSeoImage': 'src/normalize/pickSeoImage.ts',
    'types/meta': 'src/types/meta.ts',
    'types/page': 'src/types/page.ts',
    'types/product': 'src/types/product.ts',
    'types/collection': 'src/types/collection.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: false,
});

