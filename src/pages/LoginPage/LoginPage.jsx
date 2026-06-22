import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import CustomButton from "@/components/atoms/CustomButton/CustomButton";
import CustomCheckBox from "@/components/atoms/CustomCheckBox/CustomCheckBox";
import CustomTextField from "@/components/atoms/CustomTextField/CustomTextField";
import AuthCardLayout from "@/components/templates/AuthCardLayout/AuthCardLayout";
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
  const [showPassword, setShowPassword] = useState(false);
  const [isNeedVerifyEmail, setIsNeedVerifyEmail] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const handleGoToVerification = () => {
    const email = getValues("email");

    if (!email) return;

    navigate(`/account/verification?email=${encodeURIComponent(email)}`);
    setIsNeedVerifyEmail(false);
  };

  const onSubmit = async (formValues) => {
    try {
      const res = await dispatch(loginUserAPI(formValues)).unwrap();
      if (res) {
        showSuccessToast("Đăng nhập thành công!");
        navigate("/");
      }
    } catch (error) {
      // Check if error is due to unverified account (status 403)
      if (error?.status === 403) {
        const errorMessage = getErrorMessage(error, "Đăng nhập thất bại!");
        showErrorToast(errorMessage);
        setIsNeedVerifyEmail(true);
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
      if (error?.status === 403) {
        // For Google login, we might not have the email readily available
        // You may need to decode the credential to get the email
        const errorMessage = getErrorMessage(error, "Đăng nhập thất bại!");
        showErrorToast(errorMessage);
      } else {
        const errorMessage = getErrorMessage(error, "Đăng nhập thất bại!");
        showErrorToast(errorMessage);
      }
    }
  }


  const verificationAlert = isNeedVerifyEmail ? (
    <Alert severity="warning" className="auth-card__alert">
      Cần xác thực email <strong>{getValues("email")}</strong>. Vui lòng
      kiểm tra hộp thư để lấy mã OTP.{" "}
      <Link
        component="button"
        type="button"
        underline="always"
        sx={{ fontWeight: 600 }}
        onClick={handleGoToVerification}
      >
        Xác thực ngay
      </Link>
    </Alert>
  ) : null;

  return (
    <AuthCardLayout title="Đăng nhập" alert={verificationAlert}>
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
          onError={(error) => {
            console.log("Login Failed", error);
          }}
          onSuccess={onGoogleLoginSuccess}
        />
      </form>

      <div className="auth-card__footer-row">
        <p className="auth-card__footer">
          Chưa có tài khoản?{" "}
          <Link
            component={RouterLink}
            to="/signup"
            underline="none"
            alignItems="center"
          >
            <span className="auth-card__link">Tạo tài khoản</span>
          </Link>
        </p>
        <div className="auth-card__form-row">
          <Link
            component={RouterLink}
            to="/forgot-password"
            underline="none"
            alignItems="center"
          >
            <p className="auth-card__link">Quên mật khẩu?</p>
          </Link>
        </div>
      </div>
    </AuthCardLayout>
  );
}

export default LoginPage;
