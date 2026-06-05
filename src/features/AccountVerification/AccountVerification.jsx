import Link from '@mui/material/Link'
import { useEffect, useState } from 'react'
import { Navigate, Link as RouterLink, useSearchParams } from 'react-router'

import CustomButton from '@/components/atoms/CustomButton/CustomButton'
import PageLoadingSpinner from '@/components/molecules/PageLoadingSpinner/PageLoadingSpinner'
import { verifyAccount } from '@/services/auth.service'
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
  const token = searchParams.get('token')
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (email && token) {
      setStatus('loading')
      verifyAccount({ email, token })
        .then(() => {
          setStatus('success')
          showSuccessToast('Xác thực thành công.')
        })
        .catch((error) => {
          const message = getErrorMessage(error, 'Xác thực thất bại.')
          showErrorToast(message)
          setStatus('error')
        })
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to="/404" replace />
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
        >
          Đăng ký lại
        </CustomButton>
        <VerificationFooter />
      </VerificationCard>
    )
  }

  if (status === 'success') {
    return <Navigate to={`/login?verifyEmail=${encodeURIComponent(email)}`} replace />
  }

  return null
}

export default AccountVerification
