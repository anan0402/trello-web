import Link from '@mui/material/Link'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import CustomButton from '@/components/atoms/CustomButton/CustomButton'
import CustomTextField from '@/components/atoms/CustomTextField/CustomTextField'
import SimpleCardLayout from '@/components/templates/SimpleCardLayout/SimpleCardLayout'
import OTP from '@/components/molecules/OTP/OTP'
import { forgotPassword, verifyForgotPasswordOtp, resetPassword, resendOtpChangePassword } from '@/services/auth.service'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { showErrorToast, showSuccessToast } from '@/components/atoms/CustomToast'

const emailValidationMessages = {
  emailRequired: 'Vui lòng nhập email',
  emailInvalid: 'Email không hợp lệ',
}

const passwordValidationMessages = {
  passwordRequired: 'Vui lòng nhập mật khẩu mới',
  passwordMin: 'Mật khẩu tối thiểu 6 ký tự',
  confirmPasswordRequired: 'Vui lòng xác nhận mật khẩu',
  passwordMatch: 'Mật khẩu xác nhận không khớp',
}

const emailSchema = yup.object({
  email: yup
    .string()
    .required(emailValidationMessages.emailRequired)
    .email(emailValidationMessages.emailInvalid),
})

const passwordSchema = yup.object({
  newPassword: yup
    .string()
    .required(passwordValidationMessages.passwordRequired)
    .min(6, passwordValidationMessages.passwordMin),
  confirmPassword: yup
    .string()
    .required(passwordValidationMessages.confirmPasswordRequired)
    .oneOf([yup.ref('newPassword')], passwordValidationMessages.passwordMatch),
})

function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState('email') // 'email', 'otp', 'password'
  const [email, setEmail] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmittingOtp, setIsSubmittingOtp] = useState(false)

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isSubmitting: isSubmittingEmail },
  } = useForm({
    resolver: yupResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmitEmail = async (formValues) => {
    try {
      await forgotPassword({ email: formValues.email })
      setEmail(formValues.email)
      showSuccessToast('Mã OTP đã được gửi đến email của bạn.')
      setStep('otp')
    } catch (error) {
      const message = getErrorMessage(error, 'Không thể gửi mã OTP. Vui lòng thử lại.')
      showErrorToast(message)
    }
  }

  const handleVerifyOtp = async (otpCode) => {
    setIsSubmittingOtp(true)
    try {
      await verifyForgotPasswordOtp({ email, otp: otpCode })
      showSuccessToast('Xác thực OTP thành công.')
      setStep('password')
    } catch (error) {
      const message = getErrorMessage(error, 'Mã OTP không chính xác hoặc đã hết hạn.')
      showErrorToast(message)
    } finally {
      setIsSubmittingOtp(false)
    }
  }

  const handleResendOtp = async () => {
    try {
      await resendOtpChangePassword({ email })
      showSuccessToast('Mã OTP mới đã được gửi đến email của bạn.')
    } catch (error) {
      const message = getErrorMessage(error, 'Không thể gửi lại mã OTP. Vui lòng thử lại sau.')
      showErrorToast(message)
      throw error
    }
  }

  const onSubmitPassword = async (formValues) => {
    try {
      await resetPassword({ newPassword: formValues.newPassword })
      showSuccessToast('Đặt lại mật khẩu thành công.')
      navigate('/login')
    } catch (error) {
      const message = getErrorMessage(error, 'Không thể đặt lại mật khẩu. Vui lòng thử lại.')
      showErrorToast(message)
    }
  }

  // Step 1: Email Entry
  if (step === 'email') {
    return (
      <SimpleCardLayout
        title="Quên mật khẩu"
        description="Nhập email của bạn để nhận mã OTP khôi phục mật khẩu"
      >
        <form
          onSubmit={handleSubmitEmail(onSubmitEmail)}
          noValidate
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          <CustomTextField
            fullWidth
            label="Email"
            type="email"
            required
            placeholder="ban@congty.com"
            error={Boolean(emailErrors.email)}
            helperText={emailErrors.email?.message}
            {...registerEmail('email')}
          />

          <CustomButton
            type="submit"
            size="large"
            fullWidth
            variable="primary"
            disabled={isSubmittingEmail}
          >
            {isSubmittingEmail ? 'Đang gửi...' : 'Gửi mã OTP'}
          </CustomButton>
        </form>

        <p className="simple-card__footer">
          Nhớ mật khẩu?{' '}
          <Link component={RouterLink} to="/login" underline="none">
            <span className="simple-card__link">Đăng nhập</span>
          </Link>
        </p>
      </SimpleCardLayout>
    )
  }

  // Step 2: OTP Verification
  if (step === 'otp') {
    return (
      <SimpleCardLayout
        title="Xác thực OTP"
        description={
          <>
            Nhập mã OTP 8 số đã được gửi đến email <strong>{email}</strong>
          </>
        }
      >
        <OTP
          onSubmit={handleVerifyOtp}
          onResend={handleResendOtp}
          isSubmitting={isSubmittingOtp}
          submitLabel="Xác thực"
          submittingLabel="Đang xác thực..."
        />

        <p className="simple-card__footer">
          Nhớ mật khẩu?{' '}
          <Link component={RouterLink} to="/login" underline="none">
            <span className="simple-card__link">Đăng nhập</span>
          </Link>
        </p>
      </SimpleCardLayout>
    )
  }

  // Step 3: Reset Password
  return (
    <SimpleCardLayout
      title="Đặt lại mật khẩu"
      description="Nhập mật khẩu mới cho tài khoản của bạn"
    >
      <form
        onSubmit={handleSubmitPassword(onSubmitPassword)}
        noValidate
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <CustomTextField
          fullWidth
          label="Mật khẩu mới"
          required
          type={showNewPassword ? 'text' : 'password'}
          placeholder="Nhập mật khẩu mới"
          error={Boolean(passwordErrors.newPassword)}
          helperText={passwordErrors.newPassword?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    aria-label={showNewPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    <FontAwesomeIcon
                      icon={showNewPassword ? faEyeSlash : faEye}
                      style={{ fontSize: 14 }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          {...registerPassword('newPassword')}
        />

        <CustomTextField
          fullWidth
          label="Xác nhận mật khẩu mới"
          required
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Nhập lại mật khẩu mới"
          error={Boolean(passwordErrors.confirmPassword)}
          helperText={passwordErrors.confirmPassword?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                      style={{ fontSize: 14 }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          {...registerPassword('confirmPassword')}
        />

        <CustomButton
          type="submit"
          size="large"
          fullWidth
          variable="primary"
          disabled={isSubmittingPassword}
        >
          {isSubmittingPassword ? 'Đang đặt lại...' : 'Đặt lại mật khẩu'}
        </CustomButton>
      </form>

      <p className="simple-card__footer">
        Nhớ mật khẩu?{' '}
        <Link component={RouterLink} to="/login" underline="none">
          <span className="simple-card__link">Đăng nhập</span>
        </Link>
      </p>
    </SimpleCardLayout>
  )
}

export default ForgotPassword
