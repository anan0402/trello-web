import { Navigate, createBrowserRouter, RouterProvider ,Outlet} from "react-router";
import AccountVerification from "@/features/AccountVerification";
import ForgotPassword from "@/features/ForgotPassword";
import NotFound404 from "@/features/404";
import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import ProblemDemoPage from "@/pages/ProblemDemoPage/ProblemDemoPage";
import SignupPage from "@/pages/SignupPage/SignupPage";
import AccountProfilePage from "@/pages/AccountProfilePage/AccountProfilePage";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/userSlice/userSlice";

function ProtectedRoute() {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function GuestRoute() {
  const currentUser = useSelector(selectCurrentUser);

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

const routers = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/account/verification",
        element: <AccountVerification />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/problem-demo",
        element: <ProblemDemoPage />,
      },
      {
        path: "/profile/:id",
        element: <AccountProfilePage />,
      },
    ],
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/404",
    element: <NotFound404 />,
  },

  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routers} />
      <ToastContainer
        newestOnTop
        theme="light"
        closeButton={false}
        toastStyle={{
          background: "transparent",
          boxShadow: "none",
          padding: 0,
        }}
      />
    </>
  );
}

export default App;
