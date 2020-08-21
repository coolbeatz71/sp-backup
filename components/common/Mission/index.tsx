import React, { FC } from "react";
import { Button } from "antd";
import { useMedia } from "react-use";

export interface MissionProps {
  isLoggedin: boolean;
  goToRegister: () => void;
}

const Mission: FC<MissionProps> = ({ isLoggedin, goToRegister }) => {
  const isMobile = useMedia("(max-width: 768px)");
  return (
    <div className="mission">
      <div className="mission__item mission--with-image">
        <img src="/icons/kid-overlay.png" alt="" />
      </div>
      <div className="mission__item">
        <div className="mission__item--title">
          <img src="/icons/family.png" alt="" />
          <h2>SAVE Plus</h2>
          <span>Mission</span>
        </div>
        <div className="mission__item--description">
          <p>
            We are a platform that connects socially
            {!isMobile && <br />} impactful causes with caring people
            {!isMobile && <br />} to create impacts that make a difference.
          </p>
        </div>
        {!isLoggedin && (
          <div className="mission__item--button">
            <Button className="btn-primary-outline" onClick={goToRegister}>
              JOIN US
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mission;
