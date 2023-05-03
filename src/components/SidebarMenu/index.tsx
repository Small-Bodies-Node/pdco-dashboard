import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import { NeoSearchModal } from "../NeoSearchModal";

/**
 * ...
 */
export const SidebarMenu = () => {
  // --->>

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isNeoSearchModalModalShown, setIsNeoSearchModalShown] =
    useState(false);
  const [neoSearchQuery, setNeoSearchQuery] = useState("");

  const closeMenu = () => {
    setIsMenuOpen(false);
    setNeoSearchQuery("");
  }

  return (
    <div className={styles.container}>
      <NeoSearchModal
        isShown={isNeoSearchModalModalShown}
        setIsShown={setIsNeoSearchModalShown}
        query={neoSearchQuery}
      />

      <div className={styles.menuButton} onClick={() => setIsMenuOpen(true)}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div
        className={styles.menuOuterContainer}
        style={{
          background: `${isMenuOpen ? "rgba(0, 0, 0, 0.5)" : "transparent"}`,
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
        onClick={() => closeMenu()}
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
            onClick={() => closeMenu()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>

        <div className={styles.menuRow}>
          <Link href="/" onClick={() => closeMenu()}>
            Dashboard
          </Link>
        </div>

        <div className={styles.menuRow}>
          <Link href="/about" onClick={() => closeMenu()}>
            About
          </Link>
        </div>

        <div className={styles.menuRow}>
          <p className={styles.searchHeader}>
            NEO Search
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsNeoSearchModalShown(true);
            }}
            className={styles.searchBox}
          >
            <input
              placeholder="Search NEOs..."
              value={neoSearchQuery}
              onChange={(e) => setNeoSearchQuery(e.target.value)}
              type="text"
              onClick={(e) => e.stopPropagation()}
            />

            <button type="submit" onClick={(e) => e.stopPropagation()}>
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
