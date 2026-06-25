import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  unfriendUser
} from '@/services/user.service'

/**
 * Custom hook to handle friend request mutations
 * @param {string} userId - Target user ID
 * @returns {object} Friend request mutation handlers
 */
export const useFriendRequest = (userId) => {
  const queryClient = useQueryClient()
  const sendRequest = useMutation({
    mutationFn: () => sendFriendRequest(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['userDetails', userId])
    }
  })

  const acceptRequest = useMutation({
    mutationFn: (requestId) => acceptFriendRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries(['userDetails', userId])
    }
  })

  const rejectRequest = useMutation({
    mutationFn: (requestId) => rejectFriendRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries(['userDetails', userId])
    }
  })

  const cancelRequest = useMutation({
    mutationFn: (requestId) => cancelFriendRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries(['userDetails', userId])
    }
  })

  const unfriend = useMutation({
    mutationFn: (friendId) => unfriendUser(friendId),
    onSuccess: () => {
      queryClient.invalidateQueries(['userDetails', userId])
    }
  })

  return {
    sendRequest,
    acceptRequest,
    rejectRequest,
    cancelRequest,
    unfriend
  }
}
