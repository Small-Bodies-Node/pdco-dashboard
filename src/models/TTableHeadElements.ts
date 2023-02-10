/**
 * Type used in props for Table element. Element is mapped into <th>
 * element in the table. onClick runs when the th element is clicked.
 */
export type TTableHeadElements = {
	element: (JSX.Element | string),
	tooltip?: string,
	onClick?: () => void
}[];