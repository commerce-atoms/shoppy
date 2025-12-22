# @shoppy/date

**Commerce-safe date helpers for Shopify storefronts.**

## Purpose

Provides utilities for date operations and countdown logic in commerce contexts:

- Generate countdown strings (e.g., "2d 3h left")
- Calculate time differences safely
- Check if dates have expired
- Display-safe duration formatting (no timezone issues)

## Non-goals

This package explicitly does **NOT**:

- ❌ Provide timezone handling or conversions
- ❌ Include complex date math libraries (use `date-fns` for that)
- ❌ Fetch dates from Shopify
- ❌ Provide UI components

## API

### Core Functions

```typescript
// Get countdown string for display
import { getCountdownString } from "@shoppy/date/countdown/getCountdownString";

const countdown = getCountdownString(new Date("2025-12-25"));
// Returns: "2d 3h left" or "Expired"

// Get time difference breakdown
import { getTimeUntil } from "@shoppy/date/diff/getTimeUntil";

const time = getTimeUntil(new Date("2025-12-25"));
// Returns: {days: 2, hours: 3, minutes: 45, seconds: 30}

// Check if date has expired
import { isDateExpired } from "@shoppy/date/expire/isDateExpired";

const expired = isDateExpired(new Date("2025-12-25"));
// Returns: boolean
```

## Types

```typescript
import type { TimeDifference } from "@shoppy/date/types/timeDifference";
```
