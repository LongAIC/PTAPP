import SigninPromoRenderer from "../renderer/SigninPromoRenderer";

import { useUserInfo } from "@/hooks";

export default function AuthWrapper({ children }) {
  const { userInfo } = useUserInfo();

  return <>{!userInfo ? <SigninPromoRenderer /> : <>{children}</>}</>;
}
