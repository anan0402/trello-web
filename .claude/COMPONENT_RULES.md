# Component Structure Rules (Atomic Design)

## Hierarchy Overview

```
atoms → molecules → organisms → templates → pages/features
```

---

## 1. ATOMS (`/src/components/atoms/`)

**Definition:** Smallest, indivisible UI elements. Cannot be broken down further.

**Characteristics:**
- Single responsibility
- No business logic
- Highly reusable across the entire app
- Accepts props for customization
- Should be wrapped with `memo()` for performance

**Examples:**
- `CustomButton` - A button
- `CustomTextField` - An input field
- `CustomAvatar` - An avatar image
- `CustomCheckBox` - A checkbox
- `Text` - Typography wrapper
- `ThreeDotsLoading` - Loading animation

**DO NOT:**
- Fetch data
- Use Redux selectors
- Contain other atoms
- Have complex state logic

---

## 2. MOLECULES (`/src/components/molecules/`)

**Definition:** Simple combinations of 2+ atoms working together as a unit.

**Characteristics:**
- Combines atoms to form a functional unit
- Minimal internal state (UI state only)
- Still reusable across pages
- No direct API calls

**Examples:**
- `PageLoadingSpinner` - Spinner + Text
- `EmptyState` - Icon + Text + Button
- `OTP` - Multiple TextFields grouped
- `ConfirmDialog` - Dialog + Buttons + Text
- `SearchBar` - TextField + Button + Icon

**DO NOT:**
- Fetch data directly
- Have heavy business logic
- Be too specific to one page

---

## 3. ORGANISMS (`/src/components/organisms/`)

**Definition:** Complex UI sections composed of molecules and/or atoms. Can have business logic.

**Characteristics:**
- Self-contained sections of a page
- CAN use Redux selectors
- CAN have internal state
- CAN fetch data (but prefer hooks)
- Represents a distinct section of the interface

**Examples:**
- `AppHeader` - Logo + Navigation + UserMenu + SearchBar
- `SideBarRight` - UserInfo + FriendList + Actions
- `MessageList` - List of Message molecules
- `ChatHeader` - Avatar + UserName + Status + Actions

**CAN:**
- Use Redux (`useSelector`, `useDispatch`)
- Use custom hooks for data fetching
- Handle user interactions
- Have complex internal state

---

## 4. TEMPLATES (`/src/components/templates/`)

**Definition:** Page-level layout structures. Define WHERE content goes, not WHAT content is.

**Characteristics:**
- Layout only (grid, flexbox structure)
- Accepts children as props
- No business logic
- No data fetching
- Defines slots for content

**Examples:**
- `DefaultLayout` - Header + Sidebar + MainContent area
- `AuthCardLayout` - Centered card for auth pages
- `SimpleCardLayout` - Basic card wrapper

**Structure Pattern:**
```jsx
function DefaultLayout({ children, showSidebar }) {
  return (
    <Box>
      <AppHeader />
      <Box display="flex">
        <main>{children}</main>
        {showSidebar && <SideBarRight />}
      </Box>
    </Box>
  )
}
```

**DO NOT:**
- Contain page-specific logic
- Fetch data
- Have business logic

---

## 5. PAGES (`/src/pages/`)

**Definition:** Complete screens that users navigate to. Connected to routes.

**Characteristics:**
- One page = one route
- Composes templates + organisms
- CAN have page-specific components in subfolder
- Handles data fetching via hooks
- Connects to Redux for state
- Contains business logic for that page

**Examples:**
- `HomePage` - Main landing page
- `LoginPage` - Login form page
- `ChatPage` - Messaging interface
- `AccountProfilePage` - User profile

**Structure:**
```
pages/
└── ChatPage/
    ├── ChatPage.jsx         # Main page component
    ├── ChatPage.css         # Page styles
    └── components/          # Page-specific components
        ├── MessageArea/     # Only used in ChatPage
        └── InputArea/       # Only used in ChatPage
```

**Page-specific components:**
- Components in `/pages/[PageName]/components/` are ONLY for that page
- If needed elsewhere, move to atoms/molecules/organisms

---

## 6. FEATURES (`/src/features/`)

**Definition:** Multi-step flows or standalone feature modules that span multiple views.

**Characteristics:**
- Self-contained feature with its own routing/steps
- May have multiple sub-pages or steps
- Has its own state management if needed
- Can be lazy-loaded as a module

**Examples:**
- `AccountVerification` - OTP verification flow
- `ForgotPassword` - Password reset flow (email → OTP → new password)
- `404` - Not found page

**When to use Features vs Pages:**
- **Page:** Single screen, simple navigation
- **Feature:** Multi-step flow, complex state, could be extracted as module

---

## Quick Decision Guide

| Question | Answer |
|----------|--------|
| Is it a single HTML element? | → **Atom** |
| Does it combine 2-3 atoms? | → **Molecule** |
| Is it a complex section with logic? | → **Organism** |
| Is it a layout structure? | → **Template** |
| Is it a routed screen? | → **Page** |
| Is it a multi-step flow? | → **Feature** |
| Is it only used in one page? | → **Page-specific component** |

---

## File Structure Convention

```
ComponentName/
├── ComponentName.jsx    # Main component
├── ComponentName.css    # Styles (optional)
└── index.js            # Export (optional)
```

---

## Import Order Convention

```jsx
// 1. React imports
import { memo, useState, useEffect } from 'react'

// 2. Third-party libraries
import Box from '@mui/material/Box'

// 3. Redux/hooks
import { useSelector } from 'react-redux'

// 4. Custom hooks
import { useMessages } from '@/hooks'

// 5. Components (atoms → molecules → organisms)
import { CustomButton } from '@/components/atoms/CustomButton/CustomButton'

// 6. Utils/constants
import { SOCKET_EVENTS } from '@/utils/constants'

// 7. Styles
import './ComponentName.css'
```
