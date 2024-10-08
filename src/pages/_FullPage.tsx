import React from "react";
import { useEffect } from "react";

import WelcomePage from "./Welcome";

import DescripedImg from "../components/DescripedImg";

import Satge from "../components/Satge";

import { spike } from "../functions/spiked";

import TitledSection from "../components/layout/TitledSection";
import { stages } from "../store/DUMMY-DATA/stages";

const FullPage = () => {

  useEffect(() => {
    spike();
  }, []);

  return (
    <>
      <WelcomePage />
      <TitledSection
        id="notes"
        passedClass="articles"
        extraClass="clickable"
        title="مذكرات"
        to="/notes"
        children={<DescripedImg Component={Satge} data={[stages, 0, 6]} />}
      />
    </>
  );
};

export default FullPage;
