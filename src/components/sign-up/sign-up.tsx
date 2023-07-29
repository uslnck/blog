import styles from "./sign-up.module.less";

export default function SignUp() {
  return (
    <div className={styles.signUpContainer}>
      <h2 className={styles.signUpHeader}>Create new account</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Username" />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Email" />
        <></>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Password" />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="repeat-password">Repeat Password</label>
        <input
          type="password"
          id="repeat-password"
          placeholder="Repeat Password"
        />
      </div>
      <div className={styles.personalDataCheckbox}>
        <input type="checkbox" id="personalData" />
        <label htmlFor="personalData">
          I agree to the processing of my personal information
        </label>
      </div>
      <button className={styles.createButton}>Create</button>
      <p className={styles.haveAccountParagraph}>
        Already have an account? <a href="">Sign In</a>
      </p>
    </div>
  );
}
