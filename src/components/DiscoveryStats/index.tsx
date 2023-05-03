import React, { useState, useEffect } from 'react';
import { IDiscoveryStats } from '../../models/IDiscoveryStats';

import styles from "./styles.module.scss";

interface IDataRows {
  title: string;
  data: string;
}

/**
 * Panel to display discovery statistics for CAs
 */
export const DiscoveryStats = () => {
  // ------------------------------------------>>>

  // State
  const [dataRows, setDataRows] = useState<IDataRows[]>([]);

  // Fetch data on load
  useEffect(() => {
    //---------->>>

    const getData = async () => {
      const tempDataRows = [];

      // Fetch data
      const neaTotals: IDiscoveryStats = await (await fetch('/api/getDiscoveryStatsAllTime')).json();

      // Add data to temporary data rows variable
      tempDataRows.push({ title: 'Total NEAs', data: neaTotals.neosDiscovered.toString() });
      tempDataRows.push({ title: 'Total NEAs (>140m)', data: neaTotals.neosGreaterThan140m.toString() });
      tempDataRows.push({ title: 'Total NEAs (>1km)', data: neaTotals.neosGreaterThan1km.toString() });

      // Load data into state
      setDataRows(tempDataRows);
    };

    getData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.rowsContainer}>
          {dataRows.map((item, index) => (
            <div className={styles.row} key={index}>
              <div className={styles.rowLeft}>
                {item.title}
              </div>

              <div className={styles.rowRight}>{item.data}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
