import { NavLink } from "react-router-dom";
import { CurrentUserI } from "../../../types/types";

const ProfileActivity = ({ currentUser }: { currentUser: CurrentUserI }) => {
  // console.log(currentUser);

  return (
    <>
      <aside className="md:col-span-3 md:pt-0 p-2">
        <div className="mt-12 flex flex-col">
          <h3 className="text-lg font-bold text-stone-500 mb-4">
            Your comments
          </h3>
          <div className="max-h-[500px] overflow-y-auto">
            {currentUser && currentUser.comments.length !== 0 ? (
              currentUser.comments.map((comment) => (
                <NavLink
                  key={comment.id}
                  to={`/reading/${comment.article.difficulty}/${comment.article.id}`}
                  className="line-clamp-2 p-4 bg-gray-100 my-2 hover:bg-gray-400 text-stone-500 hover:text-white"
                >
                  {comment.body}
                </NavLink>
              ))
            ) : (
              <p className="text-xl font-semibold text-gray-500">Empty list</p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ProfileActivity;
