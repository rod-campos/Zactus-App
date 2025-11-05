import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../../hooks/useAuth";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, {user?.name}! 👋</Text>
          <Text style={styles.subtitle}>Bem-vindo ao Zactus</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🚀 Você está logado!</Text>
          <Text style={styles.cardText}>
            Esta é a área logada do aplicativo. Aqui você pode adicionar todo o
            conteúdo principal da sua aplicação.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Estatísticas</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Itens</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Tarefas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Concluídas</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>ℹ️ Informações</Text>
          <Text style={styles.cardText}>E-mail: {user?.email}</Text>
          <Text style={styles.cardText}>ID: {user?.id}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#8b5cf6",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
});
