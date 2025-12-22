import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'normalize/normalizeSelectedOptions': 'src/normalize/normalizeSelectedOptions.ts',
    'find/findVariant': 'src/find/findVariant.ts',
    'defaults/pickDefaultVariant': 'src/defaults/pickDefaultVariant.ts',
    'availability/getAvailabilityMap': 'src/availability/getAvailabilityMap.ts',
    'availability/isSelectionValid': 'src/availability/isSelectionValid.ts',
    'url/getSelectedOptionsFromUrl': 'src/url/getSelectedOptionsFromUrl.ts',
    'url/selectedOptionsToUrlParams': 'src/url/selectedOptionsToUrlParams.ts',
    'types/variant': 'src/types/variant.ts',
    'types/selectedOption': 'src/types/selectedOption.ts',
    'types/defaults': 'src/types/defaults.ts',
    'types/normalize': 'src/types/normalize.ts',
    'types/find': 'src/types/find.ts',
    'types/availability': 'src/types/availability.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: false,
});

