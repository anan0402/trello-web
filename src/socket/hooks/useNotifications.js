import { useEffect, useState, useCallback } from 'react'
import {
  subscribeToNotifications,
  joinNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadCount,
  getNotifications,
  deleteNotification,
  clearAllNotifications
} from '../services/notificationService'

/**
 * Custom hook for managing real-time notifications via socket
 * @returns {object} Notification state and actions
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Join notifications room on mount
  useEffect(() => {
    joinNotifications()
    getNotifications()
    getUnreadCount()
  }, [])

  // Subscribe to notification events
  useEffect(() => {
    const unsubscribe = subscribeToNotifications({
      // Handle new notification
      onNewNotification: (notification) => {
        setNotifications((prev) => [notification, ...prev])
        setUnreadCount((prev) => prev + 1)
      },

      // Handle notification marked as read
      onNotificationRead: ({ notificationId }) => {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notificationId ? { ...notif, isRead: true } : notif
          )
        )
        setUnreadCount((prev) => Math.max(0, prev - 1))
      },

      // Handle unread count update
      onUnreadCount: ({ count }) => {
        setUnreadCount(count)
      },

      // Handle notifications history
      onNotificationsHistory: ({ notifications: notifList }) => {
        setNotifications(notifList)
        setIsLoading(false)
      },

      // Handle notification deleted
      onNotificationDeleted: ({ notificationId }) => {
        setNotifications((prev) =>
          prev.filter((notif) => notif._id !== notificationId)
        )
      },

      // Handle all notifications marked as read
      onAllRead: () => {
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, isRead: true }))
        )
        setUnreadCount(0)
      },

      // Handle all notifications cleared
      onAllCleared: () => {
        setNotifications([])
        setUnreadCount(0)
      }
    })

    return unsubscribe
  }, [])

  // Action handlers
  const handleMarkAsRead = useCallback((notificationId) => {
    markNotificationRead(notificationId)
  }, [])

  const handleMarkAllAsRead = useCallback(() => {
    markAllNotificationsRead()
  }, [])

  const handleDeleteNotification = useCallback((notificationId) => {
    deleteNotification(notificationId)
  }, [])

  const handleClearAll = useCallback(() => {
    clearAllNotifications()
  }, [])

  const handleRefresh = useCallback(() => {
    setIsLoading(true)
    getNotifications()
    getUnreadCount()
  }, [])

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    deleteNotification: handleDeleteNotification,
    clearAll: handleClearAll,
    refresh: handleRefresh
  }
}
