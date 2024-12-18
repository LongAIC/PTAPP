import { useState } from "react";
import { Text, Pressable, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  CategorySelector,
  Icons,
  Search,
  StoreCard,
  ListProducts,
} from "@/components";
import { useGetSingleUnitDetailQuery } from "@/serviceFTECH";

export default function SingleStallScreen() {
  const { id } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("Sản phẩm");

  // Lấy dữ liệu đơn vị từ API
  const {
    data: unitData,
    isLoading,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetSingleUnitDetailQuery(
    { id },
    {
      selectFromResult: ({ data, ...args }) => ({
        data: data?.data || {},
        ...args,
      }),
    }
  );

  const unit = unitData || {};

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Stack.Screen
        options={{ title: "Chi tiết gian hàng", headerBackTitleVisible: false }}
      ></Stack.Screen>
      <View className="flex flex-col h-full pt-2 bg-white">
        <Search />
        <StoreCard data={unit} />
        <View className="px-1">
          <CategorySelector
            categories={["Sản phẩm", "Giới thiệu", "Cửa hàng"]}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </View>

        <View className="flex-1 mt-2">
          {selectedCategory === "Sản phẩm" && (
            <ListProducts
              products={unit?.unit_product?.map((p) => ({
                product_name: p.title,
                product_image: p.thumbnail_url,
                donvicungcap: unit.name,
              }))}
            />
          )}
          {selectedCategory === "Giới thiệu" && (
            <View className="p-4">
              <Text className="text-lg font-semibold">
                Giới thiệu về gian hàng
              </Text>
              <Text className="text-base mt-2">
                {unit.description || "Không có thông tin giới thiệu."}
              </Text>
            </View>
          )}
          {selectedCategory === "Cửa hàng" && (
            <View className="p-4">
              <Text className="text-lg font-semibold">Thông tin cửa hàng</Text>
              <Text className="text-base mt-2">
                Địa chỉ: {unit.address || "Chưa có thông tin địa chỉ."}
              </Text>
              <Text className="text-base mt-1">
                Liên hệ: {unit.contact || "Chưa có thông tin liên hệ."}
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}
