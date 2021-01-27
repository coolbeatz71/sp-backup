import qs from "query-string";

const removeUrlLang = (url: string): string => {
  const parsed = qs.parseUrl(url);
  delete parsed.query.lang;
  return qs.stringifyUrl(parsed);
};

export default removeUrlLang;
