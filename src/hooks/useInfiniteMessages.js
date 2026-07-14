import { useInfiniteQuery } from '@tanstack/react-query'
import { getMessageHistory } from '@/services/conversation.service'

/**
 * Custom hook to fetch messages with infinite scroll pagination
 * @param {string} conversationId - Conversation ID
 * @param {number} limit - Number of messages per page (default: 50)
 * @param {string} search - Search query (optional)
 * @param {Object} options - Additional React Query options
 * @returns {Object} React Query infinite query result
 */
export const useInfiniteMessages = (conversationId, limit = 50, search = '', options = {}) => {
  return useInfiniteQuery({
    queryKey: ['messages', conversationId, limit, search],
    queryFn: async ({ pageParam = 1 }) => {
      // pageParam is the page number
      const response = await getMessageHistory(conversationId, {
        page: pageParam,
        limit,
        search,
      })
      return response
    },
    getNextPageParam: (lastPage) => {
      const hasNextPage = lastPage?.pagination?.hasNextPage
      return hasNextPage ? lastPage?.pagination?.page + 1 : undefined
    },
    initialPageParam: 1,
    enabled: !!conversationId, // Only fetch when conversationId exists
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60, // 1 minute
    ...options,
  })
}
