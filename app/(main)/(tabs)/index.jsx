import { ScrollView, View, Text, Image, RefreshControl } from "react-native";
import {
  BannerTwoFtech,
  Slider as MainSlider,
  MostFavoriteProductsFtech,
  FeedHeader,
  ShowWrapper,
  CategoriesProduct,
  Icons,
} from "@/components";

import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useGetHomeInfoQuery, useLoadmoreProductQuery } from "@/serviceFTECH";
import { useState } from "react";

export default function FeedScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const params = useLocalSearchParams();
  const limit = params?.limit?.toString() ?? 10;
  const page = params?.page?.toString() ?? 0;

  const {
    data: dataHomePage,
    error,
    isError,
    isFetching,
    isSuccess,
    refetch,
  } = useGetHomeInfoQuery();

  const {
    data: dataProduct,
    hasNextPage,
    isLoading: isLoadingProduct,
    error: errorProduct,
    isError: isErrorProduct,
  } = useLoadmoreProductQuery(
    {
      limit,
      page,
    },
    {
      selectFromResult: ({ data, ...args }) => ({
        hasNextPage: true,
        data: data?.data,
        ...args,
      }),
    }
  );

  console.log("dataProductaaa", dataProduct);

  const changeRoute = (newParams) => {
    const updatedParams = { ...params, ...newParams };
    router.setParams(updatedParams);
  };

  const onEndReached = () => {
    if (!hasNextPage) return;
    changeRoute({
      page: Number(page) + 1,
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <FeedHeader {...props} title="Home" icon="menu-outline" />
          ),
        }}
      />
      <ShowWrapper
        error={error}
        isError={isError}
        refetch={refetch}
        isFetching={isFetching}
        isSuccess={isSuccess}
        type="detail"
      >
        <ScrollView
          className="bg-[#f4f4f4] flex h-full"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={({ nativeEvent }) => {
            const { layoutMeasurement, contentOffset, contentSize } =
              nativeEvent;
            const paddingToBottom = 20;
            if (
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - paddingToBottom
            ) {
              onEndReached();
            }
          }}
          scrollEventThrottle={400}
        >
          {/* //List các dịnh vụ */}

          {dataHomePage?.data?.length > 0 ? (
            <View>
              {dataHomePage.data.map((item) => {
                console.log(item.data);
                if (item.layoutName === "chu_de_homnay") {
                  return (
                    <View className="px-3 py-3 bg-white mt-2">
                      <BannerTwoFtech
                        className="mt-2 mb-2"
                        data={item.data}
                        nameSection={item.nameSection}
                      />
                    </View>
                  );
                } else if (item.layoutName === "dm_sp") {
                  return (
                    <View className="px-3 mt-2 bg-white">
                      <CategoriesProduct data={item.data} />
                    </View>
                  );
                } else if (item.layoutName === "slide_home") {
                  return <MainSlider data={item.data} className="bg-white " />;
                } else if (item.layoutName === "service_home") {
                  return (
                    <View className="pt-3 bg-white">
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        contentContainerStyle={{ paddingBottom: 13 }}
                      >
                        <View className="flex flex-row px-4 space-x-8">
                          <View className="items-center">
                            <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                              <Image
                                source={require("@/assets/images/live2.png")}
                                className="w-6 h-6"
                              />
                            </View>
                            <Text className="text-xs mt-1">Khuyến mãi</Text>
                          </View>

                          <View className="items-center">
                            <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                              <Image
                                source={require("@/assets/images/live.png")}
                                className="w-6 h-6"
                              />
                            </View>
                            <Text className="text-xs mt-1">Mã giảm giá</Text>
                          </View>

                          <View className="items-center">
                            <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                              <Image
                                source={require("@/assets/images/banhang.png")}
                                className="w-6 h-6"
                              />
                            </View>
                            <Text className="text-xs mt-1">Freeship</Text>
                          </View>

                          <View className="items-center">
                            <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                              <Image
                                source={require("@/assets/images/pro.png")}
                                className="w-6 h-6"
                              />
                            </View>
                            <Text className="text-xs mt-1">Ưu đãi</Text>
                          </View>
                          <View className="items-center">
                            <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                              <Image
                                source={require("@/assets/images/live2.png")}
                                className="w-6 h-6"
                              />
                            </View>
                            <Text className="text-xs mt-1">Khuyến mãi</Text>
                          </View>

                          <View className="items-center">
                            <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                              <Image
                                source={require("@/assets/images/live.png")}
                                className="w-6 h-6"
                              />
                            </View>
                            <Text className="text-xs mt-1">Mã giảm giá</Text>
                          </View>

                          <View className="items-center">
                            <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                              <Image
                                source={require("@/assets/images/banhang.png")}
                                className="w-6 h-6"
                              />
                            </View>
                            <Text className="text-xs mt-1">Freeship</Text>
                          </View>

                          <View className="items-center">
                            <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                              <Image
                                source={require("@/assets/images/pro.png")}
                                className="w-6 h-6"
                              />
                            </View>
                            <Text className="text-xs mt-1">Ưu đãi</Text>
                          </View>
                        </View>
                      </ScrollView>
                    </View>
                  );
                }
              })}
            </View>
          ) : (
            <View>
              <Text>Không có dữ liệu</Text>
            </View>
          )}
          <View className="px-3 py-3 bg-white mt-2">
            {dataProduct && (
              <MostFavoriteProductsFtech
                products={dataProduct}
                nameSection={"Sản phẩm mới"}
                className="mt-2 mb-2"
              />
            )}
          </View>
          {isLoadingProduct && (
            <View className="py-4">
              <Text className="text-center">Đang tải thêm sản phẩm...</Text>
            </View>
          )}
        </ScrollView>
      </ShowWrapper>
    </>
  );
}
