import { fetchAllDataReal } from "./fetchAllDataReal";
import { fetchAllDataMock } from "./fetchAllDataMock";
import { cadFieldIndices } from "./constants";
import { magToSizeKm } from "./conversionFormulae";

/**
 * Choose data source depending on environment
 */
export const fetchAllData = async (isMock = false, noCache = false) => {
  // --------------------------------->>>

  const allRawData = isMock //
    ? await fetchAllDataMock()
    : await fetchAllDataReal(noCache);
  if (!allRawData) return null;

  // Mutate allRawData.cadData by appending computed size for each CA's data array
  allRawData.cadData.data = allRawData.cadData.data.map((datumArr) => {
    const magIsStringOrNull = datumArr[cadFieldIndices.h];
    if (!magIsStringOrNull || typeof +magIsStringOrNull !== "number") {
      return [...datumArr, null];
    }
    return [...datumArr, "" + magToSizeKm(+magIsStringOrNull)];
  });

  return allRawData;
};
