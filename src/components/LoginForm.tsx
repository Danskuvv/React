import { useUserContext } from "../hooks/ContextHooks";
//import { useAuthentication } from "../hooks/apiHooks";
import {useForm} from "../hooks/formHooks";
import { Credentials } from "../types/localTypes";
//import { useNavigate } from "react-router-dom";

// LoginForm.tsx
const LoginForm = () => {
  const {handleLogin} = useUserContext();

  const initValues: Credentials = {username: '', password: ''};

  const doLogin = async () => {
    handleLogin(inputs as Credentials);
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

 return (
  <>
    <h3>Login</h3>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="UserWithLevelname">Username</label>
        <input
          name="username"
          type="text"
          id="UserWithLevelname"
          onChange={handleInputChange}
          autoComplete="username"
        />
      </div>
      <div>
        <label htmlFor="loginpassword">Password</label>
        <input
          name="password"
          type="password"
          id="loginpassword"
          onChange={handleInputChange}
          autoComplete="current-password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </>
);
};

export default LoginForm;
