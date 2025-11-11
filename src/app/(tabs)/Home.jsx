import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import { router } from "expo-router";

export default function Home() {
  const { user, signOut } = useAuth();

  const saldo = 5420.85;

  const handleLogout = async () => {
    // await signOut();
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Olá, bem-vindo(a)</Text>
              <Text style={styles.userName}>{user?.name || "Raquel"}</Text>
            </View>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Saldo disponível</Text>
            <Text style={styles.balanceValue}>
              R${" "}
              {saldo.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>

        <View style={styles.productsContainer}>
          <TouchableOpacity style={styles.productCard} activeOpacity={0.7}>
            <View style={[styles.cardHeader, styles.gradientPurple]}>
              <View style={styles.cardHeaderContent}>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.productTitle}>Consignado Privado</Text>
                  <Text style={styles.productDescription}>
                    Crédito com desconto direto na folha de pagamento
                  </Text>
                </View>
                <View style={styles.iconWrapper}>
                  <Ionicons name="cash-outline" size={24} color="#8b5cf6" />
                </View>
              </View>
            </View>
            <View style={styles.cardBody}>
              <TouchableOpacity style={styles.productButton}>
                <Text style={styles.productButtonText}>Simular</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.productCard} activeOpacity={0.7}>
            <View style={[styles.cardHeader, styles.gradientPurple]}>
              <View style={styles.cardHeaderContent}>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.productTitle}>Antecipação FGTS</Text>
                  <Text style={styles.productDescription}>
                    Antecipe seu saldo disponível de forma rápida e segura
                  </Text>
                </View>
                <View style={styles.iconWrapper}>
                  <Ionicons name="wallet-outline" size={24} color="#8b5cf6" />
                </View>
              </View>
            </View>
            <View style={styles.cardBody}>
              <TouchableOpacity style={styles.productButton}>
                <Text style={styles.productButtonText}>Contratar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.productCard} activeOpacity={0.7}>
            <View style={[styles.cardHeader, styles.gradientPurple]}>
              <View style={styles.cardHeaderContent}>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.productTitle}>Precisa de ajuda?</Text>
                  <Text style={styles.productDescription}>
                    Fale com nosso suporte e tire suas dúvidas sobre nossos
                    produtos e serviços.
                  </Text>
                </View>
                <View style={styles.iconWrapper}>
                  <Ionicons name="help-outline" size={24} color="#8b5cf6" />
                </View>
              </View>
            </View>
            <View style={styles.cardBody}>
              <TouchableOpacity style={styles.productButton}>
                <Text style={styles.productButtonText}>Entrar em contato</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#8b5cf6",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 20,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: "#8b5cf6",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  balanceContainer: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  productsContainer: {
    padding: 20,
    paddingTop: 24,
  },
  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden",
  },
  cardHeader: {
    padding: 16,
    paddingBottom: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  gradientPurple: {
    backgroundColor: "#f3e8ff", // Equivalente a purple-50
  },
  cardHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTextContainer: {
    flex: 1,
    paddingRight: 12,
  },
  iconWrapper: {
    padding: 12,
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    borderRadius: 12,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 6,
  },
  productDescription: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  cardBody: {
    padding: 16,
    paddingTop: 12,
  },
  productButton: {
    backgroundColor: "#8b5cf6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  productButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
