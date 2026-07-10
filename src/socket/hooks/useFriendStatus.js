import { useFriends } from '@/hooks'

/**
 * Custom hook for accessing friend data
 * Note: Socket subscriptions for online/offline status are now handled globally in App.jsx
 * via useGlobalSocketSubscriptions hook
 *
 * @returns {object} Friend data and loading state
 */
export const useFriendStatus = () => {
  const { data: friends = [], isLoading: loading } = useFriends()

  return {
    friends,
    loading
  }
}
