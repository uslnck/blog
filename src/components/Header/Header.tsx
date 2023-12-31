import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.less";
import { useGetUserQuery } from "../../store";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import BorderedButton from "../BorderedButton";

export default function Header() {
  const [token, setToken] = useState("");
  const [skip, setSkip] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token") as string);
    if (token) setSkip(false);
  }, [token]);

  const { data: userObject, isFetching } = useGetUserQuery(token, {
    skip,
  });

  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    navigate("/");
    navigate(0);
  };

  if (!token)
    return (
      <header>
        <div className={styles.headerContainer}>
          <Link className={styles.title} to={"/articles"} replace>
            Realworld Blog
          </Link>
          <div className={styles.signContainer}>
            <Link className={styles.signIn} to={"/sign-in"}>
              Sign In
            </Link>
            <Link className={styles.signUp} to={"/sign-up"}>
              Sign Up
            </Link>
          </div>
        </div>
      </header>
    );

  return (
    <header>
      <div className={styles.headerContainer}>
        <button className={styles.title} onClick={() => navigate("/articles")}>
          Realworld Blog
        </button>
        {isFetching ? (
          <Spin />
        ) : (
          <div className={styles.signedContainer}>
            <BorderedButton
              text="Create article"
              lineHeight="22px"
              padding="6px 10px"
              color="#52C41A"
              fontSize="14px"
              linkTo="/new-article"
              position="align-center"
            />
            <Link className={styles.signUp} to={"/profile"}>
              <div className={styles.usernameAvatarContainer}>
                <span className={styles.username}>
                  {userObject?.user.username}
                </span>
                <img
                  className={styles.image}
                  src={userObject?.user.image || "./avatar.png"}
                  alt="avatar"
                />
              </div>
            </Link>
            <BorderedButton
              onClick={handleLogout}
              type="button"
              text="Log Out"
              padding="10px 15px"
              color="rgba(0, 0, 0, 0.75)"
              fontSize="18px"
            />
          </div>
        )}
      </div>
    </header>
  );
}
