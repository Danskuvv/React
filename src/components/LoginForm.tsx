import { useAuthentication } from "../hooks/apiHooks";
import {useForm} from "../hooks/formHooks";
import { Credentials } from "../types/localTypes";
import { useNavigate } from "react-router-dom";

// LoginForm.tsx
const LoginForm = () => {
  const {postLogin} = useAuthentication();
  const navigate = useNavigate();

  const initValues: Credentials = {
    username: '',
    password: '',
 };

 const doLogin = async () => {
  try {
    console.log('submit callback, inputs:', inputs);
    // TODO: use postLogin to authenticate with server
    const loginResult = await postLogin(inputs as Credentials);
    if (loginResult) {
      console.log('Login success:', loginResult);
      localStorage.setItem('token', loginResult.token); //save token to local storage
      navigate('/');
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};


 const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, initValues);

 console.log(inputs);

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
