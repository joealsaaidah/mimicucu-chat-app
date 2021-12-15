import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Routing
import PrivateRoute from "./components/routing/PrivateRoute";

//Screens
import PrivateScreen from "./components/screens/login-screens/PrivateScreen";
import LoginScreen from "./components/screens/login-screens/LoginScreen";
import RegisterScreen from "./components/screens/login-screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/login-screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/login-screens/ResetPasswordScreen";

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <PrivateRoute>
                <PrivateScreen />
              </PrivateRoute>
            }
          />
          <Route exact path='/login' element={<LoginScreen />} />
          <Route exact path='/register' element={<RegisterScreen />} />
          <Route
            exact
            path='/forgotpassword'
            element={<ForgotPasswordScreen />}
          />
          <Route
            exact
            path='/passwordreset/:resetToken'
            element={<ResetPasswordScreen />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
