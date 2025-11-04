import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function WelcomeScreen() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)/home");
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo_zactus.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Bem-vindo(a) a Zactus!</Text>
          <Text style={styles.tagline}>
            Seu hub de crédito rápido e seguro.
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.primaryButtonText}>Começar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/(auth)/register")}
          >
            <Text style={styles.secondaryButtonText}>Já tenho uma conta</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Ao continuar, você concorda com nossos{"\n"}
          <Text style={styles.link}>Termos de Uso</Text> e{" "}
          <Text style={styles.link}>Política de Privacidade</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 30,
    paddingTop: 100,
    paddingBottom: 50,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  appName: {
    textAlign: "center",
    fontSize: 42,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  buttonsContainer: {
    gap: 15,
  },
  primaryButton: {
    backgroundColor: "#8b5cf6",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#8b5cf6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#8b5cf6",
  },
  secondaryButtonText: {
    color: "#8b5cf6",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    lineHeight: 18,
  },
  link: {
    color: "#8b5cf6",
    textDecorationLine: "underline",
  },
});
