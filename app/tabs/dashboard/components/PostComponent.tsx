import { INewsPost } from "@/types/INewsPost";
import moment from "moment";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export const PostComponent: React.FC<{ post: INewsPost }> = ({ post }) => {
  return (
    <TouchableOpacity style={styles.card}>
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
      {/* <View style={styles.date}>
        <Text>{`${
          moment().diff(post.updated, "days") == 0
            ? "Today"
            : moment().diff(post.updated, "days") == 1
            ? "Yesterday"
            : moment().diff(post.updated, "days") + " days ago"
        }`}</Text>
      </View> */}
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
