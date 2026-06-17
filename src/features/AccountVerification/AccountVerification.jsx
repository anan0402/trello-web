import Link from '@mui/material/Link'
import { useState, useRef, useEffect } from 'react'
import { Navigate, Link as RouterLink, useSearchParams } from 'react-router'

import CustomButton from '@/components/atoms/CustomButton/CustomButton'
import { verifyAccount, resendOtp } from '@/services/auth.service'
import { getErrorMessage } from '@/utils/getErrorMessage'
import './AccountVerification.css'
import { showErrorToast, showSuccessToast } from '../../components/atoms/CustomToast'

function VerificationFooter() {
  return (
    <p className="account-verification-card__footer">
      Đã có tài khoản?{' '}
      <Link component={RouterLink} to="/login" underline="none">
        <span className="account-verification-card__link">Đăng nhập</span>
      </Link>
    </p>
  )
}

function VerificationCard({ children }) {
  return (
    <div className="account-verification-page">
      <div className="account-verification-card">
        <div className="account-verification-card__content">{children}</div>
      </div>
    </div>
  )
}

function AccountVerification() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const [otp, setOtp] = useState(['', '', '', '', '', '', '', ''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)
  const [resendCountdown, setResendCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef([])

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [resendCountdown])

  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 8)

    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length && i < 8; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 7)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpCode = otp.join('')

    if (otpCode.length !== 8) {
      showErrorToast('Vui lòng nhập đủ 8 số OTP')
      return
    }

    setIsSubmitting(true)
    try {
      await verifyAccount({ email, token: otpCode })
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
      setResendCountdown(60)
      setCanResend(false)
      setOtp(['', '', '', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } catch (error) {
      const message = getErrorMessage(error, 'Không thể gửi lại mã OTP. Vui lòng thử lại sau.')
      showErrorToast(message)
    }
  }

  if (!email) {
    return <Navigate to="/404" replace />
  }

  if (status === 'success') {
    return <Navigate to={`/login?verifyEmail=${encodeURIComponent(email)}`} replace />
  }

  return (
    <VerificationCard>
      <div className="account-verification-card__header">
        <h2 className="account-verification-card__title">Xác thực tài khoản</h2>
        <p className="account-verification-card__description">
          Nhập mã OTP 8 số đã được gửi đến email <strong>{email}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="otp-input-container" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="otp-input"
              autoFocus={index === 0}
            />
          ))}
        </div>

        <CustomButton
          type="submit"
          size="large"
          fullWidth
          variable="primary"
          disabled={isSubmitting || otp.join('').length !== 8}
        >
          {isSubmitting ? 'Đang xác thực...' : 'Xác thực'}
        </CustomButton>
      </form>

      <div className="resend-otp-section">
        <p className="resend-otp-text">
          Chưa nhận được mã?{' '}
          {canResend ? (
            <span className="resend-otp-link" onClick={handleResendOtp}>
              Gửi lại OTP
            </span>
          ) : (
            <span className="resend-otp-countdown">
              Gửi lại sau {resendCountdown}s
            </span>
          )}
        </p>
      </div>

      <VerificationFooter />
    </VerificationCard>
  )
}

export default AccountVerification
