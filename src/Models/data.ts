// Interface for data received from API:
// https://ssd-api.jpl.nasa.gov/cad.api?...
export interface ICadData {
  signature: {
    source: string;
    version: string;
  };
  count: string;
  fields: string[];
  data: string[][];
}

// Interface for data received from API:
// https://ssd-api.jpl.nasa.gov/cad.api?...
export interface ISentryData {
  signature: {
    source: string;
    version: string;
  };
  count: string;
  data: {
    ip: string;
    range: string;
    ps_cum: string;
    diameter: string;
    ps_max: string;
    h: string;
    last_obs: string;
    v_inf: string;
    fullname: string;
    n_imp: string;
    last_obs_jd: string;
    ts_max: string;
    id: string;
    des: string;
  }[];
}
// {
//     count: string;
//     signature: any;
//     data: {
//       des: string;
//       diameter: string;
//       fullname: string;
//       h: string;
//       id: string;
//       ip: string;
//       last_obs: string;
//       last_obs_jd: string;
//       n_imp: string;
//       ps_cum: string;
//       ps_max: string;
//       range: string;
//       ts_max: string;
//       v_inf: string;
//     }[];
//   }
