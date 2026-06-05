import { Navigate, createBrowserRouter, RouterProvider } from "react-router";

import AccountVerification from "@/features/AccountVerification";
import NotFound404 from "@/features/404";
import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import ProblemDemoPage from "@/pages/ProblemDemoPage/ProblemDemoPage";
import SignupPage from "@/pages/SignupPage/SignupPage";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/problem-demo",
    element: <ProblemDemoPage />,
  },
  {
    path: "/account/verification",
    element: <AccountVerification />,
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
      <RouterProvider router={router} />
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
