import { useRef, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import { Virtuoso } from 'react-virtuoso'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Text from '@/components/atoms/Text/Text'
import { selectCurrentUser } from '@/redux/userSlice/userSlice'
import './MessageArea.css'

/**
 * MessageArea component with virtual list and infinite scroll
 * @param {Array} paginatedMessages - Messages from paginated API
 * @param {Array} realtimeMessages - Messages from real-time socket
 * @param {Function} onLoadMore - Callback to load more messages
 * @param {boolean} hasMore - Whether there are more messages to load
 * @param {boolean} isLoadingMore - Loading state for pagination
 * @param {boolean} isLoading - Initial loading state
 */
function MessageArea({
  paginatedMessages = [],
  realtimeMessages = [],
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  isLoading = false
}) {
  const virtuosoRef = useRef(null)
  const currentUser = useSelector(selectCurrentUser)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [showScrollButton, setShowScrollButton] = useState(false)

  // Combine paginated and real-time messages
  const allMessages = useMemo(() => {
    // Remove duplicates between paginated and real-time messages
    const realtimeIds = new Set(realtimeMessages.map(m => m._id))
    const uniquePaginatedMessages = paginatedMessages.filter(m => !realtimeIds.has(m._id))

    // Sort by createdAt (oldest first)
    return [...uniquePaginatedMessages, ...realtimeMessages].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    )
  }, [paginatedMessages, realtimeMessages])

  // Show scroll button when new messages arrive and user is not at bottom
  const prevMessageCountRef = useRef(allMessages.length)
  useEffect(() => {
    if (allMessages.length > prevMessageCountRef.current && !isAtBottom) {
      setShowScrollButton(true)
    }
    prevMessageCountRef.current = allMessages.length
  }, [allMessages.length, isAtBottom])

  // Handle loading more messages when scrolling to top
  const handleStartReached = () => {
    if (hasMore && !isLoadingMore) {
      onLoadMore?.()
    }
  }

  // Track if user is at the bottom of the list
  const handleAtBottomStateChange = (atBottom) => {
    setIsAtBottom(atBottom)
    if (atBottom) {
      setShowScrollButton(false)
    }
  }

  // Scroll to bottom when button is clicked
  const handleScrollToBottom = () => {
    virtuosoRef.current?.scrollToIndex({
      index: 'LAST',
      behavior: 'smooth',
      align: 'end'
    })
    setShowScrollButton(false)
  }

  // Render individual message
  const renderMessage = (index) => {
    const message = allMessages[index]
    if (!message) return null

    const isOwnMessage = message.senderId === currentUser?._id

    return (
      <Box
        key={message._id}
        className={`message-bubble ${isOwnMessage ? 'message-sent' : 'message-received'}`}
      >
        <Text className="message-text">{message.text || message.content}</Text>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box className="message-area-loading">
        <CircularProgress />
      </Box>
    )
  }

  if (allMessages.length === 0) {
    return (
      <Box className="message-area-empty">
        <Text variant="body2" color="textSecondary">
          No messages yet. Start the conversation!
        </Text>
      </Box>
    )
  }

  return (
    <Box className="message-area-wrapper">
      <Virtuoso
        ref={virtuosoRef}
        style={{ height: '100%' }}
        data={allMessages}
        initialTopMostItemIndex={allMessages.length - 1}
        startReached={handleStartReached}
        atBottomStateChange={handleAtBottomStateChange}
        atBottomThreshold={50}
        overscan={200}
        itemContent={(index) => renderMessage(index)}
        components={{
          Header: () => isLoadingMore ? (
            <Box className="message-area-loading-more">
              <CircularProgress size={24} />
            </Box>
          ) : null
        }}
      />

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <IconButton
          className="scroll-to-bottom-button"
          onClick={handleScrollToBottom}
          aria-label="Scroll to bottom"
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </IconButton>
      )}
    </Box>
  )
}

export default MessageArea
