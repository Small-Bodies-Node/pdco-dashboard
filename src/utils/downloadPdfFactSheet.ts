import { PDFDocument } from 'pdf-lib';
import { auToKm, auToLd } from './conversionFormulae';

interface IProps {
	fullname: string;
	cd: Date;
	min_distance: string;
	min_size: string;
	max_size: string;
	v_rel: string;
	h: string;
}
export const downloadPdfFactSheet = async ({
	fullname,
	cd,
	min_distance,
	min_size,
	max_size,
	v_rel,
	h
}: IProps) => {
	const res = await fetch('/CloseApproachFactSheetForm.pdf');
	const buffer = await res.arrayBuffer();

	const doc = await PDFDocument.load(buffer);
	const form = doc.getForm();

	// Fill in form fields
	form.getTextField('Name').setText(`${fullname}`);
	form.getTextField('Date').setText(`Will pass by Earth on: ${cd.toUTCString()}`);
	min_distance &&
		form
			.getTextField('Distance')
			.setText(
				`At a minimum distance of: ${auToLd(
					parseFloat(min_distance)
				).toLocaleString('en-US', { maximumFractionDigits: 4 })} LD (${auToKm(
					parseFloat(min_distance)
				).toLocaleString('en-US', { maximumFractionDigits: 1 })} km)`
			);
	min_size &&
		max_size &&
		form
			.getTextField('Size')
			.setText(
				`${Math.round(parseFloat(min_size) * 1000)}m - ${Math.round(parseFloat(max_size) * 1000)}m`
			);
	v_rel &&
		form
			.getTextField('Velocity')
			.setText(
				`${parseFloat(v_rel).toLocaleString('en-US', { maximumFractionDigits: 1 })} km/s`
			);
	min_distance &&
		form.getTextField('MinDistance').setText(
			`${auToKm(parseFloat(min_distance)).toLocaleString('en-US', {
				maximumFractionDigits: 1
			})} km`
		);
	form.getTextField('Magnitude').setText(`${h}`);

	const pdfDataUri = await doc.saveAsBase64({ dataUri: true });
	const link = document.createElement('a');
	link.download = `${fullname.replaceAll(' ', '')}-FactSheet.pdf`;
	link.href = pdfDataUri;
	link.click();
};