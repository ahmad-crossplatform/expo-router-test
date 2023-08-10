import { Period, SortType, periodAtom, sortAtom } from "@/atoms/filterAtoms";
import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useAtom } from "jotai";
import { View, Pressable, Text } from "react-native";

export default function Layout() {
  const [sortType, setSortType] = useAtom(sortAtom);
  const [period, setPeriod] = useAtom(periodAtom);
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "Most Viewed News",
          headerTitle: "Most Viewed News",
          headerRight: () => (
            <View
              style={{
                gap: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Pressable
                onPress={() => {
                  setPeriod(Period.Day);
                }}
              >
                {({ pressed }) => (
                  <View
                    style={{
                      height: 35,
                      width: 35,
                      opacity: period !== Period.Day ? 0.5 : 1,
                      borderColor: "white",
                      borderWidth: 3,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      1
                    </Text>
                  </View>
                )}
              </Pressable>

              <Pressable
                onPress={() => {
                  setPeriod(Period.Week);
                }}
              >
                {({ pressed }) => (
                  <View
                    style={{
                      height: 35,
                      width: 35,
                      opacity: period !== Period.Week ? 0.5 : 1,
                      borderColor: "white",
                      borderWidth: 3,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      7
                    </Text>
                  </View>
                )}
              </Pressable>

              <Pressable
                onPress={() => {
                  setPeriod(Period.Month);
                }}
              >
                {({ pressed }) => (
                  <View
                    style={{
                      height: 35,
                      width: 35,
                      opacity: period !== Period.Month ? 0.5 : 1,
                      borderColor: "white",
                      borderWidth: 3,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        opacity: pressed ? 0.5 : 1,
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      30
                    </Text>
                  </View>
                )}
              </Pressable>

              <Pressable
                onPress={() =>
                  sortType == SortType.Ascending
                    ? setSortType(SortType.Descending)
                    : setSortType(SortType.Ascending)
                }
              >
                {({ pressed }) => (
                  <FontAwesome
                    name={
                      sortType == SortType.Ascending
                        ? "sort-amount-asc"
                        : "sort-amount-desc"
                    }
                    size={25}
                    color="#fff"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="[slug]"
        options={{ title: "News Details", headerBackTitle: "Back" }}
      />
    </Stack>
  );
}
