import { useContext } from "react";
import { userContext } from "src/contexts/userContext";
import followUser from "src/lib/helpers/followUser";
import unfollowUser from "src/lib/helpers/unfollowUser";
import { useSuccessToast, useToastedCallback } from "src/lib/hooks";

const useComponentState = (uid) => {
  const { authState, firestoreHook } = useContext(userContext);
  const [user] = authState;
  const { data } = firestoreHook;
  const isFollowing = data ? data.following.includes(uid) : false;
  const successToast = useSuccessToast("Follow user");

  const callBack = async () => {
    if (!user) throw new Error("Not logged in");

    if (isFollowing) {
      await unfollowUser(user.uid, uid);
      successToast({
        description: "Successfully unfollowed",
      });
    } else {
      await followUser(user.uid, uid);
      successToast({
        description: "Successfully followed",
      });
    }
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Follow user",
    callBack,
    false
  );

  return { toastedCallback, loading, isFollowing };
};

export default useComponentState;
