import { fetchAllDataReal } from './fetchAllDataReal';
import { fetchAllDataMock } from './fetchAllDataMock';
import { cadFieldIndices } from './constants';
import { magToSizeKm } from './conversionFormulae';

/**
 * Choose data source depending on environment
 */
export const fetchAllData = async () => {
  // --------------------------------->>>

  // Get raw data
  const allRawData =
    true || process.env.NODE_ENV === 'production'
      ? await fetchAllDataReal()
      : await fetchAllDataMock();

  console.log('allRawData ======>', allRawData);

  if (!allRawData) return null;

  // Mutate allRawData.cadData by appending computed size for each CA's data array
  console.log('Before', JSON.stringify(allRawData.cadData.data, null, 2));
  allRawData.cadData.data = allRawData.cadData.data.map((datumArr) => {
    const magIsStringOrNull = datumArr[cadFieldIndices.h];
    if (!magIsStringOrNull || typeof +magIsStringOrNull !== 'number') {
      return [...datumArr, null];
    }
    return [...datumArr, '' + magToSizeKm(+magIsStringOrNull)];
  });
  console.log('After', JSON.stringify(allRawData.cadData.data, null, 2));

  return allRawData;
};
