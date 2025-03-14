import { FC } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "normal" | "transparent";
}
export const Button: FC<IProps> = ({
  children,
  variant = "normal",
  className,
  ...rest
}) => {
  const _class = clsx(className, styles.button);
  return (
    <button className={_class} data-variant={variant} {...rest}>
      {children}
    </button>
  );
};
