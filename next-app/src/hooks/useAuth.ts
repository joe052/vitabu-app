import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import { useGetMeQuery, useLogoutMutation } from "@/store/api/authApi";
import { baseApi } from "@/store/api/baseApi";
import { useAppDispatch } from "@/store/hooks";

/** The signed-in user, plus a `logout` that also clears all cached API data. */
export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetMeQuery();
  const [logoutRequest, { isLoading: isLoggingOut }] = useLogoutMutation();

  const logout = async () => {
    await logoutRequest();
    router.replace(ROUTES.login);
    dispatch(baseApi.util.resetApiState());
  };

  return {
    user: isError ? undefined : data,
    isLoading,
    isError,
    logout,
    isLoggingOut,
  };
};
