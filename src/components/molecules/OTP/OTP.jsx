import { useState, useRef, useEffect } from 'react'

import CustomButton from '@/components/atoms/CustomButton/CustomButton'
import './OTP.css'

function OTP({
  length = 8,
  onSubmit,
  onResend,
  isSubmitting = false,
  submitLabel = 'Xác thực',
  submittingLabel = 'Đang xác thực...',
  resendPrompt = 'Chưa nhận được mã?',
  resendLabel = 'Gửi lại OTP',
  initialResendCountdown = 60,
  disabled = false,
}) {
  const [otp, setOtp] = useState(() => Array(length).fill(''))
  const [resendCountdown, setResendCountdown] = useState(initialResendCountdown)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef([])

  const lastIndex = length - 1

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }

    setCanResend(true)
  }, [resendCountdown])

  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < lastIndex) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, length)

    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length && i < length; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    const nextIndex = Math.min(pastedData.length, lastIndex)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const otpCode = otp.join('')

    if (otpCode.length !== length) return

    onSubmit(otpCode)
  }

  const handleResendOtp = async () => {
    try {
      await onResend()
      setResendCountdown(initialResendCountdown)
      setCanResend(false)
      setOtp(Array(length).fill(''))
      inputRefs.current[0]?.focus()
    } catch {
      // Parent handles error feedback.
    }
  }

  return (
    <>
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
              disabled={disabled || isSubmitting}
            />
          ))}
        </div>

        <CustomButton
          type="submit"
          size="large"
          fullWidth
          variable="primary"
          disabled={disabled || isSubmitting || otp.join('').length !== length}
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </CustomButton>
      </form>

      <div className="resend-otp-section">
        <p className="resend-otp-text">
          {resendPrompt}{' '}
          {canResend ? (
            <span className="resend-otp-link" onClick={handleResendOtp}>
              {resendLabel}
            </span>
          ) : (
            <span className="resend-otp-countdown">
              Gửi lại sau {resendCountdown}s
            </span>
          )}
        </p>
      </div>
    </>
  )
}

export default OTP
