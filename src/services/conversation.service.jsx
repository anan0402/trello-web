import authorizeAxiosInstance from '@/utils/authorizeAxiosInstance'

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
