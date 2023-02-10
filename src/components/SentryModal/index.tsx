import { faShieldAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ISentryData } from "../../models/ISentryData";
import { TitledCell } from "../TitledCell";
import Table from "../Table";
import styles from "./styles.module.scss";
import { SentryObjectModal } from "../SentryObjectModal";
import { TTableHeadElements } from "../../models/TTableHeadElements";
import { TTableBodyElements } from "../../models/TTableBodyElements";

interface IProps {
  isShown: boolean;
  setIsShown: (arg0: boolean) => void;
  sentryData: ISentryData;
}
/**
 * Popup which shows a list of objects with a torino scale value >= 1.
 */
export const SentryModal = ({ isShown, setIsShown, sentryData }: IProps) => {
  
  /**
   * State
   */

  // Elements to pass to table
  const [headerElements, setHeaderElements] = useState<TTableHeadElements>([]);
  const [bodyElements, setBodyElements] = useState<TTableBodyElements>([]);

  const [isSentryZero, setIsSentryZero] = useState(true);

  const [isObjectModalShown, setIsObjectModalShown] = useState(false);
  const [selectedRawData, setSelectedRawData] = useState<ISentryData['data'][0] | undefined>();

  const onClickSentryObject = (data: ISentryData['data'][0]) => {
    setSelectedRawData(data);
    setIsObjectModalShown(true);
  };

  // Parse data and create arrays to pass to table
  useEffect(() => {
    // Parse objects with torino scale > 0
    const parsedData = sentryData.data.filter((i) => {
      return parseInt(i.ts_max || '0') > 0;
    });

    if(parsedData.length > 0) {
      setIsSentryZero(false);
    }

    const bodyElements: TTableBodyElements = [];
    parsedData.forEach(i => {
      bodyElements.push({
        elements: [{
          text: i.fullname
        }],
        onClick: () => onClickSentryObject(i)
      })
    });

    const headerElements: TTableHeadElements = [{
      element: "Name"
    }];

    // Store in state
    setHeaderElements(headerElements);
    setBodyElements(bodyElements);
  }, [sentryData]);

  if(!isShown) {
    return null;
  }

  if (isSentryZero) {
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
            title="Sentry Objects"
            link="https://cneos.jpl.nasa.gov/sentry/"
            tooltip="Visit sentry page"
            icon={() => <FontAwesomeIcon icon={faShieldAlt} />}
            isDisplayed={true}
            isHeightAuto={true}
          >
            No objects to display.
          </TitledCell>
        </div>
      </div>
    );
  }

  return (
    <>
      <SentryObjectModal
        isShown={isObjectModalShown}
        setIsShown={setIsObjectModalShown}
        rawData={selectedRawData}
      />

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
            title="Sentry Objects"
            link="https://cneos.jpl.nasa.gov/sentry/"
            tooltip="Visit sentry page"
            icon={() => <FontAwesomeIcon icon={faShieldAlt} />}
            isDisplayed={true}
            isHeightAuto={true}
          >
            <Table
              headElements={headerElements}
              bodyElements={bodyElements}
            />
          </TitledCell>
        </div>
      </div>
    </>
  );
};
