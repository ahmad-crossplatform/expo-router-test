import useNewsPosts from "@/hooks/useNews";
import { INewsPost } from "@/types/INewsPost";
import {
  useLocalSearchParams,
  useRouter,
  usePathname,
  Stack,
} from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const HomePage: React.FC = () => {
  const { slug } = useLocalSearchParams();
  const { getNewsPostById } = useNewsPosts();
  const [news, setNews] = React.useState<INewsPost>();

  useEffect(() => {
    setNews(getNewsPostById(+slug));
  }, [slug]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: news?.section || "News",
        }}
      />
      {news?.media[0]?.["media-metadata"] && (
        <Image
          style={{
            width: news?.media[0]?.["media-metadata"]?.[2].width,
            height: news?.media[0]?.["media-metadata"]?.[2].height,
          }}
          source={{
            uri: news?.media?.[0]["media-metadata"]?.[2]?.url,
          }}
        />
      )}

      <Text style={styles.title}>{news?.title}</Text>
      <Text style={styles.details}>{news?.abstract}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  details: {
    fontSize: 16,
    marginVertical: 10,
  },
});
export default HomePage;
