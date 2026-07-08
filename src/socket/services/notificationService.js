import { emitEvent, subscribeToEvent } from '../socket'
import { NOTIFICATION_EVENTS } from '@/utils/constants'

// ==================== Notification Services ====================

/**
 * Join the notifications room to receive real-time notifications
 */
export const joinNotifications = () => {
  emitEvent(NOTIFICATION_EVENTS.JOIN_NOTIFICATIONS)
}

/**
 * Mark a notification as read
 * @param {string} notificationId - Notification ID
 */
export const markNotificationRead = (notificationId) => {
  emitEvent(NOTIFICATION_EVENTS.MARK_NOTIFICATION_READ, { notificationId })
}

/**
 * Mark all notifications as read
 */
export const markAllNotificationsRead = () => {
  emitEvent(NOTIFICATION_EVENTS.MARK_ALL_READ)
}

/**
 * Get unread notification count
 */
export const getUnreadCount = () => {
  emitEvent(NOTIFICATION_EVENTS.GET_UNREAD_COUNT)
}

/**
 * Get notifications history
 */
export const getNotifications = () => {
  emitEvent(NOTIFICATION_EVENTS.GET_NOTIFICATIONS)
}

/**
 * Delete a notification
 * @param {string} notificationId - Notification ID
 */
export const deleteNotification = (notificationId) => {
  emitEvent(NOTIFICATION_EVENTS.DELETE_NOTIFICATION, { notificationId })
}

/**
 * Clear all notifications
 */
export const clearAllNotifications = () => {
  emitEvent(NOTIFICATION_EVENTS.CLEAR_ALL_NOTIFICATIONS)
}

/**
 * Subscribe to notification events
 * @param {object} handlers - Event handlers
 * @returns {function} Unsubscribe function
 */
export const subscribeToNotifications = (handlers) => {
  const unsubscribers = []

  if (handlers.onNewNotification) {
    unsubscribers.push(
      subscribeToEvent(NOTIFICATION_EVENTS.NEW_NOTIFICATION, handlers.onNewNotification)
    )
  }

  if (handlers.onNotificationRead) {
    unsubscribers.push(
      subscribeToEvent(NOTIFICATION_EVENTS.NOTIFICATION_MARKED_READ, handlers.onNotificationRead)
    )
  }

  if (handlers.onUnreadCount) {
    unsubscribers.push(
      subscribeToEvent(NOTIFICATION_EVENTS.UNREAD_COUNT, handlers.onUnreadCount)
    )
  }

  if (handlers.onNotificationsHistory) {
    unsubscribers.push(
      subscribeToEvent(NOTIFICATION_EVENTS.NOTIFICATIONS_HISTORY, handlers.onNotificationsHistory)
    )
  }

  if (handlers.onNotificationDeleted) {
    unsubscribers.push(
      subscribeToEvent(NOTIFICATION_EVENTS.NOTIFICATION_DELETED, handlers.onNotificationDeleted)
    )
  }

  if (handlers.onAllRead) {
    unsubscribers.push(
      subscribeToEvent(NOTIFICATION_EVENTS.ALL_NOTIFICATIONS_MARKED_READ, handlers.onAllRead)
    )
  }

  if (handlers.onAllCleared) {
    unsubscribers.push(
      subscribeToEvent(NOTIFICATION_EVENTS.NOTIFICATIONS_CLEARED, handlers.onAllCleared)
    )
  }

  // Return combined unsubscribe function
  return () => {
    unsubscribers.forEach(unsub => unsub())
  }
}
