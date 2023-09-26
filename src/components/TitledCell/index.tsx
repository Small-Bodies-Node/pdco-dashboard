import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { ErrorBoundary } from "react-error-boundary";

import { MyError } from "../MyError";
import styles from "./styles.module.scss";

interface IProps {
  title: string;
  icon?: () => JSX.Element;
  link?: string;
  tooltip?: string;
  alignment?: "left" | "center" | "right";
  isDisplayed?: boolean;
  isHeightAuto?: boolean;
  onClick?: () => void;
  headerElement?: JSX.Element;
}

export const TitledCell = (props: React.PropsWithChildren<IProps>) => {
  // --->>

  const { alignment, title, link, tooltip, headerElement } = props;

  // Aux component
  const TitleRow = () => {
    return (
      <>
        <span style={{ paddingRight: 5 }}>
          {props.icon ? <props.icon /> : null}{" "}
        </span>
        <span>{title}</span>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.title} style={{ justifyContent: alignment }}>
        {/* <Tooltip
          title={tooltip || ""}
          placement="top"
          TransitionComponent={Zoom}
          arrow
        > */}
          <div>
          {!!link ? (
            <a
              target="_blank"
              href={link!}
              rel="noreferrer"
            >
              <TitleRow />
            </a>
          ) : !!props.onClick ? (
            <p
              onClick={() => {
                props.onClick && props.onClick();
              }}
            >
              <TitleRow />
            </p>
          ) : (
            <span>
              <TitleRow />
            </span>
          )}
          </div>
        {/* </Tooltip> */}

        {!!headerElement && headerElement}
      </div>
      <div className={styles.content}>
        <ErrorBoundary
          resetKeys={[props.children]}
          fallbackRender={() => <MyError />}
        >
          {props.isDisplayed ? props.children : <CircularProgress />}
        </ErrorBoundary>
      </div>
    </div>
  );
};
