import authorizeAxiosInstance from '@/utils/authorizeAxiosInstance'

/**
 * Get user details by ID
 * @param {string} id - User ID
 * @returns {Promise} User details
 */
export const getUserDetails = async (id) => {
  const response = await authorizeAxiosInstance.get(`/v1/users/infor/${id}`)
  return response.data
}

/**
 * Update user profile
 * @param {string} id - User ID
 * @returns {Promise} Updated user data
 */
export const updateUserProfile = async (id) => {
  const response = await authorizeAxiosInstance.put(`/v1/users/${id}`)
  return response.data
}

/**
 * Send friend request
 * @param {string} targetUserId - Target user ID
 * @returns {Promise} Friend request response
 */
export const sendFriendRequest = async (targetUserId) => {
  const response = await authorizeAxiosInstance.post(`/v1/friends/send-request`, { 
    targetUserId: targetUserId 
  })
  return response.data
}

/**
 * Cancel sent friend request
 * @param {string} requestId - Target user ID
 * @returns {Promise} Cancel response
 */
export const cancelFriendRequest = async (requestId) => {
  const response = await authorizeAxiosInstance.delete(`/v1/friends/cancel-request/${requestId}`)
  return response.data
}


/**
 * Accept friend request
 * @param {string} requestId - User ID who sent the request
 * @returns {Promise} Accept response
 */
export const acceptFriendRequest = async (requestId) => {
  const response = await authorizeAxiosInstance.post(`/v1/friends/accept-request`, {
    requestId: requestId
  })
  return response.data
}

/**
 * Reject friend request
 * @param {string} requestId - Request ID to reject
 * @returns {Promise} Reject response
 */
export const rejectFriendRequest = async (requestId) => {
  const response = await authorizeAxiosInstance.delete(`/v1/friends/reject-request/${requestId}`)
  return response.data
}


/**
 * Unfriend a user
 * @param {string} friendId - Friend user ID
 * @returns {Promise} Unfriend response
 */
export const unfriendUser = async (friendId) => {
  const response = await authorizeAxiosInstance.delete(`/v1/friends/unfriend/${friendId}`)
  return response.data
}

/**
 * Get list of friends
 * @returns {Promise} List of friends
 */
export const getFriends = async () => {
  const response = await authorizeAxiosInstance.get(`/v1/friends`)
  return response.data
}
