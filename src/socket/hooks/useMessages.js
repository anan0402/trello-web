import { useEffect, useState, useCallback, useRef } from 'react'
import {
  subscribeToMessages,
  joinRoom,
  leaveRoom,
  sendMessage,
  deleteMessage,
  startTyping,
  stopTyping
} from '../services/messageService'

/**
 * Custom hook for managing real-time messages in a chat room
 * @param {string} roomId - Chat room ID
 * @returns {object} Message state and actions
 */
export const useMessages = (roomId) => {
  const [messages, setMessages] = useState([])
  const [typingUsers, setTypingUsers] = useState([])
  const typingTimeoutRef = useRef(null)

  // Join room on mount, leave on unmount
  useEffect(() => {
    if (!roomId) return

    joinRoom(roomId)

    return () => {
      leaveRoom(roomId)
    }
  }, [roomId])

  // Subscribe to message events
  useEffect(() => {
    if (!roomId) return

    const unsubscribe = subscribeToMessages({
      // Handle new message
      onNewMessage: (message) => {
        setMessages((prev) => [...prev, message])
      },

      // Handle user typing
      onUserTyping: ({ userId, username }) => {
        setTypingUsers((prev) => {
          // Check if user is already in typing list
          if (prev.find((user) => user.userId === userId)) {
            return prev
          }
          return [...prev, { userId, username }]
        })
      },

      // Handle user stopped typing
      onUserStoppedTyping: ({ userId }) => {
        setTypingUsers((prev) =>
          prev.filter((user) => user.userId !== userId)
        )
      },

      // Handle message deleted
      onMessageDeleted: ({ messageId }) => {
        setMessages((prev) =>
          prev.filter((msg) => msg._id !== messageId)
        )
      }
    })

    return unsubscribe
  }, [roomId])

  // Action handlers
  const handleSendMessage = useCallback(
    (messageData) => {
      if (!roomId) return

      sendMessage({
        roomId,
        ...messageData
      })
    },
    [roomId]
  )

  const handleDeleteMessage = useCallback(
    (messageId) => {
      if (!roomId) return

      deleteMessage(messageId, roomId)
    },
    [roomId]
  )

  const handleStartTyping = useCallback(() => {
    if (!roomId) return

    startTyping(roomId)

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Auto-stop typing after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping()
    }, 3000)
  }, [roomId])

  const handleStopTyping = useCallback(() => {
    if (!roomId) return

    stopTyping(roomId)

    // Clear timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
  }, [roomId])

  // Clear messages when room changes
  useEffect(() => {
    setMessages([])
    setTypingUsers([])
  }, [roomId])

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  return {
    messages,
    typingUsers,
    sendMessage: handleSendMessage,
    deleteMessage: handleDeleteMessage,
    startTyping: handleStartTyping,
    stopTyping: handleStopTyping
  }
}
