import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { formatCPF } from "../../utils/formatters";

export default function Step1({ cpf, setCpf, onContinue, loading }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Qual é o seu CPF?</Text>
      <Text style={styles.subtitle}>
        Usaremos seu CPF para identificar você e suas ofertas.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="000.000.000-00"
          value={cpf}
          onChangeText={(text) => setCpf(formatCPF(text))}
          keyboardType="numeric"
          maxLength={14}
          editable={!loading}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, (!cpf || loading) && styles.buttonDisabled]}
        onPress={onContinue}
        disabled={loading || !cpf}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    padding: 16,
    borderRadius: 12,
    fontSize: 18,
    backgroundColor: "#F9F9F9",
  },
  button: {
    backgroundColor: "#8b5cf6",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: "auto",
    shadowColor: "#8b5cf6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
