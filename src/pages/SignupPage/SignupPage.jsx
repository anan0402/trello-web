import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link as RouterLink, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import * as yup from 'yup'

import CustomButton from '@/components/atoms/CustomButton/CustomButton'
import CustomTextField from '@/components/atoms/CustomTextField/CustomTextField'
import { register as registerAccount } from '@/services/auth.service'
import { getErrorMessage } from '@/utils/getErrorMessage'
import './SignupPage.css'
import { showErrorToast, showSuccessToast } from '../../components/atoms/CustomToast'

const validationMessages = {
  nameRequired: 'Vui lòng nhập họ và tên',
  emailRequired: 'Vui lòng nhập email',
  emailInvalid: 'Email không hợp lệ',
  passwordRequired: 'Vui lòng nhập mật khẩu',
  passwordMin: 'Mật khẩu tối thiểu 6 ký tự'
}

const signupSchema = yup.object({
  name: yup.string().required(validationMessages.nameRequired),
  email: yup.string().required(validationMessages.emailRequired).email(validationMessages.emailInvalid),
  password: yup
    .string()
    .required(validationMessages.passwordRequired)
    .min(6, validationMessages.passwordMin)
})

function SignupPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (formValues) => {
    try {
      await registerAccount(formValues)
      showSuccessToast('Đăng ký tài khoản thành công. Vui lòng kiểm tra email để lấy mã OTP.')
      navigate(`/account/verification?email=${encodeURIComponent(formValues.email)}`)
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Đăng ký thất bại!')

      // Check if error is due to already registered account
      if (error.response?.status === 409 || errorMessage.includes('đã tồn tại')) {
        showErrorToast('Email đã được đăng ký. Chuyển đến trang xác thực...')

        navigate(`/account/verification?email=${encodeURIComponent(formValues.email)}`)

      } else {
        showErrorToast(errorMessage)
      }
    }
  }


  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-card__hero">
          <p className="signup-card__title">
            Đăng ký
          </p>
        </div>
        <div className="signup-card__form-wrap">
          <div className="signup-card__form">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <CustomTextField
                fullWidth
                label="Họ và tên"
                placeholder="Nhập họ và tên"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                {...register('name')}
              />
              <CustomTextField
                fullWidth
                label="Email"
                required
                type="email"
                placeholder="ban@congty.com"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register('email')}
              />
              <CustomTextField
                fullWidth
                label="Mật khẩu"
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        >
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            style={{ fontSize: 14 }}
                          />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
                {...register('password')}
              />

              <CustomButton
                size="large"
                fullWidth
                variable="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Đăng ký
              </CustomButton>

            </form>

            <p className="signup-card__footer">
              Đã có tài khoản?{' '}
              <Link component={RouterLink} to="/login" underline="none" alignItems="center">
                <span className="signup-card__link">Đăng nhập ngay</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
