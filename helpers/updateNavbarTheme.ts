import { POLICIES_PATH } from "./paths";

const updateNavbarTheme = (
  isMobile: boolean,
  isLight: boolean,
  page: string,
  setLightNavbar: (bool: boolean) => any,
) => {
  if (!isMobile && window.scrollY > 500) setLightNavbar(true);
  else if (page === POLICIES_PATH && !isMobile && window.scrollY > 350)
    setLightNavbar(true);
  else if (page === POLICIES_PATH && isMobile && window.scrollY > 250)
    setLightNavbar(true);
  else if (isMobile && window.scrollY > 320) setLightNavbar(true);
  else setLightNavbar(isLight);
};

export default updateNavbarTheme;
