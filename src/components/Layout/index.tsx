import styles from "./styles.module.scss";

export const Layout = (props: React.PropsWithChildren<any>) => {
  return (
    <div className={"layout-container " + styles.container}>
      {props.children}
    </div>
  );
};
