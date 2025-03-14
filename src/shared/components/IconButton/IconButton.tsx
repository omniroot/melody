import { FC } from "react";
import styles from "./IconButton.module.css";
import clsx from "clsx";

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "normal" | "transparent";
}
export const IconButton: FC<IProps> = ({
  children,
  variant = "normal",
  className,
  ...rest
}) => {
  const _class = clsx(className, styles.icon_button);
  return (
    <button className={_class} data-variant={variant} {...rest}>
      {children}
    </button>
  );
};
