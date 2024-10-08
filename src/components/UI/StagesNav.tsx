import { NavLink } from "react-router-dom";

const StagesNav = () => {
  const linksdata = [
    { title: "KG1", path: "/notes/stage/kg/1" },
    { title: "KG2 ", path: "/notes/stage/kg/2" },
    { title: "أولى إبتدائي", path: "/notes/stage/primary/1" },
    { title: "تانية إبتدائي", path: "/notes/stage/primary/2" },
    { title: "تالتة إبتدائي", path: "/notes/stage/primary/3" },
    { title: "رابعة إبتدائي", path: "/notes/stage/primary/4" },
    { title: "خامسة إبتدائي", path: "/notes/stage/primary/5" },
    { title: "سادسة إبتدائي", path: "/notes/stage/primary/6" },
    { title: "أولى إعدادي", path: "/notes/stage/junior/1" },
    { title: "تانية إعدادي", path: "/notes/stage/junior/2" },
    { title: "تالتة إعدادي", path: "/notes/stage/junior/3" },
    { title: "أولى ثانوي", path: "/notes/stage/secondary/1" },
    { title: "تانية ثانوي", path: "/notes/stage/secondary/2" },
    { title: "تالتة ثانوي", path: "/notes/stage/secondary/3" },
    { title: "جامعة", path: "/notes/stage/collage" },
  ];

  const classHandler = (x: boolean) => (x ? "stages-nav__link stages-nav__link--active" : "stages-nav__link");
  return (
    <nav className="stages-nav max-width">
      <ul className="stages-nav__links">
        {linksdata.map((link) => (
          <li key={link.title}>
            <NavLink to={link.path} className={({ isActive }) => classHandler(isActive)}>
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default StagesNav;
