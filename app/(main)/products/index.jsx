import { FlashList } from "@shopify/flash-list";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useEffect } from "react";

import {
  Filter,
  ProductCard,
  ProductSkeleton,
  Sort,
  SubCategories,
} from "@/components";
import { useChangeRoute } from "@/hooks";
import { useGetProductscatQuery } from "@/serviceFTECH";

export default function ProductsScreen() {
  const params = useLocalSearchParams();

  const id = params?.idCat?.toString() ?? "";
  const limit = params?.limit?.toString() ?? 10;
  const page = params?.page?.toString() ?? 0;

  const {
    data,
    hasNextPage,
    count,
    isFetching: isFetchingProduct,
  } = useGetProductscatQuery(
    {
      id,
      limit,
      page,
    },
    {
      selectFromResult: ({ data, ...args }) => ({
        hasNextPage: data?.hasNextPage ?? false,
        data: data?.data,
        count: data?.count ?? 0,
        isFetchingProduct: data == undefined ? false : isFetching,
        ...args,
      }),
    }
  );

  console.log(isFetchingProduct);

  //? Handlers
  const changeRoute = useChangeRoute();

  const onEndReachedThreshold = () => {
    if (!hasNextPage) return;
    changeRoute({
      page: Number(page) + 1,
    });
  };

  const handleChangeRoute = (newQueries) => {
    changeRoute({
      ...params,
      page: 0,
      ...newQueries,
    });
  };

  //*    Get childCategories Data
  // const {
  //   isLoading: isLoadingCategories,
  //   childCategories,
  //   currentCategory,
  // } = useGetCategoriesQuery(undefined, {
  //   selectFromResult: ({ isLoading, data }) => {
  //     const currentCategory = data?.data?.data.find(
  //       (cat) => cat.slug === category
  //     );
  //     const childCategories = data?.data?.data.filter(
  //       (cat) => cat.parent === currentCategory?._id
  //     );
  //     return { childCategories, isLoading, currentCategory };
  //   },
  // });

  return (
    <>
      <Stack.Screen
        options={{
          title: params.category,
        }}
      />
      <View className="bg-white h-full flex">
        {/* <SubCategories
          childCategories={childCategories}
          name={currentCategory?.name}
          isLoading={isLoadingCategories}
        /> */}
        <View className="px-0 flex-1">
          <View id="_products" className="w-full h-[100%] flex px-4 py-2 mt-2">
            {/* Filters & Sort */}
            <View className="divide-y-2 divide-neutral-200">
              <View className="flex flex-row py-2 gap-x-3">
                <Filter
                  mainMaxPrice={data?.data?.mainMaxPrice}
                  mainMinPrice={data?.data?.mainMinPrice}
                  handleChangeRoute={handleChangeRoute}
                />
                <Sort handleChangeRoute={handleChangeRoute} />
              </View>

              <View className="flex flex-row justify-between py-2">
                <Text className="text-base text-neutral-600">
                  Tất cả sản phẩm
                </Text>

                <Text className="text-base text-neutral-600">
                  {count} sản phẩm
                </Text>
              </View>
            </View>
            {/* Products */}
            {isFetchingProduct && page == 0 && <ProductSkeleton />}
            {data && data?.length > 0 ? (
              <FlashList
                data={data}
                keyExtractor={(item) => item.ID.toString()}
                renderItem={({ item, index }) => (
                  <ProductCard product={item} key={item.ID} />
                )}
                onEndReached={onEndReachedThreshold}
                onEndReachedThreshold={0}
                estimatedItemSize={200}
                numColumns={2}
              />
            ) : (
              <Text className="text-center text-red-500">
                Không tìm thấy sản phẩm
              </Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
}
