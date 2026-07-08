// Socket connection
export {
  initSocket,
  disconnectSocket,
  subscribeToEvent,
  emitEvent,
} from './socket'

// Socket services
export {
  // Notification services
  joinNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadCount,
  getNotifications,
  deleteNotification,
  clearAllNotifications,
  subscribeToNotifications,
  // Message services
  joinRoom,
  leaveRoom,
  sendMessage,
  deleteMessage,
  startTyping,
  stopTyping,
  subscribeToMessages,
  // Friend request services
  sendFriendRequestSocket,
  acceptFriendRequestSocket,
  subscribeToFriendRequests
} from './services'

// Hooks
export { useNotifications, useMessages, useFriendStatus } from './hooks'
