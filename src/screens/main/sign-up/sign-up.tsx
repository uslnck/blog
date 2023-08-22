import { Link } from "react-router-dom";
import styles from "./sign-up.module.less";
import { SubmitHandler } from "react-hook-form";
import { IFormData } from "../../../types";
import { useCreateUserMutation } from "../../../store";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import DynamicForm from "../../../components/form";
import { inputsProperties } from "./mock";

export default function SignUp() {
  const navigate = useNavigate();

  const [createUser, { isLoading, isError, isSuccess, data }] =
    useCreateUserMutation();

  const onSubmit: SubmitHandler<IFormData> = async (formData) => {
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    await createUser(userData);
  };

  if (isSuccess) {
    console.log("User created; data:", data);
    navigate("/sign-in");
  }

  return (
    <>
      <DynamicForm
        inputsProperties={inputsProperties}
        onSubmit={onSubmit}
        formHeader="Create new account"
        loader={isLoading}
        loaderElement={<Spin size="large" />}
        error={isError}
        submitErrorText="User already exists"
        submitButtonText="Create"
        formStyle="user"
      />
      <p className={styles.haveAccountParagraph}>
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </>
  );
}
