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
    const firebaseConfig = {
      apiKey: "AIzaSyBW6vu-m8Z3y28PziM3Xg1Tu-cKCQCYmn8",
      authDomain: "wish2go-9d2c4.firebaseapp.com",
      databaseURL: "https://wish2go-9d2c4.firebaseio.com",
      projectId: "wish2go-9d2c4",
      storageBucket: "wish2go-9d2c4.appspot.com",
      messagingSenderId: "284980682582",
      appId: "1:284980682582:web:70a6559420c45236a3c0f7",
      measurementId: "G-N0SPHFH3P5",
    };

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
