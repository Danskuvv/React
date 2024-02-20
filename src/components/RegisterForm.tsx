import { useState } from 'react';
import {useUser} from '../hooks/apiHooks';
import {useForm} from '../hooks/formHooks';

const RegisterForm = () => {
  const {postUser} = useUser();
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
  const [emailAvailable, setEmailAvailable] = useState<boolean>(true);

  const initValues = {username: '', password: '', email: ''};

  const doRegister = async () => {
    try {
      console.log(inputs);
      await postUser(inputs);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
    initValues,
  );

  const {getUsernameAvailable, getEmailAvailable} = useUser();

  const handleUsernameBlur = async (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    const result = await getUsernameAvailable(event.currentTarget.value);
    setUsernameAvailable(result.available);
  };

  const handleEmailBlur = async (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    const result = await getEmailAvailable(event.currentTarget.value);
    setEmailAvailable(result.available);
  };

  console.log(usernameAvailable, emailAvailable);

  return (
    <>
      <h3 className="text-center">Register</h3>
<form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
  <div className="flex flex-col w-4/5">
    <label htmlFor="username" className="mt-2">Username</label>
    <input
      name="username"
      type="text"
      id="username"
      onChange={handleInputChange}
      onBlur={handleUsernameBlur}
      autoComplete="username"
      className="mt-2 p-2 border border-gray-300 rounded"
    />
  </div>
  {!usernameAvailable && (
          <div className="flex w-4/5 justify-end pr-4">
            <p className="text-red-500">Username not available</p>
          </div>
        )}
  <div className="flex flex-col w-4/5">
    <label htmlFor="password" className="mt-2">Password</label>
    <input
      name="password"
      type="password"
      id="password"
      onChange={handleInputChange}
      autoComplete="current-password"
      className="mt-2 p-2 border border-gray-300 rounded"
    />
  </div>
  <div className="flex flex-col w-4/5">
    <label htmlFor="email" className="mt-2">Email</label>
    <input
      name="email"
      type="email"
      id="email"
      onChange={handleInputChange}
      onBlur={handleEmailBlur}
      autoComplete="email"
      className="mt-2 p-2 border border-gray-300 rounded"
    />
  </div>
  {!emailAvailable && (
          <div className="flex w-4/5 justify-end pr-4">
            <p className="text-red-500">Email not available</p>
          </div>
        )}

  <button
    type="submit"
    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Register
  </button>
</form>
    </>
  );
};

export default RegisterForm;
