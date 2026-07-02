import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import CircularProgress from '@mui/material/CircularProgress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Text from '@/components/atoms/Text/Text'
import CustomAvatar from '@/components/atoms/CustomAvatar/CustomAvatar'
import { getAvatarSrc } from '@/utils/funtion'
import './ChatPage.css'

// Mock data for demonstration - replace with real API calls
const mockUser = {
  _id: '1',
  username: 'DAISY',
  avatar: null,
  online: true
}

const mockMessages = [
  {
    _id: '1',
    text: 'Helloww',
    senderId: 'currentUser',
    createdAt: new Date()
  }
]

function ChatPage() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState(mockMessages)
  const [inputValue, setInputValue] = useState('')
  const [isLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Mock user data - replace with actual API call
  const chatUser = mockUser

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleBack = () => {
    navigate(-1)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      _id: Date.now().toString(),
      text: inputValue,
      senderId: 'currentUser',
      createdAt: new Date()
    }

    setMessages([...messages, newMessage])
    setInputValue('')

    // Focus back on input after sending
    inputRef.current?.focus()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (isLoading) {
    return (
      <Box className="chat-loading">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box className="chat-container">
      {/* Header */}
      <Box className="chat-header">
        <IconButton onClick={handleBack} className="chat-back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </IconButton>

        <Box className="chat-header-info">
          <Text variant="h6" className="chat-username">
            {chatUser.username}
          </Text>
          <Text variant="caption" className="chat-status">
            {chatUser.online ? 'Online' : 'Offline'}
          </Text>
        </Box>

        <CustomAvatar
          src={getAvatarSrc(chatUser.avatar)}
          size="medium"
          fallback={chatUser.username?.[0]}
        />
      </Box>

      {/* Messages Area */}
      <Box className="chat-messages-area">
        <Box className="chat-messages-list">
          {messages.map((message) => (
            <Box
              key={message._id}
              className={`message-bubble ${
                message.senderId === 'currentUser' ? 'message-sent' : 'message-received'
              }`}
            >
              <Text className="message-text">{message.text}</Text>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
      </Box>

      {/* Input Area */}
      <Box className="chat-input-container">
        <IconButton className="chat-emoji-button">
          <FontAwesomeIcon icon={faFaceSmile} />
        </IconButton>

        <InputBase
          ref={inputRef}
          placeholder="Message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chat-input"
          multiline
          maxRows={4}
        />

        <IconButton
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
          className="chat-send-button"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatPage
