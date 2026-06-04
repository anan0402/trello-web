import Link from '@mui/material/Link'
import { useEffect, useState } from 'react'
import { Navigate, Link as RouterLink, useParams } from 'react-router'

import CustomButton from '@/components/atoms/CustomButton/CustomButton'
import PageLoadingSpinner from '@/components/molecules/PageLoadingSpinner/PageLoadingSpinner'
import { verifyAccount } from '@/services/auth.service'
import './AccountVerification.css'

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
  const { email, verificationToken } = useParams()
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (email && verificationToken) {
      setStatus('loading')
      verifyAccount({ email, verificationToken })
        .then(() => {
          setStatus('success')
        })
        .catch(() => {
          setStatus('error')
        })
    }
  }, [email, verificationToken])

  if (!email || !verificationToken) {
    return <Navigate to="*" />
  }

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="account-verification-page">
        <PageLoadingSpinner message="Đang xác thực, vui lòng đợi trong giây lát..." />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <VerificationCard title="Xác thực thất bại.">
        <p className="account-verification-card__text account-verification-card__text--error">
          Xác thực thất bại.
        </p>
        <CustomButton
          component={RouterLink}
          to="/signup"
          size="large"
          fullWidth
          variable="outline"
        >
          Đăng ký lại
        </CustomButton>
        <VerificationFooter />
      </VerificationCard>
    )
  }

  return <Navigate to={`/login?verifyEmail=${email}`} />
}

export default AccountVerification
