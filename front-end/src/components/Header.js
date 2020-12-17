import React from "react";
import { FaRegUser } from "react-icons/fa";

const Header = ({onLogout, user}) => {
  return (
    <div className="nav">
      <ul>
        <li>
          <FaRegUser size={25} />
          Username {user.name}
        </li>
        <li>
          <img
            src="https://syllabus.codeyourfuture.io/img/logo.png"
            alt="cyf logo"
            width="200px"
            height="60px"
          />
        </li>
        <li>
          <button onClick={onLogout} className="Star">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
