import { Text, Pressable, View, TextInput } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  CategorySelector,
  Icons,
  Search,
  StoreCard,
  ProductSlice,
} from "@/components";
import { useGetSingleUnitDetailQuery } from "@/serviceFTECH";

export default function SingleStallScree() {
  const { id } = useLocalSearchParams();
  console.log(id);
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
  console.log(unit.unit_product);
  return (
    <>
      <Stack.Screen
        options={{ title: "Chi tiết gian hàng", headerBackTitleVisible: false }}
      ></Stack.Screen>
      <View className="flex flex-col h-full pt-2 bg-white">
        <Search />
        <StoreCard data={unit} />
        <View className="px-1  ">
          <CategorySelector categories={["Sản phẩm", "Danh mục", "Cửa hàng"]} />
        </View>
        <View className="flex-1 ">
          <ProductSlice
            products={unit?.unit_product?.map((p) => ({
              ...p,
              unit_name: unit.name,
            }))}
            slide={false}
          />
        </View>
      </View>
    </>
  );
}
