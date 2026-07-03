import { environment } from './environment'

export const getAvatarSrc = (avatar) => {
  if (!avatar) return ''
  if (avatar.startsWith('http://') || avatar.startsWith('https://')) return avatar
  return `${environment.apiBaseUrl}${avatar}`
}
