import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AuthLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTintColor: "#8b5cf6",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: true,
        headerBackTitleStyle: { color: "#8b5cf6" },
        headerBackVisible: true,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "Entrar",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Criar Conta",
        }}
      />
    </Stack>
  );
}
