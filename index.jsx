import React from "react";
import "./style.css";

export const Main = () => {
  return (
    <div className="main">
      <div className="div">
        <div className="overlap-group">
          <div className="logo" />

          <div className="text-wrapper">SmileLulz</div>
        </div>

        <p className="description">
          An Indie Game Developer. Making Simple Games.
        </p>

        <div className="game-container-main">
          <div className="smashbit">
            <div className="banner" />

            <div className="buttons">
              <a
                className="google-play-store"
                href="https://play.google.com/store/apps/details?id=com.smilelulz.smashbit"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="text-wrapper-2">Google Play Store</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
