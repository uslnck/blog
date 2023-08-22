import { Link, useNavigate } from "react-router-dom";
import styles from "./sign-in.module.less";
import { SubmitHandler } from "react-hook-form";
import { ILoginData } from "../../../types";
import { useLoginUserMutation } from "../../../store";
import { Spin } from "antd";
import DynamicForm from "../../../components/form";
import { inputsProperties } from "./mock";

export default function SignIn() {
  const navigate = useNavigate();

  const [loginUser, { isLoading, isError, data }] = useLoginUserMutation();

  const onSubmit: SubmitHandler<ILoginData> = async (formData) => {
    const userData = {
      email: formData.email,
      password: formData.password,
    };
    await loginUser(userData);
  };

  if (data !== undefined) {
    localStorage.setItem("token", data.user.token);
    localStorage.setItem("username", data.user.username);
    navigate("/");
    navigate(0);
  }

  return (
    <>
      <DynamicForm
        inputsProperties={inputsProperties}
        onSubmit={onSubmit}
        formHeader="Sign In"
        loader={isLoading}
        loaderElement={<Spin size="large" />}
        error={isError}
        submitErrorText="Wrong email or password"
        submitButtonText="Login"
        formStyle="user"
      />
      <p className={styles.haveAccountParagraph}>
        Don't have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </>
  );
}
