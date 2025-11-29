import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
 import { API_URL } from "../(api)/client";
import { getToken } from "@/utils/token";
import { router } from "expo-router";

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useTodos } from "@/utils/TodosContext";





export default function Dashboard() {
  const { todos, fetchTodos } = useTodos();
  // const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos
  // const fetchTodos = async () => {
  //   try {
  //     const token = await getToken();
  //     if (!token) return;

  //     const res = await fetch(`${API_URL}/todos`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const data = await res.json();
  //     setTodos(data);
  //   } catch (error) {
  //     console.log("Error fetching todos:", error);
  //   }
  // };

  useEffect(() => {
    fetchTodos();
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchTodos(); // refetch whenever screen comes into focus
    }, [])
  );

  // Toggle todo
  const toggleTodo = async (id: number) => {
    try {
      const token = await getToken();
      await fetch(`${API_URL}/todos/${id}/toggle`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos();
    } catch (error) {
      Alert.alert("Error", "Toggle failed");
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      const token = await getToken();
      await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos();
    } catch (error) {
      Alert.alert("Error", "Delete failed");
    }
  };

  // Dummy Edit handler
  const editTodo = (todo: Todo) => {
    Alert.alert("Edit", "You can create a separate edit screen");
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={[styles.title, item.completed && styles.completed]}>
          {item.title}
        </Text>

        <TouchableOpacity onPress={() => toggleTodo(item.id)}>
          <MaterialIcons
            name={item.completed ? "check-box" : "check-box-outline-blank"}
            size={26}
            color="#4caf50"
          />
        </TouchableOpacity>
      </View>

      {item.description ? (
        <Text style={styles.description}>{item.description}</Text>
      ) : null}

      <View style={styles.actions}>
        {/* <TouchableOpacity onPress={() => editTodo(item)}>
          <MaterialIcons name="edit" size={22} color="#2196f3" />
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
          <MaterialIcons name="delete" size={22} color="#f44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Tasks</Text>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#4CAF50",
          padding: 15,
          borderRadius: 50,
        }}
        // onPress={() => router.push("/create-todo")} // navigate to screen
        onPress={() =>
          router.push({
            pathname: "/create-todo",
            
          })
        }
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>+ Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginVertical: 10,
    color: "#333",
  },
  card: {
    backgroundColor: "white",
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "600", color: "#222" },
  completed: { textDecorationLine: "line-through", opacity: 0.6 },
  description: {
    marginTop: 4,
    color: "#666",
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
    justifyContent: "flex-end",
  },
});


