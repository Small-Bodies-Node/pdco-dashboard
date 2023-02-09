import styles from "./styles.module.scss";

export const Template = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Template Page</h1>
        <p className={styles.example}>This is a template component!</p>
      </div>
    </>
  );
};
