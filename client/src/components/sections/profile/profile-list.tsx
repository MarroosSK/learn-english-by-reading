import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { handleDelete } from "../../../api/api-calls";
import { CurrentUserI } from "../../../types/types";

const ProfileList = ({
  currentUser,
  refetch,
}: {
  currentUser: CurrentUserI;
  refetch: () => void;
}) => {
  const onDelete = async (wordId: string) => {
    try {
      await handleDelete(wordId);
      refetch();
    } catch (error) {
      console.error("Error deleting word:", error);
    }
  };
  return (
    <div className="grid grid-span-12 gap-4">
      <div className="mt-12 flex flex-col">
        <h3 className="text-lg font-bold text-stone-500 mb-4">
          Words to learn
        </h3>
        <div className="w-full">
          {currentUser.vocabulary && currentUser.vocabulary.length !== 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {currentUser.vocabulary.map((word) => (
                <div className="relative p-4 bg-gray-100 text-stone-500 font-bold">
                  <NavLink to={word.link} key={word.id} target="_blank">
                    {word.word}
                  </NavLink>
                  <X
                    className="cursor-pointer text-stone-500 absolute right-1 top-1 hover:text-red-500 transition-all ease-in-out"
                    onClick={() => onDelete(word.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xl font-semibold text-gray-500">Empty list</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileList;
