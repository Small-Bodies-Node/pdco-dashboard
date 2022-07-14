/**
 * Type used in props for Table element. Elements mapped into <td>
 * elements in the table. onClick runs when the row of all elements 
 * is clicked.
 */
export type TTableBodyElements = {
	elements: (JSX.Element | string)[],
	onClick?: () => void,
	color?: string
}[]