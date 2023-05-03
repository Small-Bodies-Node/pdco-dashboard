import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faTimes } from "@fortawesome/free-solid-svg-icons";

import { TitledCell } from "../TitledCell";
import styles from "./styles.module.scss";
import { IDiscoveryStatsData } from "../../models/IDiscoveryStatsData";

interface IProps {
  isShown: boolean;
  setIsShown: (arg0: boolean) => void;
}
export const DiscoveryStatsModal = ({ isShown, setIsShown }: IProps) => {
  // --->>

	// State
	const [timePeriod, setTimePeriod] = useState('calendarYear');
	const [year, setYear] = useState((new Date()).getFullYear().toString());

	const [isButtonLoading, setIsButtonLoading] = useState(false);
	
	const [discoveryStats, setDiscoveryStats] = useState<IDiscoveryStatsData | null>(null);
	const [cadData, setCadData] = useState<{
		neosPassingWithin1LD: string;
		neosPassingWithinGeo: string;
	} | null>(null);

	const [displayedTimePeriod, setDisplayedTimePeriod] = useState('');
	const [displayedYear, setDisplayedYear] = useState('');
	const [displayedStartDate, setDisplayedStartDate] = useState('');
	const [displayedEndDate, setDisplayedEndDate] = useState('');
	const [displayedCadStartDate, setDisplayedCadStartDate] = useState('');
	const [displayedCadEndDate, setDisplayedCadEndDate] = useState('');

	const [years, setYears] = useState<number[]>([]);

	useEffect(() => {
		// Generate year elements
		let today = new Date();
		let elements = [];
		for(var i = 0; i < (today.getFullYear() - 2009); i++) {
			elements.push(today.getFullYear() - i);
		}

		setYears(elements);
		//loadData();
	}, []);

	useEffect(() => {
		if(isShown && !discoveryStats) {
			loadData();
		}
	}, [isShown]);

	// Load data for selected time perido and year
	const loadData = async () => {
		setIsButtonLoading(true);
		setDiscoveryStats(null);
		setCadData(null);

		let numbersStartDateString = ``;
		let numbersEndDateString = ``;

		let cadStartDateString = ``;
		let cadEndDateString = ``;

		if(timePeriod === 'fiscalYear') {
			const today = new Date();

			numbersStartDateString = cadStartDateString = `${parseInt(year) - 1}-10-01`;
			numbersEndDateString = `${parseInt(year)}-10-01`;
			cadEndDateString = `${parseInt(year)}-09-30`;

			// Current year selected and fiscal year not over yet
			if(parseInt(year) === today.getFullYear() && today.getMonth() <= 8) {
				numbersStartDateString = `${parseInt(year) - 1}-10-01`;
				numbersEndDateString = `${parseInt(year)}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
				cadEndDateString = `${parseInt(year)}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
			}
		}
		else {
			const today = new Date();

			numbersStartDateString = cadStartDateString = `${parseInt(year)}-01-01`;
			numbersEndDateString = `${parseInt(year) + 1}-01-01`;
			cadEndDateString = `${parseInt(year)}-12-31`;

			// Current year selected
			if(parseInt(year) === today.getFullYear()) {
				numbersEndDateString = `${parseInt(year)}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
				cadEndDateString = `${parseInt(year)}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
			}
		}

		const discoveryStats: IDiscoveryStatsData = await (await fetch(`/api/getDiscoveryStats?numbersStartDate=${numbersStartDateString}&numbersEndDate=${numbersEndDateString}`, { cache: "no-cache" })).json();
		setDiscoveryStats(discoveryStats);
		setDisplayedStartDate(numbersStartDateString);
		setDisplayedEndDate(discoveryStats.actualFetchedEndDate);

		const cadData = await (await fetch(`/api/getCadData?dateMin=${cadStartDateString}&dateMax=${cadEndDateString}&distMax=1LD`, { cache: "no-cache" })).json();
		let belowGeo = 0;
		cadData.data.forEach((element: string[]) => {
			if(parseFloat(element[4]) < 0.00023920795) {
				belowGeo += 1;
			}
		});
		setCadData({
			neosPassingWithin1LD: cadData.count,
			neosPassingWithinGeo: belowGeo.toFixed(0)
		});
		setDisplayedCadStartDate(cadStartDateString);
		setDisplayedCadEndDate(cadEndDateString);

		setIsButtonLoading(false);
		setDisplayedYear(year);
		setDisplayedTimePeriod(timePeriod);
	}

  if (!isShown) {
    return null;
  }

  return (
    <div
      className={styles.backgroundContainer}
      onClick={() => setIsShown(false)}
    >
      <div
        className={styles.mainContentContainer}
        onClick={(e) => e.stopPropagation()}
      >
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
          title="Discovery Stats"
          icon={() => <FontAwesomeIcon icon={faChartColumn} />}
          isDisplayed={true}
          isHeightAuto={true}
        >
					<div className={styles.titledCellContent}>
						<span className={styles.timePeriodTitle}>
							Time period?
						</span>

						<select value={timePeriod} onChange={e => setTimePeriod(e.target.value)}>
							<option disabled value='placeholder'>
								Please select an option
							</option>

							<option value='fiscalYear'>
								Fiscal Year
							</option>

							<option value='calendarYear'>
								Calendar Year
							</option>
						</select>

						{timePeriod !== 'placeholder' && <>
							<span className={styles.yearTitle}>
								Year?
							</span>

							<select value={year} onChange={e => setYear(e.target.value)}>
								<option disabled value='placeholder'>
									Please select an option
								</option>

								{years.map((item, index) => (
									<option key={index} value={item}>
										{timePeriod === 'fiscalYear' && 'FY'}{item}{item === (new Date()).getFullYear() && ' (Partial)'}
									</option>
								))}
							</select>
						</>}

						{timePeriod !== 'placeholder' && year !== 'placeholder' &&
							<button
								onClick={loadData}
								className={styles.loadButton}
								disabled={isButtonLoading}
							>
								{isButtonLoading ? 'Loading...' : 'Load'}
							</button>}

						{!!discoveryStats && !!cadData &&
							<div className={styles.dataRowsContainer}>
								<span className={styles.dataRowContainerTitle}>
									Data for {displayedTimePeriod === 'fiscalYear' && 'FY'}{displayedYear}
								</span>

								<DiscoveryStatRow title='NEAs Discovered (>140m)' data={discoveryStats.neasDiscovered140m} />
								<DiscoveryStatRow title='NEAs Discovered (>1km)' data={discoveryStats.neasDiscovered1km} />
								<DiscoveryStatRow title='NEAs Discovered (all)' data={discoveryStats.neasDiscovered} />
								<DiscoveryStatRow title='NECs Discovered' data={discoveryStats.cometsDiscovered} />
								<DiscoveryStatRow title='NEOs Passed Within 1LD' data={cadData.neosPassingWithin1LD} />
								<DiscoveryStatRow title='NEOs Passed Within Geosynchronous' data={cadData.neosPassingWithinGeo} />

								<span className={styles.dataRowContainerTitle}>
									Data for All Time
								</span>

								<DiscoveryStatRow title='NEAs Discovered (>140m)' data={discoveryStats.neasDiscovered140mAllTime} />
								<DiscoveryStatRow title='% NEAs Discovered (>140m)' data={(parseFloat(String(discoveryStats.neasDiscovered140mAllTime)) / 25000 * 100).toFixed(1) + '%'} />
								<DiscoveryStatRow title='NEAs Discovered (>1km)' data={discoveryStats.neasDiscovered1kmAllTime} />
								<DiscoveryStatRow title='NEAs Discovered (all)' data={discoveryStats.neasDiscoveredAllTime} />

								<span className={styles.dataSubText}>
									<b>Note:</b>&nbsp;Most data is from <b>{displayedStartDate}</b> to <b>{displayedEndDate}</b>, due to the way data is reported. NEOs within 1LD 
									and GEO is from <b>{displayedCadStartDate}</b> to <b>{displayedCadEndDate}</b>.
									<br/><br />
									<b>Note:</b> NEO population {'>'}140m estimated to be 25000.
									<br /><br />
									Data comes from CNEOS.
								</span>

								<a
									href="https://cneos.jpl.nasa.gov/stats/totals.html"
									target="_blank"
									rel="noopener noreferrer"
									className={styles.cneosButton}
								>
									Go to CNEOS Totals
								</a>
							</div>}
					</div>
        </TitledCell>
      </div>
    </div>
  );
};

function DiscoveryStatRow({title, data}: { title: string, data: string | number }) {
	return (
		<div className={styles.dataRow}>
			<span className={styles.dataRowTitle}>
				{title}:
			</span>
			&nbsp;
			<span className={styles.dataRowBody}>
				{data}
			</span>
		</div>
	)
}