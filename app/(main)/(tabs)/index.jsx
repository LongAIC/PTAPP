import { Stack, useRouter } from "expo-router";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native";
import {
  BannerOneFtech,
  BannerTwoFtech,
  BestSellsSliderFtech,
  Categories,
  DiscountSlider,
  Slider as MainSlider,
  MostFavoriteProductsFtech,
  FeedHeader,
  ShowWrapper,
  FtechDiscountSlider,
  CategoriesProduct,
  Icons,
} from "@/components";

import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { useGetHomeInfoQuery } from "@/serviceFTECH";
import { useState } from "react";

export default function FeedScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: dataHomePage,
    error,
    isError,
    isFetching,
    isSuccess,
    refetch,
  } = useGetHomeInfoQuery();

  console.log(dataHomePage);

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
        >
          {/* //List các dịnh vụ */}

          {dataHomePage?.data?.length > 0 ? (
            <View>
              {dataHomePage.data.map((item) => {
                console.log(item.data);
                if (item.layoutName === "sp_hot") {
                  return (
                    <View className="px-3 py-3 bg-white mt-2">
                      <MostFavoriteProductsFtech
                        products={item.data}
                        nameSection={item.nameSection}
                        className="mt-2 mb-2"
                      />
                    </View>
                  );
                } else if (item.layoutName === "chu_de_homnay") {
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

          {/* <View className="px-3 py-3 bg-white mt-2">
            <BannerOneFtech
              className="mt-2 mb-2"
              data={
                topic.filter((item) => item.data[0].layout == "slide")[0]
                  ?.data[0]?.dataChude
              }
            />
          </View> */}

          {/* <FtechDiscountSlider
            className="mt-2 mb-2"
            products={onSale}
            title="Đang giảm giá"
            showMore
          /> */}
          {/* <BestSellsSliderFtech data={hot.dataproduct} className="mt-2 mb-2" /> */}
          <View className="px-3 py-3 bg-white mt-2">
            <MostFavoriteProductsFtech
              products={normal?.dataproduct}
              className="mt-2 mb-2"
            />
          </View>
        </ScrollView>
      </ShowWrapper>
    </>
  );
}
