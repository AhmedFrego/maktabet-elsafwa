import React, { FC } from "react";
import { Link } from "react-router-dom";

export const LogoMain: FC<{ className: string, }> = ({ className,  }) => {
  return (
    <Link className={className} to={'/'}>
      <div className="main-logo">
        <span className="main-logo--1">الصفـ </span>
        <span className="main-logo--2">كوبي سنتر </span>
        <span className="main-logo--3"> ـوة</span>

      </div>
    </Link>
  );
};

