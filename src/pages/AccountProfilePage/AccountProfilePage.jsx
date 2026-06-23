import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/redux/userSlice/userSlice'
import { useUserDetails } from '@/hooks'
import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Text from '@/components/atoms/Text/Text'
import CustomTextField from '@/components/atoms/CustomTextField/CustomTextField'
import CustomAvatar from '@/components/atoms/CustomAvatar/CustomAvatar'
import { getAvatarSrc } from '@/utils/funtion'
import './AccountProfilePage.css'

function AccountProfilePage() {
  const { id } = useParams()
  const currentUser = useSelector(selectCurrentUser)
  const { data: user, isLoading, error } = useUserDetails(id)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const isOwnProfile = currentUser?._id === id
  const isGoogleUser = user?.type === 'google'

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username || '',
        email: user.email || ''
      }))
    }
  }, [user])


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement update profile logic
    console.log('Form submitted:', formData)
  }

  if (isLoading) {
    return (
      <DefaultLayout>
        <Box className="account-profile-loading">
          <CircularProgress />
        </Box>
      </DefaultLayout>
    )
  }

  if (error) {
    return (
      <DefaultLayout>
        <Box className="account-profile-error">
          <Text variant="h6" color="error">
            Error loading profile
          </Text>
          <Text color="error">{error.message}</Text>
        </Box>
      </DefaultLayout>
    )
  }

  console.log('user', user)

  return (
    <DefaultLayout>
      <Box className="account-profile-container">
        <Card className="account-profile-card">
          <CardContent>
            <Box className="account-profile-header">
              <CustomAvatar
                src={getAvatarSrc(user?.avatar || user?.picture)}
                size="xlarge"
                fallback={user?.username?.[0] || user?.email?.[0]}
              />
              <Text variant="h4" className="account-profile-title">
                Account Profile
              </Text>
            </Box>

            <Box component="form" onSubmit={handleSubmit} className="account-profile-form">
              <CustomTextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!isOwnProfile}
              />

              <CustomTextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                disabled
              />

              {isOwnProfile && !isGoogleUser && (
                <CustomTextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  helperText="Leave blank to keep current password"
                />
              )}

              {isOwnProfile && (
                <Box className="account-profile-actions">
                  <Button
                    type="submit"
                    variant="contained"
                    className="account-profile-submit"
                  >
                    Save Changes
                  </Button>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </DefaultLayout>
  )
}

export default AccountProfilePage
