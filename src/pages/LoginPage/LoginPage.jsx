import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import Text from '@/components/atoms/Text/Text'
import TrelloButton from '@/components/atoms/TrelloButton/TrelloButton'
import './LoginPage.css'

function LoginPage() {
  return (
    <Box className="login-page">
      <Paper elevation={0} className="login-card">
        <Box className="login-card__hero">
          <Text variant="overline" className="login-card__eyebrow">
            YOUR DAILY
          </Text>
          <Text variant="h3" className="login-card__title">
            Welcome back.
          </Text>
        </Box>

        <Box className="login-card__form-wrap">
          <Box className="login-card__form">
            <Text variant="h4" className="login-card__form-title">
              Dang nhap
            </Text>
            <Text variant="body2" className="login-card__form-subtitle">
              Nhap thong tin tai khoan de truy cap workspace cua ban.
            </Text>

            <Stack component="form" spacing={2.5}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                placeholder="ban@congty.com"
              />
              <TextField
                fullWidth
                label="Mat khau"
                type="password"
                placeholder="Nhap mat khau"
              />

              <Box className="login-card__form-row">
                <FormControlLabel
                  control={<Checkbox size="small" defaultChecked />}
                  label="Ghi nho toi"
                />
                <Link href="#" underline="hover" className="login-card__link">
                  Quen mat khau?
                </Link>
              </Box>

              <TrelloButton size="large" fullWidth className="login-card__button">
                Dang nhap
              </TrelloButton>

              <TrelloButton
                variant="outlined"
                size="large"
                fullWidth
                className="login-card__button login-card__button--outlined"
              >
                Dang nhap voi Google
              </TrelloButton>
            </Stack>

            <Text variant="body2" className="login-card__footer">
              Chua co tai khoan?{' '}
              <Link href="#" underline="hover" className="login-card__link">
                Tao tai khoan
              </Link>
            </Text>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginPage
