import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "../(api)/client";
import { saveToken } from "../../utils/token";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // const handleSignup = async () => {
  //   try {
  //     console.log("Signing up with:", email, password);
  //     const res = await fetch(`${API_URL}/auth/signup`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     console.log("fetched");
  //     const data = await res.json();

  //     if (res.ok) {
  //       Alert.alert("Success", "Account created!");
  //       router.replace("/(auth)/login");
  //     } else {
  //       Alert.alert("Error", data.detail || "Signup failed");
  //     }
  //   } catch (error: any) {
  //     Alert.alert("Error", error.message);
  //   }
  // };



const handleSignup = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      await saveToken(data.access_token); // <-- SAVE TOKEN
      router.replace("/(main)");
    } else {
      Alert.alert("Error", data.detail || "Signup failed");
    }
  } catch (error: any) {
    Alert.alert("Error", error.message);
  }
};
  return (
    <SafeAreaView
      style={{ padding: 20, flex: 1, justifyContent: "center", gap: 10 }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Signup</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Button title="Create Account" onPress={handleSignup} />
    </SafeAreaView>
  );
}
