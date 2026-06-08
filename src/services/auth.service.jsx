import authorizeAxiosInstance from '@/utils/authorizeAxiosInstance'

export const register = async ({ name, email, password }) => {
  const response = await authorizeAxiosInstance.post('/v1/users/register', {
    email,
    password,
    username: name
  })

  return response.data
}

export const verifyAccount = async ({ email, token }) => {
  const response = await authorizeAxiosInstance.post('/v1/users/verify', {
    email,
    token
  })

  return response.data
}

export const login = async ({ email, password }) => {
  const response = await authorizeAxiosInstance.post('/v1/users/login', {
    email,
    password
  })

  return response.data
}

export const profile = async () => {
  const response = await authorizeAxiosInstance.get('/v1/users/profile')
  return response.data
}