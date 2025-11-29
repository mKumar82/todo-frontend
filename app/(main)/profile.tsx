import { getToken } from "@/utils/token";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { API_URL } from "../(api)/client";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);

    try {
      const token = await getToken();
      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) setProfile(data);
      else console.log("Profile error:", data);
    } catch (err) {
      console.log("Profile fetch failed:", err);
    }

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18 }}>No profile data found.</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        User Profile
      </Text>

      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 12,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold" }}>ID:</Text> {profile.id}
        </Text>

        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Email:</Text> {profile.email}
        </Text>

        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Full Name:</Text>{" "}
          {profile.full_name || "Not provided"}
        </Text>
      </View>
    </View>
  );
}
