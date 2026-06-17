/* eslint-disable no-empty */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import CustomButton from "@/components/atoms/CustomButton/CustomButton";
import CustomCheckBox from "@/components/atoms/CustomCheckBox/CustomCheckBox";
import CustomTextField from "@/components/atoms/CustomTextField/CustomTextField";
import "./LoginPage.css";
import { useDispatch } from "react-redux";
import { getErrorMessage } from "@/utils/getErrorMessage";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/atoms/CustomToast";
import { loginUserAPI, loginWithGoogleAPI } from "../../redux/userSlice/userSlice";
import { GoogleLogin } from "@react-oauth/google";

const validationMessages = {
  emailRequired: "Vui lòng nhập email",
  emailInvalid: "Email không hợp lệ",
  passwordRequired: "Vui lòng nhập mật khẩu",
  passwordMin: "Mật khẩu tối thiểu 6 ký tự",
};

const loginSchema = yup.object({
  email: yup
    .string()
    .required(validationMessages.emailRequired)
    .email(validationMessages.emailInvalid),
  password: yup
    .string()
    .required(validationMessages.passwordRequired)
    .min(6, validationMessages.passwordMin),
  rememberMe: yup.boolean().default(true),
});

function LoginPage() {
  const [searchParams] = useSearchParams();
  const registeredEmail = searchParams.get("registeredEmail");
  const verifyEmail = searchParams.get("verifyEmail");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  useEffect(() => {
    const emailFromParams = verifyEmail || registeredEmail;
    if (emailFromParams) {
      setValue("email", emailFromParams);
    }
  }, [verifyEmail, registeredEmail, setValue]);

  const onSubmit = async (formValues) => {
    try {
      const res = await dispatch(loginUserAPI(formValues)).unwrap();
      if (res) {
        showSuccessToast("Đăng nhập thành công!");
        navigate("/");
      }
    } catch (error) {
      // Check if error is due to unverified account (status 403)
      if (error.response?.status === 403) {
        navigate(`/account/verification?email=${encodeURIComponent(formValues.email)}`);
        showErrorToast('Tài khoản chưa được xác thực. Vui lòng nhập mã OTP.');
      } else {

        const errorMessage = getErrorMessage(error, "Đăng nhập thất bại!");
        showErrorToast(errorMessage);
      }
    }
  };

  const onGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await dispatch(loginWithGoogleAPI(credentialResponse)).unwrap();
      if (res) {
        showSuccessToast("Đăng nhập thành công!");
        navigate("/");
      }
    } catch (error) {
      // Check if error is due to unverified account (status 403)
      if (error.response?.status === 403) {
        // For Google login, we might not have the email readily available
        // You may need to decode the credential to get the email
        showErrorToast('Tài khoản chưa được xác thực. Vui lòng liên hệ quản trị viên.');
      } else {
        const errorMessage = getErrorMessage(error, "Đăng nhập thất bại!");
        showErrorToast(errorMessage);
      }
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__hero">
          <p className="login-card__title">Đăng nhập</p>
        </div>

        <div className="login-card__form-wrap">
           <div className="login-card__alert-wrap">
            {verifyEmail && (
              <Alert severity="success" className="login-card__alert">
                Email <strong>{verifyEmail}</strong> đã được xác thực. Bạn có
                thể đăng nhập ngay.
              </Alert>
            )}

            {!verifyEmail && registeredEmail && (
              <Alert severity="warning" className="login-card__alert">
                Cần xác thực email <strong>{registeredEmail}</strong>. Vui lòng
                kiểm tra hộp thư để lấy mã OTP.{' '}
                <Link
                  component={RouterLink}
                  to={`/account/verification?email=${encodeURIComponent(registeredEmail)}`}
                  underline="always"
                  sx={{ fontWeight: 600 }}
                >
                  Xác thực ngay
                </Link>
              </Alert>
            )}
          </div>
          <div className="login-card__form">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <CustomTextField
                fullWidth
                label="Email"
                type="email"
                required
                placeholder="ban@congty.com"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register("email")}
              />
              <CustomTextField
                fullWidth
                label="Mật khẩu"
                required
                type={showPassword ? "text" : "password"}
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
                          aria-label={
                            showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                          }
                        >
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            style={{ fontSize: 14 }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                {...register("password")}
              />

              <div className="login-card__form-row">
                <FormControlLabel
                  control={
                    <CustomCheckBox size="small" {...register("rememberMe")} />
                  }
                  label="Ghi nhớ tôi"
                />
                <Link
                  component={RouterLink}
                  to="/signup"
                  underline="none"
                  alignItems="center"
                >
                  <p className="login-card__link">Quên mật khẩu?</p>
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

              <GoogleLogin
                onSuccess={onGoogleLoginSuccess}
              />
            </form>

            <p className="login-card__footer">
              Chưa có tài khoản?{" "}
              <Link
                component={RouterLink}
                to="/signup"
                underline="none"
                alignItems="center"
              >
                <span className="login-card__link">Tạo tài khoản</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
