import "./App.css";
import { lazy, Suspense } from "react";
import { Login } from "./Components/Views/Auth/Login/Login";
import { Register } from "./Components/Views/Auth/Register/Register";
import { Tasks } from "./Components/Views/Tasks/Tasks";
import { Donate } from "./Components/Views/Donate/Donate";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Registered from "./Components/Views/Registered/Registered";

const Error404 = lazy(() => import("./Components/Views/Error404/Error404"));

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

const pageTransition = {
  in: {
    opacity: 1,
  },

  out: {
    opacity: 0,
  },
};

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <motion.div
                  className="page"
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <Tasks />
                </motion.div>
              </RequireAuth>
            }
          />
          <Route
            path="login"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="register"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Register />
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Suspense fallback={<>...</>}>
                  <Error404 />
                </Suspense>
              </motion.div>
            }
          />
          <Route
            path="/registered/:teamID"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Suspense fallback={<>...</>}>
                  <Registered />
                </Suspense>
              </motion.div>
            }
          />
          <Route
            path="/donate"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Suspense fallback={<>...</>}>
                  <Donate />
                </Suspense>
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
