import { INewsPost } from "@/types/INewsPost";
import { Link } from "expo-router";

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface IPostComponentProps {
  post: INewsPost;
  onClick: (id: number) => void;
}
export const PostComponent: React.FC<IPostComponentProps> = ({
  post,
  onClick,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onClick(post.id)}>
      <Text style={styles.section}>{post.section}</Text>
      <View style={styles.container}>
        {post.media[0]?.["media-metadata"]?.[0].url && (
          <View style={styles.imageContainer}>
            <Image
              style={{
                width: post.media[0]?.["media-metadata"]?.[0].width,
                height: post.media[0]?.["media-metadata"]?.[0].height,
              }}
              source={{
                uri: post.media[0]["media-metadata"][0].url,
              }}
            />
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{post.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 10,
    marginVertical: 3,
    gap: 3,
  },
  section: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
    backgroundColor: "#f2f2f2",

    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  container: {
    flexDirection: "row",
    gap: 3,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flex: 3,

    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
  date: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
