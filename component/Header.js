import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "store/services/auth";

export const Header = () => {
  const { replace } = useRouter();
  const [logout] = useLogoutMutation();
  const data = useSelector(({ user }) => user.user)

  const handleLogout = async () => {
    const { data } = await logout();
    if (data.status === 200) replace("/login");
  };

  return (
    <div className="header">
      <h2>Welcome, {data?.username}</h2>
      <button onClick={handleLogout} className="logout__button">
        LOGOUT
      </button>
    </div>
  );
};
