import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatPhone } from "../../utils/formatters";

export default function Step2({
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onContinue,
  loading,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isValidLength = password.length === 6;
  const isOnlyNumbers = /^\d*$/.test(password);

  const handlePasswordChange = (text) => {
    // Permite apenas números e no máximo 6 dígitos
    const numericValue = text.replace(/[^0-9]/g, "").slice(0, 6);
    setPassword(numericValue);
  };

  const handleConfirmPasswordChange = (text) => {
    // Permite apenas números e no máximo 6 dígitos
    const numericValue = text.replace(/[^0-9]/g, "").slice(0, 6);
    setConfirmPassword(numericValue);
  };
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
        <Text style={styles.label}>Senha (PIN)</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Digite 6 números"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
            keyboardType="number-pad"
            maxLength={6}
            autoComplete="off"
            editable={!loading}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        {password.length > 0 && (
          <View style={styles.passwordRequirements}>
            <View style={styles.requirementRow}>
              <Ionicons
                name={isValidLength ? "checkmark-circle" : "close-circle"}
                size={16}
                color={isValidLength ? "#10b981" : "#ef4444"}
              />
              <Text
                style={[
                  styles.requirementText,
                  isValidLength && styles.requirementMet,
                ]}
              >
                Exatamente 6 dígitos
              </Text>
            </View>
            <View style={styles.requirementRow}>
              <Ionicons
                name={isOnlyNumbers ? "checkmark-circle" : "close-circle"}
                size={16}
                color={isOnlyNumbers ? "#10b981" : "#ef4444"}
              />
              <Text
                style={[
                  styles.requirementText,
                  isOnlyNumbers && styles.requirementMet,
                ]}
              >
                Apenas números
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar Senha (PIN)</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Digite os 6 números novamente"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry={!showConfirmPassword}
            keyboardType="number-pad"
            maxLength={6}
            autoComplete="off"
            editable={!loading}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        {confirmPassword.length > 0 && password !== confirmPassword && (
          <Text style={styles.errorText}>As senhas não coincidem</Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          (!email || !phone || !password || !confirmPassword || loading) &&
            styles.buttonDisabled,
        ]}
        onPress={onContinue}
        disabled={loading || !email || !phone || !password || !confirmPassword}
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    backgroundColor: "#F9F9F9",
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 18,
  },
  eyeIcon: {
    padding: 16,
  },
  passwordRequirements: {
    marginTop: 8,
    gap: 4,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  requirementText: {
    fontSize: 12,
    color: "#666",
  },
  requirementMet: {
    color: "#10b981",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
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
