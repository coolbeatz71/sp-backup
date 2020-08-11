import { useEffect, useState } from "react";

const useHideRatingPopover = (ref: any) => {
  const [openRatingPopover, setOpenRatingPopover] = useState(false);

  useEffect(() => {
    const hideRatingPopover = (e: any) => {
      ref.current && ref.current.contains(e.target)
        ? setOpenRatingPopover(true)
        : setOpenRatingPopover(false);
    };
    document.addEventListener("mousedown", hideRatingPopover, false);
    document.addEventListener("mouseover", hideRatingPopover, false);
    return () => {
      document.removeEventListener("mousedown", hideRatingPopover, false);
      document.removeEventListener("mouseover", hideRatingPopover, false);
    };
    // tslint:disable-next-line: align
  }, [ref]);

  return { openRatingPopover, setOpenRatingPopover };
};

export default useHideRatingPopover;
