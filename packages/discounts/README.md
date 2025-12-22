# @shoppy/discounts

**Pure promotion logic engine for Shopify storefronts.**

## Purpose

Provides utilities for discount and promotion calculations that are framework-agnostic:

- Apply percentage or fixed discounts
- Validate discount rule sets (minimum spend, expiry dates)
- Compose multiple discount applications
- Calculate final discounted amounts

## Non-goals

This package explicitly does **NOT**:

- ❌ Fetch discounts from Shopify
- ❌ Provide UI components
- ❌ Manage React state or context
- ❌ Handle currency conversion
- ❌ Include routing logic

## API

### Core Functions

```typescript
// Apply a percentage discount
import { applyPercentageDiscount } from "@shoppy/discounts/apply/applyPercentageDiscount";

const discountedAmount = applyPercentageDiscount(100, 20);
// Returns: 80

// Apply a fixed discount
import { applyFixedDiscount } from "@shoppy/discounts/apply/applyFixedDiscount";

const discountedAmount = applyFixedDiscount(100, 15);
// Returns: 85

// Validate discount rules
import { validateDiscountRule } from "@shoppy/discounts/validate/validateDiscountRule";

const isValid = validateDiscountRule(100, {
  minSpend: 50,
  expiresAt: new Date("2025-12-31"),
});

// Compose multiple discounts
import { composeDiscounts } from "@shoppy/discounts/compose/composeDiscounts";

const finalAmount = composeDiscounts(100, [
  { type: "percent", value: 10 },
  { type: "fixed", value: 5 },
]);
```

## Types

```typescript
import type { Discount } from "@shoppy/discounts/types/discount";
import type { DiscountRule } from "@shoppy/discounts/types/discountRule";
```
