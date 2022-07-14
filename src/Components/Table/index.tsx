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
export default function Table({ headElements, bodyElements, children }: IProps) {
	return (
		<div className={styles.container}>
			<table className={styles.table}>
				{children}
				
				<thead className={styles.tHead}>
					<tr>
						{headElements.map((item, index) => (
							<th className={styles.th} onClick={item.onClick} key={index}>
								{item.element}
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
									{item}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}