# Chat System Documentation

## Status: 🔄 IN PROGRESS

---

## Overview

Real-time chat system with:
- Private conversations
- Message history with infinite scroll
- Real-time messaging via Socket.IO
- Typing indicators
- Online/offline status

---

## Implementation Status

| Feature | Status | Notes |
|---------|--------|-------|
| Chat Page Layout | ✅ DONE | Header, MessageArea, InputArea |
| Conversation Management | ✅ DONE | Get/create with React Query |
| Message History | ✅ DONE | Infinite scroll + virtual list |
| Real-time Send/Receive | ✅ DONE | Socket.IO working |
| Message Deletion | ✅ DONE | Backend ready, no UI button |
| Typing Indicator Backend | ✅ DONE | Events + state ready |
| Typing Indicator UI | ✅ DONE | Shows "User is typing" with dots |
| Online/Offline Status | ✅ DONE | Shows in avatar |
| Scroll to Bottom | ✅ DONE | Smart show/hide |
| Redux Chat State | 🔄 PARTIAL | Slice exists, not integrated |
| Emoji Picker | ❌ NOT DONE | Button exists, no picker |

---

## 1. Chat Page Structure

**Location:** `/src/pages/ChatPage/`

```
ChatPage/
├── ChatPage.jsx          # Main page component
├── ChatPage.css          # Page styles
└── components/
    ├── MessageArea/
    │   ├── MessageArea.jsx   # Virtual message list
    │   └── MessageArea.css
    └── InputArea/
        ├── InputArea.jsx     # Input + send button
        └── InputArea.css
```

### ✅ DONE
- Header with back button, username, avatar
- Online status indicator
- Message area with virtual scrolling (Virtuoso)
- Input area with send button
- Loading state with spinner
- Proper flexbox layout (100vh)

---

## 2. Conversation Management

### ✅ DONE

**Service:** `/src/services/conversation.service.jsx`
```javascript
getOrCreateConversation(userId)  // POST /v1/conversations/private
getConversationInfo(conversationId)  // GET /v1/conversations/{id}/info
getMessageHistory(conversationId, params)  // GET /v1/conversations/{id}/messages
```

**Hooks:**
- `useConversation(userId)` - Get or create private conversation
- `useConversationInfo(conversationId)` - Get participant info
- Both use React Query with 5-minute staleTime

---

## 3. Message System

### ✅ Message History (DONE)

**Hook:** `/src/hooks/useInfiniteMessages.js`
- Uses `useInfiniteQuery`
- 50 messages per page
- Proper pagination with `getNextPageParam`
- Only fetches when conversationId exists

### ✅ Real-time Messaging (DONE)

**Hook:** `/src/socket/hooks/useMessages.js`

```javascript
// Returns
{
  messages,           // Real-time messages array
  sendMessage,        // Emit send_message
  joinConversation,   // Emit join_conversation
  leaveConversation,  // Emit leave_conversation
  startTyping,        // Emit typing_start
  stopTyping,         // Emit typing_stop
  typingUsers,        // Array of users currently typing
  deleteMessage       // Emit delete_message
}
```

**Socket Events Used:**
| Event | Direction | Purpose |
|-------|-----------|---------|
| `join_conversation` | Client → Server | Join room |
| `leave_conversation` | Client → Server | Leave room |
| `send_message` | Client → Server | Send message |
| `new_message` | Server → Client | Receive message |
| `delete_message` | Client → Server | Delete message |
| `message_deleted` | Server → Client | Message removed |

### ✅ Message Combining (DONE)

MessageArea combines:
1. `paginatedMessages` - From useInfiniteMessages (history)
2. `realtimeMessages` - From useMessages (real-time)

Deduplication by `_id`, sorted by `createdAt`.

---

## 4. Typing Indicators

### ✅ Backend (DONE)

**Events:**
| Event | Direction | Purpose |
|-------|-----------|---------|
| `typing_start` | Client → Server | User started typing |
| `typing_stop` | Client → Server | User stopped typing |
| `user_typing` | Server → Client | Someone is typing |
| `user_stopped_typing` | Server → Client | Someone stopped |

**Implementation:**
- `startTyping(conversationId)` - Called on input change
- `stopTyping(conversationId)` - Called after send
- Auto-stop after 3 seconds inactivity
- `typingUsers` state: `[{ userId, username }]`

### ✅ UI Display (DONE)

**Implementation:**
- `typingUsers` destructured from useMessages in ChatPage
- Uses `CustomThreeDotsLoading` atom for animation
- Displays in MessageArea Footer (Virtuoso)
- Shows "Username is typing" or "X people are typing"

---

## 5. Redux Chat State

**Location:** `/src/redux/chatSlice/chatSlice.js`

