import { FC } from "react";
import { Link } from "react-router-dom";
import { NotesStage } from "../models/NotesStageClass";

import { getArabicNumbers } from "../functions/getArabicNumbers";

const Article: FC<{ data: NotesStage }> = ({ data }) => {
  return (
    <div className={`stage stage--${data.color}`}>
      <div className="stage__img-box">
        <img src={data.imgSrc} alt={data.title} className="stage__img" />
      </div>
      <div className="stage__subs">
        {data.subStages.map((subStage) => (
          <Link key={subStage} to={`/notes/stage/${data.path}/${subStage}`} className={`stage__sub`}>
            {getArabicNumbers(subStage)}
          </Link>
        ))}
      </div>
      <h3 className="heading--tertiary u-margin-center">{data.title}</h3>
      <link rel="stylesheet" href="" />
      <Link to={`/notes/stage/${data.path}`} className={`btn-colored btn-colored--${data.color} u-margin-center`}>
        دخول
      </Link>
    </div>
  );
};

export default Article;
