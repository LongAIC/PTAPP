import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import Icons from "@/components/common/Icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const step1 = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    phone: "",
  });
  const [registerStoreData, setRegisterStoreData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem("registerStoreData");
      const convertData = JSON.parse(data);
      setRegisterStoreData(convertData);
      setFormData({
        storeName: convertData.storeName,
        phone: convertData.phone,
      });
    };
    fetchData();
  }, []);
  const [errors, setErrors] = useState({
    storeName: "",
    phone: "",
  });

  const validatePhone = (phone) => {
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Xóa lỗi khi người dùng bắt đầu nhập
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = async () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.storeName.trim()) {
      newErrors.storeName = "Vui lòng nhập tên gian hàng";
      isValid = false;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        await AsyncStorage.setItem(
          "registerStoreData",
          JSON.stringify(formData)
        );

        router.push("/stepRegisterStore/step2");
      } catch (error) {
        console.error("Lỗi khi lưu dữ liệu:", error);
      }
    }

    return isValid;
  };

  const isFormValid = () => {
    return formData.storeName.trim() && validatePhone(formData.phone);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <View style={{ paddingTop: insets.top }} className="p-3 bg-white">
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
      <View className="flex h-full bg-white px-3 pt-4">
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
            value={registerStoreData?.storeName}
            onChangeText={(text) => handleChange("storeName", text)}
          />
          {errors.storeName ? (
            <Text className="text-red-500 text-[12px] ml-4">
              {errors.storeName}
            </Text>
          ) : null}
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
            value={registerStoreData?.phone}
            onChangeText={(text) => handleChange("phone", text)}
            keyboardType="phone-pad"
          />
          {errors.phone ? (
            <Text className="text-red-500 text-[12px] ml-4">
              {errors.phone}
            </Text>
          ) : null}
        </View>

        {isFormValid() ? (
          <View className="flex flex-row items-center justify-center w-full mt-4 rounded-[60px] bg-yellow-500">
            <TouchableOpacity
              className=" rounded-[60px] px-2 py-4 "
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
              className="rounded-[60px] px-2 py-4 w-full "
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

export default step1;
