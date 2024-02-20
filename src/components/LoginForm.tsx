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
    <h3 className="text-center">Login</h3>
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
      <div className="flex flex-col w-4/5">
        <label htmlFor="UserWithLevelname" className="mt-2">Username</label>
        <input
          name="username"
          type="text"
          id="UserWithLevelname"
          onChange={handleInputChange}
          autoComplete="username"
          className="mt-2 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col w-4/5">
        <label htmlFor="loginpassword"className="mt-2">Password</label>
        <input
          name="password"
          type="password"
          id="loginpassword"
          onChange={handleInputChange}
          autoComplete="current-password"
          className="mt-2 p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
    </form>
  </>
);
};

export default LoginForm;
