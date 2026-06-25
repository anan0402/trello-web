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

  const onSuccess = () => {
    // Invalidate user details query to refetch the updated friend status
    queryClient.invalidateQueries(['userDetails', userId])
  }

  const sendRequest = useMutation({
    mutationFn: () => sendFriendRequest(userId),
    onSuccess
  })

  const acceptRequest = useMutation({
    mutationFn: () => acceptFriendRequest(userId),
    onSuccess
  })

  const rejectRequest = useMutation({
    mutationFn: () => rejectFriendRequest(userId),
    onSuccess
  })

  const cancelRequest = useMutation({
    mutationFn: () => cancelFriendRequest(userId),
    onSuccess
  })

  const unfriend = useMutation({
    mutationFn: () => unfriendUser(userId),
    onSuccess
  })

  return {
    sendRequest,
    acceptRequest,
    rejectRequest,
    cancelRequest,
    unfriend
  }
}
