import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'meta/buildPageMeta': 'src/meta/buildPageMeta.ts',
    'meta/buildProductMeta': 'src/meta/buildProductMeta.ts',
    'meta/buildCollectionMeta': 'src/meta/buildCollectionMeta.ts',
    'meta/withMetaDefaults': 'src/meta/withMetaDefaults.ts',
    'jsonld/buildProductJsonLd': 'src/jsonld/buildProductJsonLd.ts',
    'jsonld/buildCollectionJsonLd': 'src/jsonld/buildCollectionJsonLd.ts',
    'jsonld/buildOrganizationJsonLd': 'src/jsonld/buildOrganizationJsonLd.ts',
    'normalize/stripHtml': 'src/normalize/stripHtml.ts',
    'normalize/normalizeText': 'src/normalize/normalizeText.ts',
    'normalize/pickSeoImage': 'src/normalize/pickSeoImage.ts',
    'types/meta': 'src/types/meta.ts',
    'types/page': 'src/types/page.ts',
    'types/product': 'src/types/product.ts',
    'types/collection': 'src/types/collection.ts',
    'types/organization': 'src/types/organization.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: false,
});

