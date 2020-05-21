const capitalize = (string: string) =>
  string ? `${string[0].toUpperCase()}${string.substr(1)}` : "";
export default capitalize;
