import styles from "./user-profile.module.less";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUpdateFormData } from "../../types";
import { useUpdateUserMutation } from "../../store";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

export default function UserProfile() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<IUpdateFormData>();

  const watchPassword = watch("password", "");

  const [updateUser, { isLoading, isError, isSuccess, data }] =
    useUpdateUserMutation();

  const token = localStorage.getItem("token") as string;

  const onSubmit: SubmitHandler<IUpdateFormData> = async (formData) => {
    const userNewData = {
      // username: formData?.username,
      // email: formData?.email,
      // bio: {},
      image: formData?.image,
      // repeatPassword: {},
    };
    await updateUser({ formData: userNewData, token });
  };

  if (isSuccess) {
    console.log("PUT created; data:", data);
    navigate("/");
    navigate(0);
  }

  return (
    <form
      className={styles.signUpContainer}
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
    >
      <h2 className={styles.signUpHeader}>Edit Profile</h2>
      {isError ? (
        <p className={styles.validationError}>User already exists</p>
      ) : (
        false
      )}
      {/* <div className={styles.inputGroup}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          autoComplete="on"
          className={errors.username ? styles.inputErrorBorder : ""}
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long",
            },
            maxLength: {
              value: 20,
              message: "Username cannot exceed 20 characters",
            },
          })}
        />
        {errors.username && (
          <p className={styles.validationError}>{errors?.username.message}</p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          autoComplete="on"
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
        <label htmlFor="password">New password</label>
        <input
          id="password"
          type="password"
          className={errors.password ? styles.inputErrorBorder : ""}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
            maxLength: {
              value: 40,
              message: "Password cannot exceed 40 characters",
            },
          })}
        />
        {errors.password && (
          <p className={styles.validationError}>{errors?.password.message}</p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="repeatPassword">Repeat new password</label>
        <input
          id="repeatPassword"
          type="password"
          className={errors.repeatPassword ? styles.inputErrorBorder : ""}
          {...register("repeatPassword", {
            validate: (value) =>
              value === watchPassword || "Passwords do not match",
          })}
        />
        {errors.repeatPassword && (
          <p className={styles.validationError}>
            {errors?.repeatPassword.message}
          </p>
        )}
      </div> */}

      <div className={styles.inputGroup}>
        <label htmlFor="image">Avatar image (url)</label>
        <input
          id="image"
          type="text"
          {...register("image", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
      </div>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <button type="submit" className={styles.createButton}>
          Save
        </button>
      )}
    </form>
  );
}
