import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AuthLayout() {
  const router = useRouter();

  const BackButton = () => (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 5,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="arrow-back" size={20} color="#8b5cf6" />
      <Text style={{ color: "#8b5cf6", fontSize: 16, fontWeight: "500" }}>
        Voltar
      </Text>
    </TouchableOpacity>
  );

  return (
    <Stack
      screenOptions={{
        headerTintColor: "#8b5cf6",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
        },
        headerLeft: () => <BackButton />,
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
