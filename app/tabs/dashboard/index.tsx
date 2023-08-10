import useNewsPosts from "@/hooks/useNews";
import moment from "moment";
import React, { useState } from "react";
import {
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { PostComponent } from "./components/PostComponent";

const HomePage: React.FC = () => {
  const {
    isLoading,
    refreshNewsPosts,
    convertToGroupUnit,
    groupByPublishedDate,
    search,
  } = useNewsPosts();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refreshNewsPosts();
    setIsRefreshing(false);
    console.log("refreshed");
  };

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search"
        onChangeText={(text) => {
          search(text);
        }}
      />
      {isLoading && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "tomato",
            }}
          >
            Loading...
          </Text>
        </View>
      )}
      <SectionList
        sections={convertToGroupUnit(groupByPublishedDate())}
        renderItem={({ item }) => (
          <PostComponent post={item} key={item.id.toString()} />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>
            {moment().diff(moment(title), "days") == 0
              ? "Today"
              : moment().diff(moment(title), "days") == 1
              ? "Yesterday"
              : moment().diff(moment(title), "days") + " days ago"}
          </Text>
        )}
        ListEmptyComponent={() => {
          return (
            <View style={styles.emptyList}>
              {isLoading && <Text>Loading...</Text>}
              {!isLoading && <Text>No news posts found</Text>}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyList: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,

    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
  },
  searchBox: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
});
export default HomePage;
