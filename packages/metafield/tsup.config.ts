import {defineConfig} from 'tsup';

export default defineConfig({
  entry: {
    'metafields/getMetafield': 'src/metafields/getMetafield.ts',
    'metafields/getMetafieldValue': 'src/metafields/getMetafieldValue.ts',
    'metaobjects/getMetaobjectReferenceFromMetafield':
      'src/metaobjects/getMetaobjectReferenceFromMetafield.ts',
    'metaobjects/getMetaobjectField': 'src/metaobjects/getMetaobjectField.ts',
    'parse/parseMetafieldValue': 'src/parse/parseMetafieldValue.ts',
    'types/metafield': 'src/types/metafield.ts',
    'types/metaobject': 'src/types/metaobject.ts',
    'types/parse': 'src/types/parse.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: false,
});
