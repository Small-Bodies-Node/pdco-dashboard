import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";

/**
 * ...
 */
export const SidebarMenu = () => {
  // --->>

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.menuButton} onClick={() => setIsMenuOpen(true)}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div
        className={styles.menuOuterContainer}
        style={{
          background: `${isMenuOpen ? "rgba(0, 0, 0, 0.5)" : "transparent"}`,
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={styles.menuContainer}
        style={{
          left: `${isMenuOpen ? 0 : -300}px`,
        }}
      >
        <div className={styles.menuHeader}>
          <p>Menu</p>

          <div
            className={styles.closeButton}
            onClick={() => setIsMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>

        <div className={styles.menuRow}>
          <Link href="/">
            <a onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </a>
          </Link>
        </div>

        <div className={styles.menuRow}>
          <Link href="/about">
            <a onClick={() => setIsMenuOpen(false)}>
              About
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
