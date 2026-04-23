import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link as RouterLink } from 'react-router'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import * as yup from 'yup'

import CustomButton from '@/components/atoms/CustomButton/CustomButton'
import './SignupPage.css'

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

  const onSubmit = (formValues) => {
    console.log('Signup submit:', formValues)
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-card__hero">
          <p className="signup-card__eyebrow">
            THAM GIA NGAY
          </p>
          <p className="signup-card__title">
            Tạo tài khoản mới.
          </p>
        </div>

        <div className="signup-card__form-wrap">
          <div className="signup-card__form">
            <p className="signup-card__form-title">Đăng ký</p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <TextField
                fullWidth
                label="Họ và tên"
                placeholder="Nhập họ và tên"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                {...register('name')}
              />
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

              <CustomButton
                size="large"
                fullWidth
                variable="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Đăng ký
              </CustomButton>

              <CustomButton variable="outline" size="large" fullWidth>
                Đăng ký bằng Google
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
