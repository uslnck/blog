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
    register,
    formState: { errors },
  } = useForm<IUpdateFormData>();

  const [updateUser, { isLoading, isError, isSuccess }] =
    useUpdateUserMutation();

  const token = localStorage.getItem("token") as string;

  const onSubmit: SubmitHandler<IUpdateFormData> = async (formData) => {
    const userNewData = {
      user: formData?.user,
      email: formData?.email,
      image: formData?.image,
    };
    await updateUser({ formData: userNewData, token: token });
  };
  if (isSuccess) {
    navigate("/");
    navigate(0);
  }

  return (
    <form
      className={styles.signUpContainer}
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
    >
      <h2 className={styles.signUpHeader}>Edit Profile</h2>
      {isError ? <p className={styles.validationError}>Error</p> : false}
      <div className={styles.inputGroup}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          autoComplete="on"
          className={errors.user ? styles.inputErrorBorder : ""}
          {...register("user", {
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
        {errors.user && (
          <p className={styles.validationError}>{errors?.user.message}</p>
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
        <label htmlFor="image">Avatar image (url)</label>
        <input id="image" type="text" {...register("image")} />
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
