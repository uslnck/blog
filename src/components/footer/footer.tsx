import styles from "./footer.module.less";
import { Pagination } from "antd";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <Pagination />
      </div>
    </footer>
  );
}

export default Footer;
