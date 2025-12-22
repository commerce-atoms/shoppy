import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'schema/defineSearchSchema': 'src/schema/defineSearchSchema.ts',
    'parse/parseSearchState': 'src/parse/parseSearchState.ts',
    'serialize/serializeSearchState': 'src/serialize/serializeSearchState.ts',
    'patch/patchSearchParams': 'src/patch/patchSearchParams.ts',
    'filters/toggleFilter': 'src/filters/toggleFilter.ts',
    'filters/setRangeFilter': 'src/filters/setRangeFilter.ts',
    'filters/clearFilter': 'src/filters/clearFilter.ts',
    'filters/clearAllFilters': 'src/filters/clearAllFilters.ts',
    'sort/setSort': 'src/sort/setSort.ts',
    'pagination/setPage': 'src/pagination/setPage.ts',
    'pagination/setCursor': 'src/pagination/setCursor.ts',
    'types/searchState': 'src/types/searchState.ts',
    'types/schema': 'src/types/schema.ts',
    'types/options': 'src/types/options.ts',
    'selectors/getRangeFilter': 'src/selectors/getRangeFilter.ts',
    'selectors/getFilterValues': 'src/selectors/getFilterValues.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: false,
});

