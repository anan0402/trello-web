# Trello Web - Project Structure

## Overview
- **Project Name:** trello-web
- **Type:** React + Vite SPA (Single Page Application)
- **Purpose:** Web-based messaging/chat application with friend management
- **Build Tool:** Vite 7.1.2
- **Framework:** React 19.1.1 with SWC

---

## Root Directory Structure

```
/trello-web/
├── .claude/                   # Claude Code documentation
├── .git/                      # Git repository
├── .vscode/                   # VSCode settings
├── dist/                      # Production build output
├── node_modules/              # Dependencies
├── public/                    # Static assets
├── src/                       # Source code
├── .env                       # Environment variables (DO NOT READ)
├── .env.example               # Example environment template
├── .gitignore                 # Git ignore rules
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── package.json               # Project metadata
├── vite.config.js             # Vite configuration (@/ alias -> ./src)
└── yarn.lock                  # Yarn lock file
```

---

## Source Directory Structure

```
src/
├── app/                       # Application root component
│   └── App.jsx               # Main app with routing
├── components/               # Reusable UI components (Atomic Design)
│   ├── atoms/               # Basic building blocks
│   │   ├── CustomAvatar/
│   │   ├── CustomButton/
│   │   ├── CustomCheckBox/
│   │   ├── CustomTextField/
│   │   ├── CustomToast/
│   │   ├── CustomAutocompleteSearchBox/
│   │   ├── InfinitySelectBox/
│   │   └── Text/
│   ├── molecules/           # Simple component combinations
│   │   ├── ConfirmDialog/
│   │   ├── EmptyState/
│   │   ├── OTP/
│   │   └── PageLoadingSpinner/
│   ├── organisms/           # Complex component compositions
│   │   ├── AppHeader/
│   │   └── SideBarRight/
│   └── templates/           # Page layout templates
│       ├── AuthCardLayout/
│       ├── DefaultLayout/
│       └── SimpleCardLayout/
├── features/                # Feature-specific pages/flows
│   ├── AccountVerification/
│   ├── ForgotPassword/
│   └── 404/
├── hooks/                   # Custom React hooks
│   ├── useSearch.js
│   ├── useDebounce.js
│   ├── useUserDetails.js
│   ├── useFriendRequest.js
│   ├── useFriends.js
│   ├── useInfiniteMessages.js
│   ├── useConversation.js
│   └── useConversationInfo.js
├── lib/                     # External library configurations
│   └── queryClient.js
├── pages/                   # Page components
│   ├── HomePage/
│   ├── LoginPage/
│   ├── SignupPage/
│   ├── ChatPage/
│   │   └── components/
│   │       ├── MessageArea/
│   │       └── InputArea/
│   ├── AccountProfilePage/
│   └── ProblemDemoPage/
├── redux/                   # State management
│   ├── store.js
│   └── slices/
│       ├── userSlice.js
│       ├── sidebarSlice.js
│       ├── socketSlice.js
│       └── chatSlice.js
├── services/                # API service layer
│   ├── auth.service.jsx
│   ├── user.service.jsx
│   ├── conversation.service.jsx
│   └── search.service.jsx
├── socket/                  # WebSocket configuration
│   ├── socket.js           # Socket.IO client setup
│   ├── services/
│   │   ├── messageService.js
│   │   ├── friendService.js
│   │   └── notificationService.js
│   └── hooks/
│       ├── useGlobalSocketSubscriptions.js
│       ├── useMessages.js
│       ├── useNotifications.js
│       └── useFriendStatus.js
├── styles/                  # Global CSS
│   └── global.css
├── utils/                   # Utility functions
│   ├── authorizeAxiosInstance.js
│   ├── constants.js        # Socket event constants
│   ├── environment.js
│   ├── getErrorMessage.js
│   └── funtion.js
├── tests/                   # Test files
└── main.jsx                 # Application entry point
```

---

## Routing Structure

**Guest Routes** (no authentication required):
- `/login` - Login page
- `/signup` - Registration page
- `/account/verification` - Email verification
- `/forgot-password` - Password recovery

**Protected Routes** (authentication required):
- `/problem-demo` - Demo page
- `/profile/:id` - User profile page
- `/chat/:userId` - Direct messaging page

**Public Routes**:
- `/` - Home page
- `/404` - Not found page

---

## State Management

### Redux Slices
1. **userSlice** - `{ currentUser }` - Auth state (persisted)
2. **sidebarSlice** - `{ isOpen }` - Sidebar UI state
3. **socketSlice** - `{ isConnected, socketId }` - Socket connection state
4. **chatSlice** - `{ activeChatUser }` - Active chat user info

### React Query
- Server state management for API data
- Stale time: 5 minutes
- Cache time: 10 minutes

---

## Key Patterns

### Component Naming
- **Components:** PascalCase (e.g., `CustomButton.jsx`)
- **Utilities:** camelCase (e.g., `authorizeAxiosInstance.js`)
- **CSS:** Same name as component (e.g., `CustomButton.css`)

### Import Alias
- `@/` maps to `./src/`
- Example: `import { CustomButton } from '@/components/atoms/CustomButton/CustomButton'`

### CSS Variables (from global.css)
- `--app-button-color`
- `--app-button-color-hover`
- `--app-border-color`

---

## Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.1.1 | UI framework |
| react-router | 7.14.1 | Client-side routing |
| @reduxjs/toolkit | 2.12.0 | Redux store |
| @tanstack/react-query | 5.101.0 | Server state |
| socket.io-client | 4.8.3 | WebSocket client |
| axios | 1.16.1 | HTTP client |
| @mui/material | 7.3.2 | Material Design UI |
| react-hook-form | 7.72.1 | Form management |
| yup | 1.7.1 | Schema validation |
| react-virtuoso | 4.18.5 | Virtual scrolling |
| react-toastify | 11.1.0 | Toast notifications |

---

## NPM Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build to dist/
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

---

## Socket Events

### Client to Server
- `send_friend_request`, `accept_friend_request`
- `send_message`, `join_conversation`, `leave_conversation`
- `typing_start`, `typing_stop`, `delete_message`

### Server to Client
- `friend_request_sent`, `friend_request_received`, `friend_request_accepted`
- `friend_online`, `friend_offline`
- `new_message`, `user_typing`, `user_stopped_typing`, `message_deleted`

---

## Data Flow

```
User Browser
    ↓
React Router → Page Component
    ↓
├─ Redux (app state: user, chat, socket, sidebar)
├─ React Query (server state: search, friends, messages)
├─ Socket.IO (real-time: messages, typing, status)
└─ Axios (HTTP API calls)
    ↓
Backend API → Database
```
