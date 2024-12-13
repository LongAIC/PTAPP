import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import Icons from "@/components/common/Icons";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const step3 = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isOpenSheetLocation, setIsOpenSheetLocation] = useState(false);
  const [showProvinces, setShowProvinces] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const bottomSheetRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const snapPoints = useMemo(() => ["30%"], []);

  const [formData, setFormData] = useState({
    city: "",
    address: "",
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  const openSheet = () => {
    setIsBottomSheetVisible(true);
    bottomSheetRef.current?.expand();
  };

  const handleSheetChanges = useCallback((index) => {
    setIsBottomSheetVisible(index !== -1);
  }, []);

  const [registerStoreData, setRegisterStoreData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem("registerStoreData");
      const convertData = JSON.parse(data);
      setRegisterStoreData(convertData);
      setFormData({
        city: convertData?.city || "",
        address: convertData?.address || "",
      });
    };
    fetchData();
  }, []);

  const [errors, setErrors] = useState({
    city: "",
    address: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = async () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.city.trim()) {
      newErrors.city = "Vui lòng nhập tỉnh/thành phố";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ chi tiết";
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
        router.push("/stepRegisterStore/step4");
      } catch (error) {
        console.error("Lỗi khi lưu dữ liệu:", error);
      }
    }

    return isValid;
  };

  const isFormValid = () => {
    return formData.city.trim() && formData.address.trim();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <GestureHandlerRootView>
        <View style={{ paddingTop: insets.top }} className="p-3 bg-white">
          <View className="flex flex-row items-center justify-between gap-2 pt-2">
            <Link href="/stepRegisterStore/step2">
              <View className="flex flex-row items-center">
                <Icons.Ionicons name="arrow-back" size={20} color="black" />
                <Text className="text-black text-[16px] font-medium ml-2">
                  Bước 3 trên 4
                </Text>
              </View>
            </Link>
          </View>
        </View>
        <View className="flex h-full bg-white px-3 pt-4">
          <View className="flex flex-col gap-2">
            <Text className="text-[24px] font-[500] pb-2">
              Điền địa chỉ của gian hàng
            </Text>
            <Text className="text-[14px] text-[#757575]">
              Bạn cần điền địa chỉ của cửa hàng bạn
            </Text>
          </View>
          <View>
            <View className="flex flex-col gap-2 mt-4">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-[14px] text-[#000] font-[500]">
                  Tỉnh/thành phố
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setIsOpenSheetLocation(true);
                  openSheet();
                }}
              >
                <View
                  className={`border rounded-[60px] px-5 py-4 ${isFocused ? "border-yellow-500" : "border-gray-300"}`}
                >
                  <Text
                    className={formData.city ? "text-black" : "text-gray-400"}
                  >
                    {formData.city || "Chọn tỉnh/thành phố"}
                  </Text>
                </View>
              </TouchableOpacity>

              {errors.city ? (
                <Text className="text-red-500 text-[12px] ml-4">
                  {errors.city}
                </Text>
              ) : null}
            </View>
            <View className="flex flex-col gap-2 mt-3">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-[14px] text-[#000] font-[500]">
                  Địa chỉ chi tiết
                </Text>
              </View>
              <TextInput
                className={`border rounded-[60px] px-5 py-4 ${isFocused ? "border-yellow-500" : "border-gray-300"}`}
                placeholder="Nhập địa chỉ chi tiết"
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  setIsBottomSheetVisible(false); // Tắt bottom sheet khi focus ra ngoài
                }}
                value={formData.address}
                onChangeText={(text) => handleChange("address", text)}
              />
              {errors.address ? (
                <Text className="text-red-500 text-[12px] ml-4">
                  {errors.address}
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
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backgroundStyle={{
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
          enableContentPanningGesture={false}
          onClose={() => setIsBottomSheetVisible(false)}
        >
          <BottomSheetView>
            {isOpenSheetLocation && (
              <View className="mb-4 px-3">
                <Text className="text-base text-neutral-600 font-bold mb-2">
                  Chọn tỉnh/thành phố
                </Text>
                <ScrollView style={{ maxHeight: 300 }}>
                  {provinces.map((province) => (
                    <TouchableOpacity
                      key={province.code}
                      className="p-3 border-b border-gray-200"
                      onPress={() => {
                        handleChange("city", province.name);
                        setIsBottomSheetVisible(false);
                        bottomSheetRef.current?.close();
                      }}
                    >
                      <Text>{province.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

export default step3;
