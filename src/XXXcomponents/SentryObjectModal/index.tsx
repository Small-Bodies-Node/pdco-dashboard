import { faTable, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ISentryData } from "../../models/ISentryData";
import { TTableBodyElements } from "../../models/TTableBodyElements";
import { TTableHeadElements } from "../../models/TTableHeadElements";
import { kmToFt } from "../../utils/conversionFormulae";
import Table from "../Table";
import { TitledCell } from "../TitledCell";
import styles from "./styles.module.scss";

enum SizeUnits {
  m,
  ft,
  __LENGTH
}

interface ISentryDetailsData {
  energy: string;
  pdate: string;
  ts_max: string;
  ps_cum: string;
}

interface IProps {
  isShown: boolean;
  setIsShown: (arg0: boolean) => void;

  rawData: ISentryData['data'][0] | undefined;
}
/**
 * Popup for use within the SentryModal component. Shows more details
 * about a specific NEO with a torino scale value >= 1.
 */
export const SentryObjectModal = ({ isShown, setIsShown, rawData }: IProps) => {
  /**
   * State
   */

  // Elements to pass to table
  const [headerElements, setHeaderElements] = useState<TTableHeadElements>([]);
  const [bodyElements, setBodyElements] = useState<TTableBodyElements>([]);

  const [sizeUnit, setSizeUnit] = useState<number>(SizeUnits.m);
  const [detailsData, setDetailsData] = useState<ISentryDetailsData>();

  // On load/change of rawData, fetch more data on selected object and 
  // load the details into state
  useEffect(() => {
    if (!rawData) {
      return;
    }

    fetch(`https://ssd-api.jpl.nasa.gov/sentry.api?des=${rawData.des.replaceAll(' ', '%20')}`).then(
      async (res) => {
        setDetailsData((await res.json())['summary'] as ISentryDetailsData);
      }
    );
  }, [rawData]);

  // On change of size units, raw rows, or details data, regenerate arrays 
  // for the table
  useEffect(() => {
    if(!rawData) {
      return;
    }

    const headerElements: TTableHeadElements = [
      {
        element: "Data Point"
      },
      {
        element: "Value"
      }];

    const bodyElements: TTableBodyElements = [
      {
        elements: [
          { text: `Size (${SizeUnits[sizeUnit]})` },
          { text: convertKmTo(rawData.diameter) }
        ],
        onClick: incrementSizeUnit
      }
    ];
    
    // Add the date if available
    if(!!detailsData) {
      bodyElements.push(
        {
          elements: [
            { text: 'Date' },
            { text: detailsData.pdate }
          ]
        }
      )
    }

    // Add the remaining rawData elements
    bodyElements.push(
      {
        elements: [
          { text: 'ip' },
          { text: rawData.ip }
        ]
      },
      {
        elements: [
          { text: 'n_imp' },
          { text: rawData.n_imp }
        ]
      },
      {
        elements: [
          { text: 'h' },
          { text: rawData.h }
        ]
      }
    );

    // Add remaining details if available
    if(!!detailsData) {
      bodyElements.push(
        {
          elements: [
            {
              text: 'Energy'
            },
            {
              text: detailsData.energy
            }
          ]
        },
        {
          elements: [
            { text: 'ts_max' },
            { text: detailsData.ts_max }
          ]
        },
        {
          elements: [
            { text: 'ps_cum' },
            { text: detailsData.ps_cum }
          ]
        }
      )
    }

    setHeaderElements(headerElements);
    setBodyElements(bodyElements);
  }, [sizeUnit, detailsData, rawData]);

  const convertKmTo = (value: string, digits?: number): string => {
    let size: string;

    switch (sizeUnit) {
      case SizeUnits.m:
        size = (parseFloat(value) * 1000).toLocaleString('en-US', {
          maximumFractionDigits: digits ?? 0
        });
        break;
      case SizeUnits.ft:
        size = kmToFt(parseFloat(value)).toLocaleString('en-US', {
          maximumFractionDigits: digits ?? 0
        });
        break;
      default:
        throw 'Not supposed to be possible';
    }

    return size;
  };

  const incrementSizeUnit = () => {
    setSizeUnit((sizeUnit + 1) % SizeUnits.__LENGTH);
  };

  const getSSDUrlFromFullName = (fullName: string): string => {
    const baseUrl = 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=';
    const nameParts = fullName.split(' ');

    if (nameParts.length >= 3 && !isNaN(+nameParts[0])) {
      return baseUrl + nameParts[0];
    } else {
      return baseUrl + fullName.replaceAll(' ', '%20');
    }
  };

  const getMPCUrlFromFullName = (fullName: string): string => {
    const baseUrl = 'https://minorplanetcenter.net/db_search/show_object?object_id=';
    const nameParts = fullName.split(' ');

    if (nameParts.length >= 3 && !isNaN(+nameParts[0])) {
      return baseUrl + nameParts[0];
    } else {
      return baseUrl + fullName.replaceAll(' ', '+');
    }
  };

  const getSentryURLFromFullName = (fullName: string): string => {
    const baseUrl = 'https://cneos.jpl.nasa.gov/sentry/details.html#?des=';
    const nameParts = fullName.split(' ');

    if (nameParts.length >= 3 && !isNaN(+nameParts[0])) {
      return baseUrl + nameParts[0];
    } else {
      return baseUrl + fullName.replaceAll(' ', '%20');
    }
  };

  if (!isShown || !rawData) {
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
          title={rawData.fullname}
          //link={getSSDUrlFromFullName(rawRow.fullname)}
          tooltip={'Detailed data for ' + rawData.fullname}
          icon={() => <FontAwesomeIcon icon={faTable} />}
          isDisplayed={true}
          isHeightAuto={true}
        >
          <div className={styles.rowContainer}>
            {/** LINK TO MPC SITE */}
            <div className={styles.linkContainer}>
              <a
                href={getSentryURLFromFullName(
                  rawData.fullname.replaceAll('(', '').replaceAll(')', '')
                )}
                className={styles.mpcLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Sentry
              </a>
            </div>

            {/** LINK TO SBDB SITE */}
            <div className={styles.linkContainer}>
              <a
                href={getSSDUrlFromFullName(
                  rawData.fullname.replaceAll('(', '').replaceAll(')', '')
                )}
                className={styles.mpcLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View SBDB Data
              </a>
            </div>

            {/** LINK TO SBDB SITE WITH ORBIT DIAGRAM */}
            <div className={styles.linkContainer}>
              <a
                href={
                  getSSDUrlFromFullName(rawData.fullname.replaceAll('(', '').replaceAll(')', '')) +
                  '&view=VOP'
                }
                className={styles.mpcLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Orbit Diagram
              </a>
            </div>

            {/** LINK TO MPC SITE */}
            <div className={styles.linkContainer}>
              <a
                href={getMPCUrlFromFullName(
                  rawData.fullname.replaceAll('(', '').replaceAll(')', '')
                )}
                className={styles.mpcLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on MPC
              </a>
            </div>

            {/** LINK TO CNEOS CA PAGE */}
            <div className={styles.linkContainer}>
              <a
                href="https://cneos.jpl.nasa.gov/ca/"
                className={styles.mpcLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View CNEOS CA
              </a>
            </div>
          </div>

          {/** OTHER VALUES TABLE */}
          <Table
            headElements={headerElements}
            bodyElements={bodyElements}
          />
        </TitledCell>
      </div>
    </div>
  )
};
