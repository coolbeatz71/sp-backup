import React, { FC } from "react";
import { Button } from "antd";

export interface MissionProps {
  isLoggedin: boolean;
  goToRegister: () => void;
}

const Mission: FC<MissionProps> = ({ isLoggedin, goToRegister }) => {
  return (
    <div className="mission">
      <div className="mission__item mission--with-image">
        <img src="icons/kid-overlay.png" alt="" />
      </div>
      <div className="mission__item">
        <div className="mission__item--title">
          <img src="icons/family.png" alt="" />
          <h2>SAVE Plus</h2>
          <span>Mission</span>
        </div>
        <div className="mission__item--description">
          <p>
            We are a platform dedicated to connecting socially impactful causes,
            conscious people.
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
