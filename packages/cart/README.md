# @commerce-atoms/cart

**Pure cart line math engine for Shopify products.**

## Purpose

Provides utilities for cart operations and calculations that are framework-agnostic:

- Adding/merging/updating cart items
- Computing `subtotal`, `totalQuantity`, and discounts
- Normalizing cart structure
- Line-by-line math operations

## Non-goals

This package explicitly does **NOT**:

- ❌ Store cart state in localStorage or sessions
- ❌ Provide UI components (`<CartSummary />`)
- ❌ Fetch cart data from Shopify
- ❌ Include routing logic
- ❌ Manage React state or context

## API

### Core Functions

```typescript
// Calculate cart subtotal from line items
import { calculateSubtotal } from "@commerce-atoms/cart/totals/calculateSubtotal";

const subtotal = calculateSubtotal(cartLines);
// Returns: 199.97

// Add a new line to cart
import { addCartLine } from "@commerce-atoms/cart/line/addCartLine";

const updatedLines = addCartLine(lines, {
  id: "123",
  quantity: 2,
  price: 10.0,
});

// Update line quantity
import { updateCartLine } from "@commerce-atoms/cart/line/updateCartLine";

const updatedLines = updateCartLine(lines, "line-id", { quantity: 5 });

// Remove line from cart
import { removeCartLine } from "@commerce-atoms/cart/line/removeCartLine";

const updatedLines = removeCartLine(lines, "line-id");

// Merge duplicate lines
import { mergeCartLines } from "@commerce-atoms/cart/line/mergeCartLines";

const mergedLines = mergeCartLines(lines1, lines2);
```

## Types

```typescript
import type { CartLine } from "@commerce-atoms/cart/types/cartLine";
import type { Cart } from "@commerce-atoms/cart/types/cart";
```
