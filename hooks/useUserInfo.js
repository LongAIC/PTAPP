import { router } from "expo-router";

import { useAppDispatch, useAppSelector } from "./useRedux";
import useVerify from "./useVerify";

import { useGetUserInfoQuery } from "@/services";
import { userLogout } from "@/store";

export default function useUserInfo() {
  const dispatch = useAppDispatch();
  const isVerify = useVerify();

  const userInfo = useAppSelector((state) => state.user.userInfo);

  // const isLoginVerify = !isVerify ? false : isLoading ? false : !!data?.data

  // const mustAuthAction = nextAction => {
  //   if (!isLoginVerify) {
  //     return router.push('/login')
  //   }
  //   nextAction()
  // }

  // if (isError) dispatch(userLogout())

  return {
    userInfo: userInfo,
    // isVerify,
    // isLoginVerify,
    // mustAuthAction,
  };
}
