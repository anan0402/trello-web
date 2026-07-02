import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Text from '@/components/atoms/Text/Text'
import CustomAvatar from '@/components/atoms/CustomAvatar/CustomAvatar'
import { getAvatarSrc } from '@/utils/funtion'
import { selectSidebarIsOpen, closeSidebar } from '@/redux/sidebarSlice/sidebarSlice'
import './SideBarRight.css'

function SideBarRight({ friends = [] }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isOpen = useSelector(selectSidebarIsOpen)

  const handleFriendClick = (friendId) => {
    navigate(`/chat/${friendId}`)
    dispatch(closeSidebar())
  }

  const handleBackdropClick = () => {
    dispatch(closeSidebar())
  }

  return (
    <>
      {isOpen && <Box className="sidebar-backdrop" onClick={handleBackdropClick} />}
      <Box className={`sidebar-right ${isOpen ? 'sidebar-open' : ''}`}>
        <Box className="sidebar-header">
          <Text variant="h6" className="sidebar-title">
            Friends
          </Text>
          <Text variant="caption" className="sidebar-count">
            {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
          </Text>
        </Box>

        <Box className="friends-list">
          {friends.length === 0 ? (
            <Box className="no-friends">
              <Text variant="body2" className="no-friends-text">
                No friends yet
              </Text>
            </Box>
          ) : (
            friends.map((friend) => (
              <Box
                key={friend._id}
                className="friend-item"
                onClick={() => handleFriendClick(friend._id)}
              >
                <Box className="friend-avatar-container">
                  <CustomAvatar
                    src={getAvatarSrc(friend.avatar)}
                    size="small"
                    fallback={friend.username?.[0]}
                  />
                  {friend.online && <span className="online-indicator" />}
                </Box>

                <Box className="friend-info">
                  <Text className="friend-name">
                    {friend.username}
                  </Text>
                  <Text variant="caption" className="friend-status">
                    {friend.online ? 'Online' : 'Offline'}
                  </Text>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </>
  )
}

export default SideBarRight
