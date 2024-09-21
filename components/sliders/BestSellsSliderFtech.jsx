import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { View, Text, Image, Pressable } from "react-native";

import FeedSectionContainer from "../common/FeedSectionContainer";
import Skeleton from "../common/Skeleton";

import { truncate } from "@/utils";

const generateGroup = (arr, countNum) => {
  const result = [];
  for (let i = 0; i < arr.length; i += countNum) {
    result.push(arr.slice(i, i + countNum));
  }
  return result;
};

export default function BestSellsSliderFtech(props) {
  //? Props
  const { data } = props;
  if (Array.isArray(data) && data?.length > 0) {
    const products = generateGroup(data, 2);
    return (
      <FeedSectionContainer title="Bán chạy nhất">
        <FlashList
          data={products}
          renderItem={({ item, index }) => (
            <View className="mr-4">
              {item?.map((row, rowIndex) => (
                <Link
                  href={{
                    pathname: `/products/${row.ID}`,
                  }}
                  key={row?.ID} 
                  asChild
                  className="px-1 py-4 w-60"
                >
                  <Pressable className="flex flex-row">
                    <Image
                      source={{
                        uri: row?.product_image, 
                      }}
                      className="w-24 h-24 shrink-0 mr-2"
                    />
                    <View className="flex flex-auto flex-row items-center border-b border-gray-200">
                      <Text className="text-2xl text-sky-500 mx-2">
                        {index * 2 + rowIndex + 1}
                      </Text>
                      <Text className="flex-auto">
                        {truncate(row?.product_name, 15)}
                      </Text>
                    </View>
                  </Pressable>
                </Link>
              ))}
            </View>
          )}
          horizontal
          estimatedItemSize={200}
        />
      </FeedSectionContainer>
    );
  } else {
    console.log("here");
    return <Skeleton />; 
  }
}
