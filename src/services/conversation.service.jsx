import authorizeAxiosInstance from '@/utils/authorizeAxiosInstance'

/**
 * Get or create a conversation with a user
 * @param {string} userId - User ID to start conversation with
 * @returns {Promise} Conversation object with _id, participants, etc.
 */
export const getOrCreateConversation = async (userId) => {
  const response = await authorizeAxiosInstance.post(
    `/v1/conversations/private`,
    { targetUserId: userId }
  )
  return response.data
}

/**
 * Get conversation info including participant details
 * @param {string} conversationId - Conversation ID
 * @returns {Promise} Conversation info with user details
 */
export const getConversationInfo = async (conversationId) => {
  const response = await authorizeAxiosInstance.get(
    `/v1/conversations/${conversationId}/info`
  )
  return response.data
}

/**
 * Get message history for a conversation with pagination
 * @param {string} conversationId - Conversation ID
 * @param {Object} params - Query parameters { search, page, limit }
 * @returns {Promise} { messages: [], totalPages, currentPage, totalMessages }
 */
export const getMessageHistory = async (conversationId, params = {}) => {
  const { search = '', page = 1, limit = 50 } = params

  const queryParams = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
  })

  const response = await authorizeAxiosInstance.get(
    `/v1/conversations/${conversationId}/messages?${queryParams.toString()}`
  )
  return response.data
}
