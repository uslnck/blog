import { Link } from "react-router-dom";
import styles from "./sign-up.module.less";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormData } from "../../types";
import { useCreateUserMutation } from "../../store";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<IFormData>();

  const watchPassword = watch("password", "");

  const [createUser, { isError, isSuccess, data }] = useCreateUserMutation();

  const onSubmit: SubmitHandler<IFormData> = async (formData) => {
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      repeatPassword: {},
      personalData: {},
    };
    await createUser(userData);
    if (isSuccess) {
      console.log("POST created; data:", data);
      navigate("/sign-in");
    }
  };

  return (
    <form
      className={styles.signUpContainer}
      onSubmit={void handleSubmit(onSubmit)}
    >
      <h2 className={styles.signUpHeader}>Create new account</h2>
      {isError ? (
        <p className={styles.validationError}>User already exists</p>
      ) : (
        false
      )}
      <div className={styles.inputGroup}>
        <label>Username</label>
        <input
          type="text"
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
        <label>Email</label>
        <input
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
        <label>Password</label>
        <input
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
        <label>Repeat Password</label>
        <input
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
      </div>

      <div className={styles.personalDataGroup}>
        <input
          type="checkbox"
          {...register("personalData", {
            validate: (value) =>
              value === true ||
              "Consent to personal data processing is required",
          })}
        />
        <label>I agree to the processing of my personal information</label>
      </div>
      {errors.personalData && (
        <p className={`${styles.validationError} ${styles.lessMargin}`}>
          {errors?.personalData.message}
        </p>
      )}

      <button type="submit" className={styles.createButton}>
        Create
      </button>
      <p className={styles.haveAccountParagraph}>
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </form>
  );
}
