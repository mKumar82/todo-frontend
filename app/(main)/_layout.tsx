import { Tabs } from "expo-router";
import { Text } from "react-native";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { TodosProvider } from "@/utils/TodosContext";

// Sign out helper
const signOut = async (router: any) => {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("user_email");
  await SecureStore.deleteItemAsync("user_name");
  router.replace("/(auth)/login"); // go back to login
};

// HeaderRight component
function HeaderRight() {
  const router = useRouter();
  return (
    <Text
      style={{ marginRight: 15, color: "red", fontWeight: "bold" }}
      onPress={() => signOut(router)}
    >
      Sign Out
    </Text>
  );
}

export default function AppTabs() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const name = await SecureStore.getItemAsync("user_name");
      setUsername(name || "");
    };
    fetchUser();
  }, []);

  return (
    <TodosProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: `Dashboard ${username}`,
            headerRight: () => <HeaderRight />,
          }}
        />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </TodosProvider>
  );
}