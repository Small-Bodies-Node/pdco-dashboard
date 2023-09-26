import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TitledCell } from '../TitledCell';

interface IProps {
  isShown: boolean;
  setIsShown: (arg0: boolean) => void;
  query: string;
}
/**
 * Popup to show the results for the searched NEO
 */
export const NeoSearchModal = ({ isShown, setIsShown, query }: IProps) => {
  // ------------------------------------------>>>

  // Methods
  const getSSDUrlFromFullName = (): string => {
    const baseUrl = 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=';

    return baseUrl + query.toUpperCase().replaceAll(' ', '%20');
  };

  const getMPCUrlFromFullName = (): string => {
    const baseUrl = 'https://minorplanetcenter.net/db_search/show_object?object_id=';

    return baseUrl + query.toUpperCase().replaceAll(' ', '+');
  };

  if (!isShown) {
    return null;
  }

  return (
    <div className={styles.backgroundContainer} onClick={() => setIsShown(false)}>
      <div className={styles.mainContentContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButtonContainer}>
          <FontAwesomeIcon
            className={styles.closeButton}
            onClick={() => setIsShown(false)}
            style={{ fontSize: 18 }}
            flip="horizontal"
            icon={faTimes}
          />
        </div>

        <TitledCell
          title={query}
          isDisplayed
        >
          <div className={styles.linksContainer}>
            {/** LINK TO SBDB SITE */}
            <div className={styles.linkContainer}>
              <a
                href={getSSDUrlFromFullName()}
                className={styles.linkText}
                target="_blank"
                rel="noopener noreferrer"
              >
                SBDB Data
              </a>
            </div>

            {/** LINK TO ORBIT DIAGRAM */}
            <div className={styles.linkContainer}>
              <a
                href={getSSDUrlFromFullName() + '&view=VOP'}
                className={styles.linkText}
                target="_blank"
                rel="noopener noreferrer"
              >
                SBDB Orbit
              </a>
            </div>

            {/** LINK TO MPC SITE */}
            <div className={styles.linkContainer}>
              <a
                href={getMPCUrlFromFullName()}
                className={styles.linkText}
                target="_blank"
                rel="noopener noreferrer"
              >
                MPC Data
              </a>
            </div>
          </div>
        </TitledCell>
      </div>
    </div>
  );
};
