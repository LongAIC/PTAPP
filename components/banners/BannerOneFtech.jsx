import { View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import FeedSectionContainer from "../common/FeedSectionContainer";

export default function BannerOneFtech(props) {
  //? Props
  const { data } = props;
  const router = useRouter();

  //? Render(s)
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <FeedSectionContainer title="Chủ đề hôm nay" showMore onJumptoMore={() => {router.push('category')}}>
      <View className="w-full flex flex-row flex-wrap">
        {data.map((item, index) => (
          <View
            className={`w-[49%] h-24 mr-[2%] mb-[2%]  ${index % 2 === 1 ? "mr-0 mb-0" : ""}`}
            key={index}
          >
            <TouchableOpacity
              className="h-full w-full "
              onPress={() => {
                router.push("category");
              }}
            >
              <Image
                source={{
                  uri: item.image,
                }}
                className="w-full h-full rounded-lg"
                alt={item.title || "Banner image"}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </FeedSectionContainer>
  );
}
