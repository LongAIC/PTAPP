import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";

const { width } = Dimensions.get("window");
const numColumns = 3;
const itemWidth = width / numColumns;
const gap = 2;

export default function CategoriesProduct(props) {
  const { data } = props;
  const router = useRouter();

  const renderItem = ({ item }) => (
    <Link
      href={{
        pathname: `/category`,
        params: {
          idCurent: item.ID,
        },
      }}
      style={{ width: itemWidth - gap, marginBottom: 5 }}
    >
      <View className="flex justify-center bg-[#fff] items-center h-[100px] p-3 rounded-full border-black">
        <Image
          source={{
            uri: item.image
              ? item.image
              : "https://ftechwebsite.com/PTCOCO/wp-content/uploads/2024/07/668517630fe24.png",
          }}
          className="w-[50px] h-[50px] rounded-full"
        />

        <Text
          className="text-center mt-2 text-16"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ textAlign: "center", width: itemWidth - 20 }}
        >
          {item.name}
        </Text>
      </View>
    </Link>
  );

  return (
    <View className="mb-3">
      <View className="flex-row justify-between mt-4 mb-8">
        <View>
          <Text className="text-base font-bold">Danh mục sản phẩm</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push("/category");
          }}
        >
          <Text className="text-13 underline">Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <FlashList
          data={data}
          renderItem={renderItem}
          numColumns={numColumns}
          estimatedItemSize={200}
          keyExtractor={(item) => item.ID.toString()}
        />
      </View>
    </View>
  );
}
