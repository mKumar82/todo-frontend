import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveToken(token: string) {
  await AsyncStorage.setItem("token", token);
}

export async function getToken() {
  return await AsyncStorage.getItem("token");
}
