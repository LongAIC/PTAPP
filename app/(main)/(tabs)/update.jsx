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

const update = () => {
  const insets = useSafeAreaInsets();
  const [bgColor, setBgColor] = useState("bg-yellow-500"); // Khởi tạo trạng thái màu nền

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
          <Text className="text-[18px] font-bold">Tạo gian hàng của bạn</Text>
          <Text className="text-[14px] text-gray-500 w-[300px] text-center">
            Chỉ với 4 bước bạn có thể sở hữu gian hàng của mình
          </Text>
        </View>
        <View className="flex flex-col items-center justify-center gap-2 mt-4">
          <Link href="/stepRegisterStore/step1">
            <View className="flex flex-col items-center justify-center gap-2">
              <Text
                className={`rounded-full ${bgColor} px-4 py-3 text-white font-bold text-[16px]`}
              >
                Tạo gian hàng
              </Text>
            </View>
          </Link>
        </View>
      </View>
    </>
  );
};

export default update;
