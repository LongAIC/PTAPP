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
import {
  Button,
  HandleResponse,
  Logo,
  TextField,
  AuthWrapper,
} from "@/components";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const update = () => {
  const insets = useSafeAreaInsets();
  const [bgColor, setBgColor] = useState("bg-yellow-500"); // Khởi tạo trạng thái màu nền
  const router = useRouter();
  const goToStep = () => {
    const Getdata = async () => {
      const data = await AsyncStorage.getItem("registerStoreData");
      const parsedData = JSON.parse(data);
      if (!parsedData) {
        router.push("/stepRegisterStore/step1"); // Nếu không có dữ liệu, chạy đến màn 1
      } else if (
        parsedData.storeName &&
        parsedData.phone &&
        !parsedData.categories
      ) {
        router.push("/stepRegisterStore/step2");
      } else if (
        parsedData.storeName &&
        parsedData.phone &&
        parsedData.categories
      ) {
        router.push("/stepRegisterStore/step3");
      } else if (parsedData.address && parsedData.city) {
        router.push("/stepRegisterStore/step4");
      } else if (parsedData.avatar && parsedData.cover) {
        router.push("/stepRegisterStore/success");
      }
    };
    Getdata();
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <AuthWrapper>
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
            <TouchableOpacity
              className="flex flex-col items-center justify-center gap-2"
              onPress={() => {
                goToStep();
              }}
            >
              <Text
                className={`rounded-full ${bgColor} px-4 py-3 text-white font-bold text-[16px]`}
              >
                Tạo gian hàng
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </AuthWrapper>
    </>
  );
};

export default update;
