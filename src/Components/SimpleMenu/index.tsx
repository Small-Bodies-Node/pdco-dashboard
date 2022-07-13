import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCog } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";

/**
 * ...
 */
export const SimpleMenu = () => {
  // --->>

  return (
    <div className={styles.container}>
      <ul>
        <li>
          <Link href="/">HOME</Link>
        </li>
        <li>
          <Link href="/about">ABOUT</Link>
        </li>
      </ul>

      <FontAwesomeIcon className={styles.settings} size="2x" icon={faCog} />
    </div>
  );
};
