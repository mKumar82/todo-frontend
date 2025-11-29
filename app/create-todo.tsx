import { router } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
// import { getToken } from "/utils/auth.ts";
import { useTodos } from "@/utils/TodosContext";
import { getToken } from "@/utils/token";
import { API_URL } from "./(api)/client";

export default function CreateTodo() {
  const { todos,fetchTodos } = useTodos();
  const [title, setTitle] = useState("");

  const createTodo = async (title: string) => {
    const token = await getToken();

    await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    await fetchTodos();
    router.back();
    // fetchTodos();
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center", gap: 10 }}>
      <TextInput
        placeholder="Todo title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 10 }}
      />
      <Button title="create" onPress={() => createTodo(title)} />
    </View>
  );
}
