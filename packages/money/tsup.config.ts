import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'format/formatMoney': 'src/format/formatMoney.ts',
    'format/formatRange': 'src/format/formatRange.ts',
    'compare/formatCompare': 'src/compare/formatCompare.ts',
    'compare/calculateDiscountPercent': 'src/compare/calculateDiscountPercent.ts',
    'parse/parseAmount': 'src/parse/parseAmount.ts',
    'types/money': 'src/types/money.ts',
    'types/options': 'src/types/options.ts',
    'types/compare': 'src/types/compare.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: false,
});

