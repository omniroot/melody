import { ReactNode, FC } from "react";
import styles from "./home.page.module.css";

interface IProps {
  children?: ReactNode;
}

export const HomePage: FC<IProps> = () => {
  return <div className={styles.page}>Home page</div>;
};
