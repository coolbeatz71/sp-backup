export default (options: string[]) => {
  if (process.browser) {
    const paths = window.location.pathname.split("/").filter(Boolean);
    return options.every((path) => paths.includes(path));
  }
  return false;
};
