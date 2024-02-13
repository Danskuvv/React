import { Link, Outlet } from "react-router-dom";
import { useUserContext } from "../hooks/ContextHooks";

const Layout = () => {

  const {user, handleAutoLogin} = useUserContext();

  if (!user) {
    handleAutoLogin();
  }


  return(
<div>
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/upload">Upload</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/logout">Logout</Link>
      </li>
    </ul>
  </nav>
  <main>
    <Outlet />
  </main>
</div>
  );
}

export default Layout;
