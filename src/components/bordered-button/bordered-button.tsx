import classNames from "classnames";
import { IBorderedButtonProps } from "../../types/prop-types";
import styles from "./bordered-button.module.less";

export default function BorderedButton({
  onClick,
  type,
  text,
  color,
  borderColor,
  padding,
  disabled,
  position,
  fontSize,
  width,
}: IBorderedButtonProps) {
  const buttonStyle = {
    color: color,
    borderColor: borderColor || color,
    padding: padding,
    fontSize: fontSize,
    width: width,
  };

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={classNames(styles.borderedButton, {
        [styles.disabled]: disabled,
        [styles.flexEnd]: position === "flex-end",
      })}
      style={buttonStyle}
    >
      {text}
    </button>
  );
}
