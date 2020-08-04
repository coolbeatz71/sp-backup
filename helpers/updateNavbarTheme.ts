import { POLICIES_PATH, HOME_PATH, PRICING_PATH } from "./paths";

const updateNavbarTheme = (
  isMobile: boolean,
  isLight: boolean,
  page: string,
  setLightNavbar: (bool: boolean) => any,
) => {
  console.log("window.scrollY :>> ", window.scrollY);
  if (page === PRICING_PATH && !isMobile && window.scrollY > 500)
    setLightNavbar(true);
  else if (page === POLICIES_PATH && !isMobile && window.scrollY > 350)
    setLightNavbar(true);
  else if (page === HOME_PATH && !isMobile && window.scrollY > 700)
    setLightNavbar(true);
  else setLightNavbar(isLight);
};

export default updateNavbarTheme;
