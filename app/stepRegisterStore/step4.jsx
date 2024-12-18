import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Icons from "@/components/common/Icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";

const step4 = () => {
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const [registerStoreData, setRegisterStoreData] = useState(null);
  const [formData, setFormData] = useState({
    avatar: null,
    cover: null,
  });
  const [errors, setErrors] = useState({
    avatar: "",
    cover: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem("registerStoreData");
      const convertData = JSON.parse(data);
      setRegisterStoreData(convertData);
      setFormData({
        avatar: convertData?.avatar || null,
        cover: convertData?.cover || null,
      });
    };
    fetchData();
  }, []);

  const pickImage = async (type) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        // Đọc file ảnh và chuyển thành base64
        const imageUri = result.assets[0].uri;
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Thêm prefix cho base64 string
        const base64Image = `data:image/jpeg;base64,${base64}`;

        setFormData((prev) => ({
          ...prev,
          [type]: base64Image,
        }));
        setErrors((prev) => ({ ...prev, [type]: "" }));
      }
    } catch (error) {
      console.error("Lỗi khi chọn ảnh:", error);
      setErrors((prev) => ({
        ...prev,
        [type]: "Có lỗi xảy ra khi chọn ảnh",
      }));
    }
  };

  const validateForm = async () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.avatar) {
      newErrors.avatar = "Vui lòng chọn ảnh đại diện";
      isValid = false;
    }

    if (!formData.cover) {
      newErrors.cover = "Vui lòng chọn ảnh bìa";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        const updatedData = {
          ...registerStoreData,
          ...formData,
        };
        await AsyncStorage.setItem(
          "registerStoreData",
          JSON.stringify(updatedData)
        );
        router.push("/stepRegisterStore/success");
      } catch (error) {
        console.error("Lỗi khi lưu dữ liệu:", error);
      }
    }

    return isValid;
  };

  const isFormValid = () => {
    return formData.avatar && formData.cover;
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <View style={{ paddingTop: insets.top }} className="p-3 bg-white">
        <View className="flex flex-row items-center justify-between gap-2 pt-2">
          <Link href="/stepRegisterStore/step3">
            <View className="flex flex-row items-center">
              <Icons.Ionicons name="arrow-back" size={20} color="black" />
              <Text className="text-black text-[16px] font-medium ml-2">
                Bước 4 trên 4
              </Text>
            </View>
          </Link>
        </View>
      </View>
      <View className="flex h-full bg-white px-3 pt-4">
        <View className="flex flex-col gap-2">
          <Text className="text-[24px] font-[500] pb-2">
            Hoàn thiện thông tin
          </Text>
          <Text className="text-[14px] text-[#757575]">
            Bạn cần cung cấp ảnh đại diện của cửa hàng bạn
          </Text>
        </View>
        <View className="flex flex-col gap-2 mt-4">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-[14px] text-[#000] font-[500]">
              Tải lên ảnh đại diện
            </Text>
          </View>
          <TouchableOpacity
            className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center"
            onPress={() => pickImage("avatar")}
          >
            {formData.avatar ? (
              <Image
                source={{ uri: formData.avatar }}
                style={{ width: 100, height: 100 }}
              />
            ) : (
              <Text className="text-[14px] text-[#757575]">
                Nhấn để chọn ảnh
              </Text>
            )}
          </TouchableOpacity>
          {errors.avatar ? (
            <Text className="text-red-500 text-[12px] ml-4">
              {errors.avatar}
            </Text>
          ) : null}
        </View>
        <View className="flex flex-col gap-2 mt-4">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-[14px] text-[#000] font-[500]">
              Tải lên ảnh bìa cho cửa hàng
            </Text>
          </View>
          <TouchableOpacity
            className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center"
            onPress={() => pickImage("cover")}
          >
            {formData.cover ? (
              <Image
                source={{ uri: formData.cover }}
                style={{ width: 200, height: 100 }}
              />
            ) : (
              <Text className="text-[14px] text-[#757575]">
                Nhấn để chọn ảnh
              </Text>
            )}
          </TouchableOpacity>
          {errors.cover ? (
            <Text className="text-red-500 text-[12px] ml-4">
              {errors.cover}
            </Text>
          ) : null}
        </View>
        {isFormValid() ? (
          <View className="flex flex-row items-center justify-center w-full mt-4 rounded-[60px] bg-yellow-500">
            <TouchableOpacity
              className="rounded-[60px] px-2 py-4 w-full"
              onPress={validateForm}
            >
              <Text className="text-[14px] text-[#fff] font-[500] text-center w-full">
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex flex-row items-center justify-center w-full mt-4 rounded-[60px] bg-gray-300">
            <TouchableOpacity
              className="rounded-[60px] px-2 py-4 w-full"
              onPress={validateForm}
            >
              <Text className="text-[14px] text-[#fff] font-[500] text-center w-full">
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

export default step4;
