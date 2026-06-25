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
 * @param {string} userId - Target user ID
 * @returns {Promise} Friend request response
 */
export const sendFriendRequest = async (userId) => {
  const response = await authorizeAxiosInstance.post(`/v1/users/${userId}/friend-request`)
  return response.data
}

/**
 * Accept friend request
 * @param {string} userId - User ID who sent the request
 * @returns {Promise} Accept response
 */
export const acceptFriendRequest = async (userId) => {
  const response = await authorizeAxiosInstance.put(`/v1/users/${userId}/friend-request/accept`)
  return response.data
}

/**
 * Reject friend request
 * @param {string} userId - User ID who sent the request
 * @returns {Promise} Reject response
 */
export const rejectFriendRequest = async (userId) => {
  const response = await authorizeAxiosInstance.put(`/v1/users/${userId}/friend-request/reject`)
  return response.data
}

/**
 * Cancel sent friend request
 * @param {string} userId - Target user ID
 * @returns {Promise} Cancel response
 */
export const cancelFriendRequest = async (userId) => {
  const response = await authorizeAxiosInstance.delete(`/v1/users/${userId}/friend-request`)
  return response.data
}

/**
 * Unfriend a user
 * @param {string} userId - Friend user ID
 * @returns {Promise} Unfriend response
 */
export const unfriendUser = async (userId) => {
  const response = await authorizeAxiosInstance.delete(`/v1/users/${userId}/friend`)
  return response.data
}
