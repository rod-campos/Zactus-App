import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { formatPhone } from "../../utils/formatters";

export default function Step2({
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  onContinue,
  loading,
}) {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Dados de contato</Text>
      <Text style={styles.subtitle}>
        Informe seu e-mail e telefone para continuar
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="(00) 00000-0000"
          value={phone}
          onChangeText={(text) => setPhone(formatPhone(text))}
          keyboardType="phone-pad"
          maxLength={15}
          editable={!loading}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          (!email || !phone || !password || loading) && styles.buttonDisabled,
        ]}
        onPress={onContinue}
        disabled={loading || !email || !phone || !password}
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
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
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
