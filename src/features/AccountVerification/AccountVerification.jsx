import Link from '@mui/material/Link'
import { useState } from 'react'
import { Navigate, Link as RouterLink, useSearchParams } from 'react-router'

import OTP from '@/components/molecules/OTP/OTP'
import SimpleCardLayout from '@/components/templates/SimpleCardLayout/SimpleCardLayout'
import { verifyAccount, resendOtp } from '@/services/auth.service'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { showErrorToast, showSuccessToast } from '../../components/atoms/CustomToast'

function AccountVerification() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const handleSubmit = async (otpCode) => {
    setIsSubmitting(true)
    try {
      await verifyAccount({ email, otp: otpCode })
      setStatus('success')
      showSuccessToast('Xác thực thành công.')
    } catch (error) {
      const message = getErrorMessage(error, 'Mã OTP không chính xác hoặc đã hết hạn.')
      showErrorToast(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendOtp = async () => {
    try {
      await resendOtp({ email })
      showSuccessToast('Mã OTP mới đã được gửi đến email của bạn.')
    } catch (error) {
      const message = getErrorMessage(error, 'Không thể gửi lại mã OTP. Vui lòng thử lại sau.')
      showErrorToast(message)
      throw error
    }
  }

  if (!email) {
    return <Navigate to="/404" replace />
  }

  if (status === 'success') {
    return <Navigate to={`/login?verifyEmail=${encodeURIComponent(email)}`} replace />
  }

  return (
    <SimpleCardLayout
      title="Xác thực tài khoản"
      description={
        <>
          Nhập mã OTP 8 số đã được gửi đến email <strong>{email}</strong>
        </>
      }
    >
      <OTP
        onSubmit={handleSubmit}
        onResend={handleResendOtp}
        isSubmitting={isSubmitting}
      />

      <p className="simple-card__footer">
        Đã có tài khoản?{' '}
        <Link component={RouterLink} to="/login" underline="none">
          <span className="simple-card__link">Đăng nhập</span>
        </Link>
      </p>
    </SimpleCardLayout>
  )
}

export default AccountVerification
