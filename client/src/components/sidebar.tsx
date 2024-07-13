import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../constants/sidebar-links";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-6 p-4 border-4 border-stone-100 rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden">
        {sidebarLinks.map((section) => (
          <div key={section.category}>
            <h3 className="font-bold p-3 text-2xl text-stone-500">
              {section.category}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {section.levels.map((level) => (
                <NavLink
                  to={`/${section.category.toLowerCase()}/${level.url}`}
                  key={level.url}
                  className="block p-2 my-1  hover:underline  text-stone-500 transition-all ease-in-out "
                >
                  {level.title}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
