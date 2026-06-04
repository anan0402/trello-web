import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Alert from '@mui/material/Alert'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { Link as RouterLink, useSearchParams } from 'react-router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import CustomButton from '@/components/atoms/CustomButton/CustomButton'
import CustomCheckBox from '@/components/atoms/CustomCheckBox/CustomCheckBox'
import './LoginPage.css'

const validationMessages = {
  emailRequired: 'Vui lòng nhập email',
  emailInvalid: 'Email không hợp lệ',
  passwordRequired: 'Vui lòng nhập mật khẩu',
  passwordMin: 'Mật khẩu tối thiểu 6 ký tự'
}

const loginSchema = yup.object({
  email: yup.string().required(validationMessages.emailRequired).email(validationMessages.emailInvalid),
  password: yup
    .string()
    .required(validationMessages.passwordRequired)
    .min(6, validationMessages.passwordMin),
  rememberMe: yup.boolean().default(true)
})

function LoginPage() {
  const [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')
  const verifyEmail = searchParams.get('verifyEmail')
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true
    }
  })

  useEffect(() => {
    const emailFromParams = verifyEmail || registeredEmail
    if (emailFromParams) {
      setValue('email', emailFromParams)
    }
  }, [verifyEmail, registeredEmail, setValue])

  const onSubmit = (formValues) => {
    console.log('Login submit:', formValues)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__hero">
          <p className="login-card__title">
            Chào mừng bạn quay lại.
          </p>
          <div className="login-card__alert-wrap">
          {verifyEmail && (
            <Alert severity="success" className="login-card__alert">
              Email <strong>{verifyEmail}</strong> đã được xác thực. Bạn có thể đăng nhập ngay.
            </Alert>
          )}

          {!verifyEmail && registeredEmail && (
            <Alert severity="warning" className="login-card__alert">
              Cần xác thực email <strong>{registeredEmail}</strong>. Vui lòng kiểm tra hộp thư và
              nhấn vào liên kết xác thực trước khi đăng nhập.
            </Alert>
          )}
          </div>
        </div>

        <div className="login-card__form-wrap">
          <div className="login-card__form">
            <p className="login-card__form-title">Đăng nhập</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <TextField
                fullWidth
                label="Email"
                type="email"
                placeholder="ban@congty.com"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register('email')}
              />
              <TextField
                fullWidth
                label="Mật khẩu"
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

              <div className="login-card__form-row">
                <FormControlLabel
                  control={<CustomCheckBox size="small" {...register('rememberMe')} />}
                  label="Ghi nhớ tôi"
                />
                <Link component={RouterLink} to="/signup" underline="none" alignItems='center'>
                  <p className="login-card__link">
                    Quên mật khẩu?
                  </p>
                </Link>
              </div>

              <CustomButton
                size="large"
                fullWidth
                variable="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Đăng nhập
              </CustomButton>

              <CustomButton
                variable="outline"
                size="large"
                fullWidth
              >
                Đăng nhập với Google
              </CustomButton>
            </form>

            <p className="login-card__footer">
              Chưa có tài khoản?{' '}
              <Link component={RouterLink} to="/signup" underline="none" alignItems='center'>
                <span className="login-card__link">Tạo tài khoản</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
