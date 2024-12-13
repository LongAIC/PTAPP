import React, { useState, useRef } from "react";
import { Stack } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Icons from "@/components/common/Icons";
const { width } = Dimensions.get("window");
import { Button, HandleResponse, Logo, TextField } from "@/components";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const success = () => {
  const insets = useSafeAreaInsets();
  const [bgColor, setBgColor] = useState("bg-yellow-500"); // Khởi tạo trạng thái màu nền
  const router = useRouter();
  const goToStep = () => {
    router.push("/");
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <View
        className={`flex flex-col items-center justify-center h-full bg-white`}
      >
        <View className="flex flex-col items-center justify-center gap-2">
          <Image
            source={{
              uri: "https://assets.grab.com/wp-content/uploads/sites/8/2020/12/01040528/GrabAcademy-for-MEX_Section-2-icon-Ready-1.png",
            }}
            className="w-[170px] h-[170px]"
          />
          <Text className="text-[18px] font-bold">
            Gian hàng tạo thành công
          </Text>
          <Text className="text-[14px] text-gray-500 w-[300px] text-center">
            Tiến hành đăng sản phẩm ngay bây giờ!
          </Text>
        </View>
        <View className="flex flex-col items-center justify-center gap-2 mt-4">
          <TouchableOpacity
            className="flex flex-col items-center justify-center gap-2"
            onPress={() => {
              goToStep();
            }}
          >
            <Text
              className={`rounded-full ${bgColor} px-4 py-3 text-white font-bold text-[16px]`}
            >
              Đăng bán
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default success;
