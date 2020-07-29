import { useEffect, useState } from "react";
import { HOME_PATH } from "helpers/paths";
import updateNavbarTheme from "helpers/updateNavbarTheme";

const useNavbarScroll = (isLight: boolean, isMobile: boolean, page: string) => {
  const [isLightNavbar, setLightNavbar] = useState(isLight);
  const [isCreateCauseButton, setCreateCauseButton] = useState(false);

  const changeNavbarTheme = () => {
    updateNavbarTheme(isMobile, isLight, page, setLightNavbar);
  };

  const hideCreateCauseButton = () => {
    setCreateCauseButton(page === HOME_PATH && window.scrollY > 400);
  };

  useEffect(() => {
    if (!isLight) {
      setLightNavbar(false);
      window.addEventListener("scroll", changeNavbarTheme);
    } else {
      setLightNavbar(true);
    }

    if (!isMobile && page === HOME_PATH) {
      setCreateCauseButton(false);
      window.addEventListener("scroll", hideCreateCauseButton);
    } else {
      setCreateCauseButton(true);
      window.removeEventListener("scroll", hideCreateCauseButton);
    }

    return () => {
      window.removeEventListener("scroll", hideCreateCauseButton);
      window.removeEventListener("scroll", changeNavbarTheme);
    };

    // tslint:disable-next-line: align
  }, [isLight, page]);

  return { isLightNavbar, isCreateCauseButton };
};

export default useNavbarScroll;
