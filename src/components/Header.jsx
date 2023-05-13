import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/argentBankLogo.png";
import { selectCurrentToken, logOut } from "../features/auth/authSlice";
import { selectFirstName } from "../features/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";

function Header() {
  const token = useSelector(selectCurrentToken);
  const firstName = useSelector(selectFirstName);
  const dispatch = useDispatch();

  const logout = () => dispatch(logOut());
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {!token ? (
        <div>
          <Link className="main-nav-item" to="/login">
            {/* <i className="fa fa-user-circle"></i> */}
            <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </Link>
          <Link className="main-nav-item" to="/signup">
            {/* <i className="fa fa-user-circle"></i> */}
            <FontAwesomeIcon icon={faCircleUser} />
            Sign Up
          </Link>
        </div>
      ) : (
        <div>
          <Link className="main-nav-item" to="/profile">
            {/* <i className="fa fa-user-circle"></i> */}
            <FontAwesomeIcon icon={faCircleUser} />

            {firstName}
          </Link>
          <Link className="main-nav-item" to="/" onClick={logout}>
            {/* <i className="fa fa-sign-out"></i> */}
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Sign Out
          </Link>
        </div>
      )}
    </nav>
  );
}
export default Header;
