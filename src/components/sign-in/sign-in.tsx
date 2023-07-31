import { Link, useNavigate } from "react-router-dom";
import styles from "./sign-in.module.less";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginData } from "../../types";
import { useAppDispatch, useLoginUserMutation } from "../../store";
import { Spin } from "antd";
import { addUser } from "../../store/user-slice";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginData>();

  const [loginUser, { isLoading, isError, isSuccess, data }] =
    useLoginUserMutation();

  const onSubmit: SubmitHandler<ILoginData> = async (formData) => {
    const userData = {
      email: formData.email,
      password: formData.password,
    };
    await loginUser(userData);
  };

  if (isSuccess) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(addUser(data));
    console.log("User logged in successfully; data:", data);
    navigate("/");
  }

  return (
    <form
      className={styles.signUpContainer}
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
    >
      <h2 className={styles.signUpHeader}>Sign In</h2>
      {isError ? (
        <p className={styles.validationError}>Wrong email or password</p>
      ) : (
        false
      )}
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
          autoComplete="on"
          id="email"
          type="text"
          className={errors.email ? styles.inputErrorBorder : ""}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className={styles.validationError}>{errors?.email.message}</p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className={errors.password ? styles.inputErrorBorder : ""}
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <p className={styles.validationError}>{errors?.password.message}</p>
        )}
      </div>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <button type="submit" className={styles.createButton}>
          Login
        </button>
      )}
      <p className={styles.haveAccountParagraph}>
        Don't have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </form>
  );
}
