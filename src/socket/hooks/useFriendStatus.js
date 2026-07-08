import { useEffect, useState, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import {
  subscribeToFriendRequests,
  subscribeToFriendStatus,
  sendFriendRequestSocket,
  acceptFriendRequestSocket
} from '../services/friendService'
import { useFriends } from '@/hooks'

/**
 * Custom hook for managing friend requests and status updates via socket
 * @returns {object} Friend request state and actions
 */
export const useFriendStatus = () => {
  const queryClient = useQueryClient()
  const { data: friends = [], isLoading: loading } = useFriends()
  const [friendRequests, setFriendRequests] = useState([])
  const [friendRequestNotifications, setFriendRequestNotifications] = useState([])
  const isSocketConnected = useSelector((state) => state.socket.isConnected)

  // Subscribe to friend request events
  // useEffect(() => {
  //   const unsubscribe = subscribeToFriendRequests({
  //     // Handle friend request sent (confirmation)
  //     onFriendRequestSent: ({ request }) => {
  //       console.log('Friend request sent successfully:', request)
  //     },

  //     // Handle incoming friend request
  //     onFriendRequestReceived: ({ request }) => {
  //       setFriendRequests((prev) => [request, ...prev])
  //     },

  //     // Handle friend request accepted (by me or by other user)
  //     onFriendRequestAccepted: ({ request, friendship }) => {
  //       // Remove from pending requests
  //       setFriendRequests((prev) =>
  //         prev.filter((req) => req._id !== request._id)
  //       )
  //       console.log('Friend request accepted:', friendship)
  //     },

  //     // Handle notification when someone accepts my friend request
  //     onFriendRequestAcceptedNotification: ({ request, friend }) => {
  //       setFriendRequestNotifications((prev) => [
  //         {
  //           type: 'accepted',
  //           friend,
  //           request,
  //           timestamp: new Date()
  //         },
  //         ...prev
  //       ])
  //     }
  //   })

  //   return unsubscribe
  // }, [])

  // Subscribe to friend status events (online/offline)
  useEffect(() => {
    // Wait for socket to be connected before subscribing
    if (!isSocketConnected) {
      // console.log('Socket not connected yet, skipping subscription')
      return
    }

    const unsubscribe = subscribeToFriendStatus({
      onFriendOnline: (data) => {
        // Handle both single object and array of objects
        const userIds = Array.isArray(data)
          ? data.map(item => item.userId).filter(Boolean)
          : data?.userId ? [data.userId] : []

        if (userIds.length === 0) {
          console.warn('No userId in friend_online event:', data)
          return
        }

        queryClient.setQueryData(['friends'], (prevFriends = []) =>
          prevFriends.map((friend) => {
            const friendData = friend.friendId || friend
            // Check if this friend is in the list of online users
            if (userIds.includes(friendData._id)) {
              if (friend.friendId) {
                return {
                  ...friend,
                  friendId: { ...friendData, isOnline: true }
                }
              }
              return { ...friend, isOnline: true }
            }
            return friend
          })
        )
      },
      onFriendOffline: (data) => {
        // Handle both single object and array of objects
        const userIds = Array.isArray(data)
          ? data.map(item => item.userId).filter(Boolean)
          : data?.userId ? [data.userId] : []

        if (userIds.length === 0) {
          console.warn('No userId in friend_offline event:', data)
          return
        }

        queryClient.setQueryData(['friends'], (prevFriends = []) =>
          prevFriends.map((friend) => {
            const friendData = friend.friendId || friend
            // Check if this friend is in the list of offline users
            if (userIds.includes(friendData._id)) {
              if (friend.friendId) {
                return {
                  ...friend,
                  friendId: { ...friendData, isOnline: false }
                }
              }
              return { ...friend, isOnline: false }
            }
            return friend
          })
        )
      }
    })

    return unsubscribe
  }, [isSocketConnected, queryClient])

   
  // Action handlers
  // const handleSendFriendRequest = useCallback((receiverId) => {
  //   sendFriendRequestSocket(receiverId)
  // }, [])

  // const handleAcceptFriendRequest = useCallback((requestId) => {
  //   acceptFriendRequestSocket(requestId)
  // }, [])

  // const clearNotification = useCallback((index) => {
  //   setFriendRequestNotifications((prev) =>
  //     prev.filter((_, i) => i !== index)
  //   )
  // }, [])

  // const clearAllNotifications = useCallback(() => {
  //   setFriendRequestNotifications([])
  // }, [])

  return {
    friends,
    loading,
    // friendRequests,
    // friendRequestNotifications,
    // sendFriendRequest: handleSendFriendRequest,
    // acceptFriendRequest: handleAcceptFriendRequest,
    // clearNotification,
    // clearAllNotifications
  }
}
