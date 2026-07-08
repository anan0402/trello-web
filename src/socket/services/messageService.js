import { emitEvent, subscribeToEvent } from '../socket'
import { MESSAGE_EVENTS } from '@/utils/constants'

// ==================== Message Services ====================

/**
 * Join a chat room
 * @param {string} roomId - Room/Chat ID
 */
export const joinRoom = (roomId) => {
  emitEvent(MESSAGE_EVENTS.JOIN_ROOM, { roomId })
}

/**
 * Leave a chat room
 * @param {string} roomId - Room/Chat ID
 */
export const leaveRoom = (roomId) => {
  emitEvent(MESSAGE_EVENTS.LEAVE_ROOM, { roomId })
}

/**
 * Send a message
 * @param {object} messageData - Message data { roomId, content, ... }
 */
export const sendMessage = (messageData) => {
  emitEvent(MESSAGE_EVENTS.SEND_MESSAGE, messageData)
}

/**
 * Delete a message
 * @param {string} messageId - Message ID
 * @param {string} roomId - Room ID
 */
export const deleteMessage = (messageId, roomId) => {
  emitEvent(MESSAGE_EVENTS.DELETE_MESSAGE, { messageId, roomId })
}

/**
 * Start typing indicator
 * @param {string} roomId - Room ID
 */
export const startTyping = (roomId) => {
  emitEvent(MESSAGE_EVENTS.TYPING_START, { roomId })
}

/**
 * Stop typing indicator
 * @param {string} roomId - Room ID
 */
export const stopTyping = (roomId) => {
  emitEvent(MESSAGE_EVENTS.TYPING_STOP, { roomId })
}

/**
 * Subscribe to message events
 * @param {object} handlers - Event handlers
 * @returns {function} Unsubscribe function
 */
export const subscribeToMessages = (handlers) => {
  const unsubscribers = []

  if (handlers.onNewMessage) {
    unsubscribers.push(
      subscribeToEvent(MESSAGE_EVENTS.NEW_MESSAGE, handlers.onNewMessage)
    )
  }

  if (handlers.onUserTyping) {
    unsubscribers.push(
      subscribeToEvent(MESSAGE_EVENTS.USER_TYPING, handlers.onUserTyping)
    )
  }

  if (handlers.onUserStoppedTyping) {
    unsubscribers.push(
      subscribeToEvent(MESSAGE_EVENTS.USER_STOPPED_TYPING, handlers.onUserStoppedTyping)
    )
  }

  if (handlers.onMessageDeleted) {
    unsubscribers.push(
      subscribeToEvent(MESSAGE_EVENTS.MESSAGE_DELETED, handlers.onMessageDeleted)
    )
  }

  // Return combined unsubscribe function
  return () => {
    unsubscribers.forEach(unsub => unsub())
  }
}
