import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import './InputArea.css'

function InputArea({ inputRef, inputValue, onInputChange, onKeyPress, onSendMessage }) {
  return (
    <Box className="chat-input-container">
      <IconButton className="chat-emoji-button">
        <FontAwesomeIcon icon={faFaceSmile} />
      </IconButton>

      <InputBase
        ref={inputRef}
        placeholder="Message"
        value={inputValue}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        className="chat-input"
        multiline
        maxRows={4}
      />

      <IconButton
        onClick={onSendMessage}
        disabled={!inputValue.trim()}
        className="chat-send-button"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </IconButton>
    </Box>
  )
}

export default InputArea
