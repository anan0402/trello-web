import authorizeAxiosInstance from '@/utils/authorizeAxiosInstance'

export const register = async ({ name, email, password }) => {
  const response = await authorizeAxiosInstance.post('/v1/users/register', {
    email,
    password,
    userName: name
  })

  return response.data
}

export const verifyAccount = async ({ email, verificationToken }) => {
  const response = await authorizeAxiosInstance.post('/v1/users/verify', {
    email,
    verificationToken
  })

  return response.data
}