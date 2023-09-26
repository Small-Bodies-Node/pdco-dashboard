import { Tooltip, Zoom } from "@mui/material";
import { TTableBodyElements } from "../../models/TTableBodyElements";
import { TTableHeadElements } from "../../models/TTableHeadElements";
import styles from "./styles.module.scss";

interface IProps {
	// Header elements (e.g. ["Name", "ID"])
	headElements: TTableHeadElements;

	// Array of array of elements to load in the body
	// e.g. ([["Jane Doe", "123"], ["John Doe", "456"]])
	bodyElements: TTableBodyElements;

	children?: JSX.Element | JSX.Element[];
}
/**
 * Table component which creates a table with the passed head 
 * elements, body elements, and children.
 */
export default function Table({ headElements, bodyElements, children }: IProps) {
	return (
		<div className={styles.container}>
			<table className={styles.table}>
				{children}
				
				<thead className={styles.tHead}>
					<tr>
						{headElements.map((item, index) => (
							<th className={styles.th} onClick={item.onClick} key={index}>
								{/* <Tooltip
									title={item.tooltip ?? ''}
									placement="top"
									TransitionComponent={Zoom}
									arrow
								> */}
									<span>
										{item.element}
									</span>
								{/* </Tooltip> */}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{bodyElements.map((row, rowIndex) => (
						<tr
							className={styles.tr}
							style={{
								color: row.color
							}}
							onClick={row.onClick}
							key={rowIndex}
						>
							{row.elements.map((item, index) => (
								<td key={index}>
									{/* <Tooltip
										title={item.tooltip ?? ''}
										placement="top"
										TransitionComponent={Zoom}
										arrow
									> */}
										<span>
											{item.text}
										</span>
									{/* </Tooltip> */}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}