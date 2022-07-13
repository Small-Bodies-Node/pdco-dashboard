/**
 * Interface for "Sentry" data received from API:
 * API Docs: https://ssd-api.jpl.nasa.gov/doc/sentry.html
 * API Base: https://ssd-api.jpl.nasa.gov/cad.sentry?...
 */
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
    ts_max: string | null;
    id: string;
    des: string;
  }[];
}
