import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Icons from "@/components/common/Icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
const step1 = () => {
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <View style={{ paddingTop: insets.top }} className="p-3 bg-white  ">
        <View className="flex flex-row items-center justify-between gap-2 pt-2">
          <Link href="/">
            <View className="flex flex-row items-center">
              <Icons.Ionicons name="arrow-back" size={20} color="black" />
              <Text className="text-black text-[16px] font-medium ml-2">
                Bước 1 trên 4
              </Text>
            </View>
          </Link>
        </View>
      </View>
      <View className="flex  h-full bg-white px-3 pt-4">
        <View className="flex flex-col gap-2">
          <Text className="text-[24px] font-[500] pb-2">
            Đặt tên gian hàng của bạn
          </Text>
          <Text className="text-[14px] text-[#757575]">
            Tên gian hàng của bạn sẽ được hiển thị trên PTCOCO và trên các trang
            sản phẩm của bạn.
          </Text>
        </View>
        <View className="flex flex-col gap-2 mt-4">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-[14px] text-[#000] font-[500]">
              Tên gian hàng
            </Text>
          </View>
          <TextInput
            className={`border rounded-[60px] px-5 py-4 ${isFocused ? "border-yellow-500" : "border-gray-300"}`}
            placeholder="Nhập tên gian hàng của bạn"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        <View className="flex flex-col gap-2 mt-3">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-[14px] text-[#000] font-[500]">
              Số điện thoại
            </Text>
          </View>
          <TextInput
            className={`border rounded-[60px] px-5 py-4 ${isFocused ? "border-yellow-500" : "border-gray-300"}`}
            placeholder="Nhập số điện thoại cho gian hàng"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        <View className="flex flex-col gap-2 mt-3">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-[14px] text-[#000] font-[500]">Email</Text>
          </View>
          <TextInput
            className={`border rounded-[60px] px-5 py-4 ${isFocused ? "border-yellow-500" : "border-gray-300"}`}
            placeholder="Nhập số điện thoại cho gian hàng"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        <View className="flex flex-row items-center justify-center w-full mt-4 bg-yellow-500 rounded-[60px]">
          <Link href="/stepRegisterStore/step2">
            <TouchableOpacity className="bg-yellow-500 rounded-[60px] px-2 py-4 w-full">
              <Text className="text-[14px] text-[#fff] font-[500] text-center w-full">
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
};

export default step1;
