import React, { useEffect } from "react";
import { useInput } from "../hooks/use-input";
import Input from "../components/Input";
import TitledSection from "../components/layout/TitledSection";

const PrintersSetting = () => {
  const oldValue = localStorage.getItem("sideNote") || "";
  const {
    arabicValue,
    blurHandler,
    changeHandler,
    containerClass,
    focusHandler,
    value,
  } = useInput({ validate: (x) => true, className: "input ", startValue: oldValue });

  useEffect(() => {
    localStorage.setItem("sideNote", value);
  }, [value]);
  return (
    <TitledSection id="side-notes" passedClass="side-note" divClass="spiked" title="ملاحظات">
      <Input
        containerClass={containerClass + "full-text max-width"}
        value={arabicValue || value}
        inputClass="input__input"
        tag="textarea"
        changeHandler={changeHandler}
        blurHandler={blurHandler}
        focusHandler={focusHandler}
      />
    </TitledSection>
  );
};

export default PrintersSetting;
