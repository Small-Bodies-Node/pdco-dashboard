import React from "react";

import styles from "./styles.module.scss";

interface IProps {
  imageUrl: string;
  link?: string;
}

export const ImageCell = (props: IProps) => {
  return (
    <div className={styles.container}>
      <a target="_blank" rel="noreferrer" href={props.link}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${props.imageUrl})`,
          }}
        ></div>
      </a>
    </div>
  );
};
