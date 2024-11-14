import { router, Stack } from "expo-router";
import { View, Text, ScrollView } from "react-native";

import {
  AuthWrapper,
  Button,
  CartInfo,
  CartItem,
  EmptyCart,
} from "@/components";
import { useAppSelector, useUserInfo } from "@/hooks";
import { formatNumber } from "@/utils";

export default function CartScreen() {
  //? Get User Data
  const { userInfo, mustAuthAction } = useUserInfo();

  //? Store
  const { cartItems, totalItems, totalPrice, totalDiscount } = useAppSelector(
    (state) => state.cart
  );

  //? Handlers
  const handleRoute = () => {
    mustAuthAction(() => {
      router.push({ pathname: `/payment`, params: {} });
    });
  };

  //? Render(s)

  return (
    <>
      <Stack.Screen
        options={{
          title: `Nhà cung cấp`,
          headerBackTitleVisible: false,
        }}
      />
      <AuthWrapper>
        <>
          <View className=" h-full space-y-3 bg-white text-center flex-row ">
            <Text className="text-center">Comming Soon</Text>
          </View>
        </>
      </AuthWrapper>
    </>
  );
}
