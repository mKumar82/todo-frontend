import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { router } from "expo-router";
import { API_URL } from "../(api)/client";
import { saveToken } from "@/utils/token";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

       if (res.ok) {
         await saveToken(data.access_token); // <-- SAVE TOKEN
         router.replace("/(main)");
       } else {
         Alert.alert("Login Failed", data.detail || "Invalid credentials");
       }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center", gap: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Button title="Login" onPress={handleLogin} />

      <Text
        onPress={() => router.push("/(auth)/signup")}
        style={{ marginTop: 10, color: "blue" }}
      >
        Go to Signup
      </Text>
    </View>
  );
}
