import { Link, Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";

import { Icons, ShowWrapper } from "@/components";
import { useGetCategoriesFTECHQuery } from "@/serviceFTECH";
import { useLocalSearchParams } from "expo-router";

export default function CategoryScreen(props) {
  const { idCurent } = useLocalSearchParams();
  // const categories = [
  //   {
  //     __v: 0,
  //     _id: "662f5fa63fb8ab13f57bb60c",
  //     children: [],
  //     colors: {
  //       end: "#000000",
  //       start: "#000000",
  //     },
  //     createdAt: "2024-04-29T08:51:50.069Z",
  //     image:
  //       "https://huanghanzhilian-test.oss-cn-beijing.aliyuncs.com/shop/upload/image/icons/eQRE6Qo0v-smIt7TVJzaP.png",
  //     level: 1,
  //     name: "Test",
  //     parent: "6409d88015577a9c80ae7cb0",
  //     slug: "test-slug",
  //     updatedAt: "2024-04-29T08:54:27.700Z",
  //   },
  //   {
  //     __v: 0,
  //     _id: "661a7baf0db9aa97417c4cad",
  //     children: [],
  //     colors: {
  //       end: "#000000",
  //       start: "#000000",
  //     },
  //     createdAt: "2024-04-13T12:33:51.657Z",
  //     image: "https://img95.699pic.com/photo/40082/4608.jpg_wh860.jpg",
  //     level: 3,
  //     name: "Data product level 3",
  //     parent: "661a7b970db9aa97417c4ca7",
  //     slug: "/data-transcation/2/3",
  //     updatedAt: "2024-05-12T08:04:47.110Z",
  //   },
  //   {
  //     __v: 0,
  //     _id: "661a7b970db9aa97417c4ca7",
  //     children: [],
  //     colors: {
  //       end: "#000000",
  //       start: "#000000",
  //     },
  //     createdAt: "2024-04-13T12:33:27.937Z",
  //     image: "https://img95.699pic.com/photo/40082/4608.jpg_wh860.jpg",
  //     level: 2,
  //     name: "Secondary category 1",
  //     parent: "661a7a9f0db9aa97417c4c9f",
  //     slug: "/data-transcation/2",
  //     updatedAt: "2024-05-12T08:05:44.287Z",
  //   },
  //   {
  //     __v: 0,
  //     _id: "661a7a9f0db9aa97417c4c9f",
  //     children: [],
  //     colors: {
  //       end: "#e052ba",
  //       start: "#66f718",
  //     },
  //     createdAt: "2024-04-13T12:29:19.461Z",
  //     image:
  //       "https://huanghanzhilian-test.oss-cn-beijing.aliyuncs.com/shop/upload/image/icons/sPJ-kXhmp39j_AT00m3PG.webp",
  //     level: 1,
  //     name: "wires",
  //     parent: "6409d88015577a9c80ae7cb0",
  //     slug: "data-transaction",
  //     updatedAt: "2024-05-12T09:45:21.866Z",
  //   },
  //   {
  //     __v: 0,
  //     _id: "6409d88015577a9c80ae7cb0",
  //     colors: {
  //       end: "#c2192d",
  //       start: "#ff0000",
  //     },
  //     createdAt: "2023-03-09T13:00:48.229Z",
  //     image:
  //       "https://huanghanzhilian-test.oss-cn-beijing.aliyuncs.com/shop/upload/image/icons/VVTEaVMAcmXxLRn4ur41f.png",
  //     level: 0,
  //     name: "Great selection",
  //     slug: "Great selection",
  //     updatedAt: "2024-06-05T06:53:12.495Z",
  //   },
  //   {
  //     __v: 0,
  //     _id: "62ee38fd6047cfc80af00780",
  //     createdAt: "2022-08-06T09:48:45.042Z",
  //     image:
  //       "http://huanghanzhilian-test.oss-cn-beijing.aliyuncs.com/shop/upload/image//icons/_zBUniluKcSdT0coCDDpp.webp",
  //     level: 3,
  //     name: "nintendo",
  //     parent: "62ee0620d18a5138ed5e76bb",
  //     slug: "nintendo",
  //     updatedAt: "2024-05-12T08:14:08.007Z",
  //   },
  //   {
  //     __v: 0,
  //     _id: "62ee068cd18a5138ed5e76cc",
  //     createdAt: "2022-08-06T06:13:32.653Z",
  //     image:
  //       "http://huanghanzhilian-test.oss-cn-beijing.aliyuncs.com/shop/upload/image//icons/LIjZjaF41vPMSmij8SG8B.webp",
  //     level: 3,
  //     name: "xbox",
  //     parent: "62ee0620d18a5138ed5e76bb",
  //     slug: "xbox",
  //     updatedAt: "2024-05-12T08:14:18.696Z",
  //   },
  //   {
  //     __v: 0,
  //     _id: "62ee065cd18a5138ed5e76c9",
  //     createdAt: "2022-08-06T06:12:44.381Z",
  //     image:
  //       "http://huanghanzhilian-test.oss-cn-beijing.aliyuncs.com/shop/upload/image//icons/9Zxzpq6NAl6S-_ermcfMC.webp",
  //     level: 3,
  //     name: "playstation",
  //     parent: "62ee0620d18a5138ed5e76bb",
  //     slug: "playstation",
  //     updatedAt: "2024-05-12T08:14:30.524Z",
  //   },
  //   {
  //     __v: 0,
  //     _id: "62ee0620d18a5138ed5e76bb",
  //     createdAt: "2022-08-06T06:11:44.169Z",
  //     image:
  //       "http://huanghanzhilian-test.oss-cn-beijing.aliyuncs.com/shop/upload/image//icons/Fqo2tTBZzQtmExi9NvH-K.webp",
  //     level: 2,
  //     name: "electronincs1",
  //     parent: "62b06eda27f3e398c43753d0",
  //     slug: "electronincs1",
  //     updatedAt: "2024-05-12T08:13:36.500Z",
  //   },
  //   {
  //     __v: 0,
  //     _id: "62c02753e7583fd04586f83e",
  //     createdAt: "2022-07-02T11:09:07.528Z",
  //     image:
  //       "https://huanghanzhilian-test.oss-cn-beijing.aliyuncs.com/shop/upload/image/icons/218HnZZcr9r2xJGEPW_7J.png",
  //     level: 3,
  //     name: "camera 2",
  //     parent: "62c0267ae7583fd04586f836",
  //     slug: "camera 2",
  //     updatedAt: "2024-05-12T08:10:04.465Z",
  //   },
  //   {
  //     __v: 0,
  //     _id: "62c026fce7583fd04586f839",
  //     createdAt: "2022-07-02T11:07:40.976Z",
  //     image:
  //       "https://huanghanzhilian-test.oss-cn-beijing.aliyuncs.com/shop/upload/image/icons/218HnZZcr9r2xJGEPW_7J.png",
  //     level: 3,
  //     name: "camera 3",
  //     parent: "62c0267ae7583fd04586f836",
  //     slug: "camera 3",
  //     updatedAt: "2024-05-12T08:10:22.042Z",
  //   },
  //   {
  //     __v: 0,
  //     _id: "62c0267ae7583fd04586f836",
  //     createdAt: "2022-07-02T11:05:30.799Z",
  //     image:
  //       "https://huanghanzhilian-test.oss-cn-beijing.aliyuncs.com/shop/upload/image/icons/MKSifl2AAmo_3xG55kR0F.png",
  //     level: 2,
  //     name: "camera1",
  //     parent: "62c0267ae7583fd04586f836",
  //     slug: "camera 3",
  //     updatedAt: "2024-05-12T08:10:22.042Z",
  //   },
  // ];

  //? Get Categories Query
  const { categories, isSuccess, isFetching, error, isError, refetch } =
    useGetCategoriesFTECHQuery(undefined, {
      selectFromResult: ({ data, ...args }) => ({
        categories: data?.data || [],
        ...args,
      }),
    });

  //? State
  const [activeMinCat, setActiveMinCat] = useState({});

  //? Handlers
  const handleActive = (cat) => {
    setActiveMinCat(cat);
  };

  const handleSearch = () => {
    router.push("/search");
  };

  //? Re-Renders
  useEffect(() => {
    if (categories.length)
      if (idCurent) {
        const selectedCategory = categories.find(
          (category) => category._id == idCurent
        );
        if (selectedCategory) {
          setActiveMinCat(selectedCategory);
        }
      } else {
        setActiveMinCat(
          categories?.filter((category) => category.level === 1)[0]
        );
      }
  }, [categories]);

  //? Render(s)
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <>
              <Icons.EvilIcons
                name="search"
                size={30}
                color="#1F2937"
                className="px-2 py-1"
                onPress={handleSearch}
              />
            </>
          ),
        }}
      />
      <ShowWrapper
        error={error}
        isError={isError}
        refetch={refetch}
        isFetching={isFetching}
        isSuccess={isSuccess}
        type="list"
        dataLength={categories?.length ?? 0}
      >
        <View className="flex h-full flex-row bg-white">
          <ScrollView className="bg-neutral-100 h-full w-3/12 shrink-0">
            {categories.length
              ? categories
                  .filter((category) => category.level === 1)
                  .map((levelOneCategory) => (
                    <TouchableOpacity
                      className={`flex flex-col items-center py-3 px-2 space-y-2 border-b border-r border-neutral-200 bg-neutral-100 ${activeMinCat._id === levelOneCategory._id ? "bg-white border-r-0" : ""}`}
                      key={levelOneCategory._id}
                      onPress={() => handleActive(levelOneCategory)}
                    >
                      <View className="rounded-full border-solid border-2 border-slate-200 overflow-hidden">
                        <Image
                          source={{
                            uri: levelOneCategory.image,
                          }}
                          className="w-10 h-10"
                        />
                      </View>
                      <Text className="text-gray-700 text-center">
                        {levelOneCategory.name}
                      </Text>
                    </TouchableOpacity>
                  ))
              : null}
          </ScrollView>
          <ScrollView className="bg-white w-9/12 ml-2">
            <View className="p-2 flex flex-row flex-wrap">
              {activeMinCat
                ? categories?.map((levelTwoCategory, indexss) => {
                    if (
                      levelTwoCategory.parent === activeMinCat._id &&
                      levelTwoCategory.level != 4
                    ) {
                      return (
                        <View key={levelTwoCategory._id}>
                          <Pressable>
                            <Text className="break-words py-2 text-neutral-900 font-bold">
                              {levelTwoCategory.name}
                            </Text>
                          </Pressable>

                          <View className="flex flex-row flex-wrap">
                            {categories
                              .filter(
                                (category) =>
                                  category.parent === levelTwoCategory._id
                              )
                              .map((levelThreeCategory, index) => (
                                <Link
                                  href={{
                                    pathname: "/products",
                                    params: {
                                      category: levelThreeCategory.name,
                                      idCat: levelThreeCategory._id,
                                    },
                                  }}
                                  asChild
                                  key={levelThreeCategory._id}
                                >
                                  <TouchableOpacity
                                    className={`flex items-center w-[26%] mr-[11%] space-y-2 my-4 ${index % 3 === 2 ? "mr-0" : ""}`}
                                  >
                                    <View className="flex items-center justify-center w-full aspect-square rounded-full border-solid border-2 border-slate-200 overflow-hidden">
                                      <Image
                                        key={index}
                                        source={{
                                          uri: levelThreeCategory.image,
                                        }}
                                        className="w-[100%] h-[100%]"
                                      />
                                    </View>
                                    <Text className="text-gray-700 text-center">
                                      {levelThreeCategory.name}
                                    </Text>
                                  </TouchableOpacity>
                                </Link>
                              ))}
                          </View>
                        </View>
                      );
                    } else if (
                      levelTwoCategory.parent === activeMinCat._id &&
                      levelTwoCategory.level == 4
                    ) {
                      return (
                        <Link
                          href={{
                            pathname: "/products",
                            params: {
                              category: levelTwoCategory.name,
                              idCat: levelTwoCategory._id,
                            },
                          }}
                          asChild
                          key={levelTwoCategory._id}
                        >
                          <TouchableOpacity
                            className={`flex items-center w-[26%] mr-[21px] space-y-2 my-4 `}
                          >
                            <View className="flex items-center justify-center w-full aspect-square rounded-full border-solid border-2 border-slate-200 overflow-hidden">
                              <Image
                                key={indexss}
                                source={{
                                  uri: levelTwoCategory.image,
                                }}
                                className="w-[100%] h-[100%]"
                              />
                            </View>
                            <Text className="text-gray-700 text-center">
                              {levelTwoCategory.name}
                            </Text>
                          </TouchableOpacity>
                        </Link>
                      );
                    }
                  })
                : null}
            </View>
          </ScrollView>
        </View>
      </ShowWrapper>
    </>
  );
}
