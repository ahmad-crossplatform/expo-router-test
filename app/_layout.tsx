import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { useFirebaseAuthentication } from "./hooks/useFirebaseAuthentication";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { initializeFireBaseAuth } = useFirebaseAuthentication();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  const segments = useSegments();
  useEffect(() => {
    console.log("KEY", process.env.EXPO_PUBLIC_FIREBASE_APIKey);
    const firebaseConfig = {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKey,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTHDomain,
      databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DatabaseURL,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_ProjectID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_StorageBucket,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MessagingSenderID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_AppID,
      measurementId: process.env.EXPO_PUBLIC_FIREBASE_MeasurementID,
    };
    console.log("FIREBASE CONFIG", firebaseConfig);
    const app = initializeApp({ ...firebaseConfig });

    initializeFireBaseAuth(
      app,
      async () => {
        const inAuthGroup = segments[0] === "(auth)";

        if (inAuthGroup) router.replace("/(tabs)");
        router.replace("/");
        setIsFirebaseReady(true);
      },
      async () => {
        router.replace("/sign-in");
        setIsFirebaseReady(true);
      }
    );
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && isFirebaseReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isFirebaseReady]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
