export const getLanguage = (): string => {
  if (process.browser) {
    const language = localStorage.getItem("USER_LANG") || "en";

    return language;
  }

  return "en";
};
