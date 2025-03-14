import { MusicList } from "@features/musics/components/MusicList/MusicList.tsx";
import { FC, ReactNode } from "react";
import styles from "./home.page.module.css";

interface IProps {
  children?: ReactNode;
}

export const HomePage: FC<IProps> = () => {
  // const { data: searchs } = useSearchGenius({
  //   variables: { query: "Hunnid Days" },
  // });

  // console.log({ searchs });

  return (
    <div className={styles.page}>
      <span>Home page</span>
      <div className={styles.musics_list}>
        <MusicList />
      </div>
      {/* <span>{searchs?.response.hits[0].result.title}</span> */}
    </div>
  );
};
