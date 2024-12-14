import { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import logo from '../assets/logo.png'

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout()
    .then(() => {
      navigate('/login');
    })
    .catch(err => {
      console.log(err.code);
    })
  }
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/applications">My Applications</NavLink>
      </li>
      <li>
        <NavLink to='/add-job'>Add Job</NavLink>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 backdrop-blur-xl z-50 bg-violet-600/30">
      <nav className="navbar bg-transparent p-0 max-w-screen-xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost p-0 min-h-0 h-0 mr-2 lg:mr-0 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/">
            <img src={logo} className="h-8 w-8" alt="logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button onClick={handleLogout} className="btn">
              Log out
            </button>
          ) : (
            <div className="join">
              <Link
                to="/login"
                state={location?.state}
                className="join-item btn border-none"
              >
                Log in
              </Link>
              <Link
                to="register"
                state={location?.state}
                className="join-item btn border-none"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
