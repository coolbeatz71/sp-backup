const capitalize = (word?: string) =>
  word ? `${word[0].toUpperCase()}${word.substr(1)}` : "";
export default capitalize;
