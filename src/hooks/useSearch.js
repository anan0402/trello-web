import { useQuery } from '@tanstack/react-query'
import { search } from '@/services/search.service'

/**
 * Custom hook to search using React Query
 * @param {string} query - Search query
 * @param {object} options - React Query options
 * @returns {object} React Query result
 */
export const useSearch = (query, options = {}) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => search(query),
    enabled: !!query && query.trim().length > 0, // Only fetch when query is not empty
    ...options,
  })
}
