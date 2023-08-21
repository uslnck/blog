import classNames from "classnames";
import { IBorderedButtonProps } from "../../types/prop-types";
import styles from "./bordered-button.module.less";
import { Link } from "react-router-dom";

export default function BorderedButton({
  onClick,
  type,
  text,
  lineHeight,
  color,
  borderColor,
  padding,
  disabled,
  position,
  fontSize,
  width,
  linkTo,
  linkState,
}: IBorderedButtonProps) {
  const buttonStyle = {
    color: color,
    borderColor: borderColor || color,
    padding: padding,
    fontSize: fontSize,
    width: width,
    lineHeight: lineHeight,
  };

  if (linkTo)
    return (
      <Link
        to={linkTo}
        state={linkState}
        className={classNames(styles.borderedButton, {
          [styles.flexEnd]: position === "flex-end",
          [styles.alignCenter]: position === "align-center",
          [styles.justifyCenter]: position === "justify-center",
        })}
        style={buttonStyle}
      >
        {text}
      </Link>
    );

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
