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
