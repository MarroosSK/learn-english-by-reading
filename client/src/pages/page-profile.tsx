import { SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { editUser, getOrCreateUser } from "../api/api-calls";
import ProfileActivity from "../components/sections/profile/profile-activity";
import ProfileHero from "../components/sections/profile/profile-hero";
import ProfileList from "../components/sections/profile/profile-list";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Loader2 } from "lucide-react";

const PageProfile = () => {
  const { isSignedIn, user } = useUser();
  const ref = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: currentUser,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["currentUser", user?.id],
    queryFn: () => {
      if (user?.id) {
        return getOrCreateUser(user);
      }
    },
    enabled: !!user?.id, // Ensure the query only runs if user.id is available
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsEditing(true);

    if (ref.current) {
      const formData = new FormData(ref.current);
      const data = {
        userId: user?.id,
        username: formData.get("username"),
      };

      try {
        await editUser(data);
        await refetch();
        toast("Username has been updated.");

        ref.current.reset();
        queryClient.invalidateQueries({ queryKey: ["currentUser", user?.id] });
      } catch (error) {
        console.error("Error updating username:", error);
      } finally {
        setIsEditing(false);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <ProfileHero />
      <div className="min-h-screen max-w-7xl mx-auto px-4 m-4">
        {isSignedIn ? (
          <div className="grid md:grid-cols-12 gap-5 p-4 m-2">
            <div className="md:col-span-9 p-4">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <h2 className="text-stone-500 text-2xl font-semibold">
                    Welcome, {currentUser.username}
                  </h2>
                  <p className="text-sky-800 font-bold">{currentUser.role}</p>

                  <form
                    ref={ref}
                    onSubmit={handleSubmit}
                    className="py-10 flex flex-col sm:flex-row items-center gap-2 "
                  >
                    <Input
                      type="text"
                      name="username"
                      defaultValue={currentUser.username ?? ""}
                      disabled={isEditing}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-sky-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-sky-800 transition-all ease-in-out"
                      disabled={isEditing}
                    >
                      {isEditing ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Edit Name"
                      )}
                    </Button>
                  </form>

                  <ProfileList currentUser={currentUser} refetch={refetch} />
                </>
              )}
            </div>
            {currentUser && <ProfileActivity currentUser={currentUser} />}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-y-4">
            <h2 className="text-3xl font-semibold text-gray-500">
              Profile is available only for registered users.
            </h2>
            <SignedOut>
              <button className="bg-sky-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-sky-800 transition-all ease-in-out">
                <SignInButton mode="modal" />
              </button>
            </SignedOut>
          </div>
        )}
      </div>
    </section>
  );
};

export default PageProfile;
