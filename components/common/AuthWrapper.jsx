import SigninPromoRenderer from '../renderer/SigninPromoRenderer'

import { useUserInfo } from '@/hooks'

export default function AuthWrapper({ children }) {
  const { userInfo } = useUserInfo()
  console.log(userInfo)

  return (
    <>{ !userInfo ? <SigninPromoRenderer /> : <>{children}</>}</>
  )
}
