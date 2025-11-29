import { TodosProvider } from "@/utils/TodosContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TodosProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TodosProvider>
  );
}
