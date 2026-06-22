import authorizeAxiosInstance from '@/utils/authorizeAxiosInstance'

export const search = async (query) => {
  const response = await authorizeAxiosInstance.get('/v1/search', {
    params: { q: query }
  })
  return response.data
}