### 🔄 PARTIAL

**Created:**
```javascript
// State
{ activeChatUser: null }

// Actions
setActiveChatUser(user)
clearActiveChatUser()

// Selector
selectActiveChatUser
```

**TODO:**
- [ ] Dispatch `setActiveChatUser` when entering chat
- [ ] Dispatch `clearActiveChatUser` when leaving
- [ ] Use selector to get active user info

---

## 6. Online/Offline Status

### ✅ DONE

- `useGlobalSocketSubscriptions` in App.jsx
- Listens to `friend_online` / `friend_offline` events
- Status shown via CustomAvatar `isOnline` prop
- Gets status from `conversationInfo.isOnline`

---

## 7. UI Features

### ✅ Scroll to Bottom (DONE)
- Button appears when scrolled up
- Shows when new messages arrive
- Smooth scroll animation
- Auto-hides at bottom

### ✅ Infinite Scroll (DONE)
- Triggers when 3 items from top
- Loading indicator while fetching
- Virtuoso handles prepended messages

### ❌ Emoji Picker (NOT DONE)

**Current State:**
- Emoji button exists in InputArea (faFaceSmile icon)
- No onClick handler
- No emoji picker component

**TODO:**
- [ ] Install emoji picker library (emoji-mart or similar)
- [ ] Create EmojiPicker atom/molecule
- [ ] Toggle picker on button click
- [ ] Insert emoji at cursor position

### ❌ Message Delete UI (NOT DONE)

**Current State:**
- `deleteMessage()` function exists in hook
- Socket event handling works
- No delete button in message bubbles

**TODO:**
- [ ] Add delete button/menu to own messages
- [ ] Confirm dialog before delete
- [ ] Call `deleteMessage(messageId, conversationId)`

---

## 8. Known Issues

### Minor Bug in MessageArea.jsx (Line 122)
```javascript
// Current (redundant)
<Text>{message.message || message.message}</Text>

// Should be
<Text>{message.message || message.content}</Text>
```

---

## 9. Key Files

| File | Purpose |
|------|---------|
| `pages/ChatPage/ChatPage.jsx` | Main chat page |
| `pages/ChatPage/components/MessageArea/` | Message list display |
| `pages/ChatPage/components/InputArea/` | Input + send |
| `services/conversation.service.jsx` | API calls |
| `hooks/useConversation.js` | Get/create conversation |
| `hooks/useConversationInfo.js` | Get participant info |
| `hooks/useInfiniteMessages.js` | Message pagination |
| `socket/hooks/useMessages.js` | Real-time messaging |
| `socket/services/messageService.js` | Socket emissions |
| `redux/chatSlice/chatSlice.js` | Chat state |
| `utils/constants.js` | Socket event names |

---

## 10. TODO Summary

### Priority 1 (Core Features)
- [x] **Typing Indicator UI** - Display "User is typing..." with animation
- [ ] **Emoji Picker** - Implement picker functionality

### Priority 2 (Enhancement)
- [ ] **Message Delete Button** - Add UI for delete action
- [ ] **Redux Integration** - Use chatSlice in ChatPage
- [ ] **Fix message.message bug** - Use proper fallback

### Priority 3 (Polish)
- [ ] Message timestamps display
- [ ] Read receipts
- [ ] Message search
- [ ] Image/file attachments

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      ChatPage                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Header: Back | Username | Avatar (online/offline)│   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │                 MessageArea                      │   │
│  │  ┌─────────────────────────────────────────┐    │   │
│  │  │ ← Load more (infinite scroll)            │    │   │
│  │  │                                          │    │   │
│  │  │  [Received message]                      │    │   │
│  │  │                    [Sent message]        │    │   │
│  │  │  [Received message]                      │    │   │
│  │  │                    [Sent message]        │    │   │
│  │  │                                          │    │   │
│  │  │  TODO: "User is typing..."               │    │   │
│  │  └─────────────────────────────────────────┘    │   │
│  │                    [↓ Scroll to bottom]          │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ InputArea: [😀] [Type message...] [Send]        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Socket Connection Flow

```
User opens /chat/:userId
        ↓
useConversation(userId)
        ↓
POST /v1/conversations/private
        ↓
Get conversationId
        ↓
joinConversation(conversationId)  ──► Socket: join_conversation
        ↓
useInfiniteMessages(conversationId)
        ↓
GET /v1/conversations/{id}/messages
        ↓
Display message history
        ↓
Subscribe to new_message  ◄── Socket: new_message
        ↓
User types → startTyping()  ──► Socket: typing_start
        ↓
User sends → sendMessage()  ──► Socket: send_message
        ↓
User leaves → leaveConversation()  ──► Socket: leave_conversation
```
