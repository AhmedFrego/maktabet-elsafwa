import React from "react";
import { angleDoubleDown } from "assets/SVGs";

export const WelcomePage = () => {
  return (
    <>
      <section className="section-home">
        <div className="flex flex--img home-container">
          <div className="home-img">
            <img src={require("assets/imgs/445-4451774_vector-png-hd.png")} alt="landing" className="floating-img" />
          </div>
          <div className="home-text">
            <h1 className="heading--primary">مرحبا بالصفوة</h1>
            <p className="paragraph paragraph--large-2 paragraph--capitalize">تصوير وطباعة مستندات بالالوان وابيض/اسود</p>
            <p className="paragraph paragraph--large-2 paragraph--capitalize">مذكرات مدرسين بأعلى جودة</p>{" "}
            <p className="paragraph paragraph--large-2 paragraph--capitalize">كتابة وطباعة أبحاث علمية </p>
          </div>
        </div>
        <div className="rotated-background"></div>
      </section>
      <div className="spikes spikes--secondary-0 spikes--rotated" style={{ position: "relative", zIndex: -1 }}>
        &nbsp;
      </div>
      <a href="#notes" className="down-arrow down-arrow--home">
        {angleDoubleDown}
      </a>
    </>
  );
};

