import { useEffect, useState, useCallback, useRef } from 'react'
import {
  subscribeToMessages,
  joinConversation,
  leaveConversation,
  sendMessage,
  deleteMessage,
  startTyping,
  stopTyping
} from '../services/messageService'

/**
 * Custom hook for managing real-time messages in a chat room
 * @param {string} conversationId - Chat room ID
 * @returns {object} Message state and actions
 */
export const useMessages = (conversationId) => {
  const [messages, setMessages] = useState([])
  const [typingUsers, setTypingUsers] = useState([])
  const typingTimeoutRef = useRef(null)

  // Join room on mount, leave on unmount
  useEffect(() => { 
    if (!conversationId) return

    joinConversation(conversationId)    

    return () => {
      leaveConversation(conversationId)
    }
  }, [conversationId])

  // Subscribe to message events
  useEffect(() => {
    if (!conversationId) return

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
  }, [conversationId])

  // Action handlers
  const handleSendMessage = useCallback(
    (messageData) => {
      if (!conversationId) return

      sendMessage({
        conversationId,
        ...messageData
      })
    },
    [conversationId]
  )

  const handleDeleteMessage = useCallback(
    (messageId) => {
      if (!conversationId) return

      deleteMessage(messageId, conversationId)
    },
    [conversationId]
  )

  const handleStartTyping = useCallback(() => {
    if (!conversationId) return

    startTyping(conversationId)

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Auto-stop typing after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping()
    }, 3000)
  }, [conversationId])

  const handleStopTyping = useCallback(() => {
    if (!conversationId) return

    stopTyping(conversationId)

    // Clear timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
  }, [conversationId])

  // Clear messages when room changes
  useEffect(() => {
    setMessages([])
    setTypingUsers([])
  }, [conversationId])

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
