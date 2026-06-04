import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router'

import CustomButton from '@/components/atoms/CustomButton/CustomButton'
import './NotFound404.css'

function NotFound404() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <p className="not-found-card__code">404</p>
        <p className="not-found-card__title">Không tìm thấy trang</p>
        <p className="not-found-card__description">
          Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.
        </p>
        <CustomButton
          component={RouterLink}
          to="/"
          size="large"
          variable="primary"
        >
          Về trang chủ
        </CustomButton>
        <p className="not-found-card__footer">
          Cần đăng nhập?{' '}
          <Link component={RouterLink} to="/login" underline="none">
            <span className="not-found-card__link">Đăng nhập</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default NotFound404
