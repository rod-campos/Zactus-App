import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function Step3({ otp, setOtp, onContinue, onResend, loading }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Código de verificação</Text>
      <Text style={styles.subtitle}>
        Digite o código de 6 dígitos enviado para seu e-mail e telefone
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.otpInput]}
          placeholder="000000"
          value={otp}
          onChangeText={(text) => setOtp(text.replace(/\D/g, ""))}
          keyboardType="number-pad"
          maxLength={6}
          editable={!loading}
        />
      </View>

      <TouchableOpacity
        style={styles.resendButton}
        onPress={onResend}
        disabled={loading}
      >
        <Text style={styles.resendText}>Reenviar código</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          (!otp || otp.length !== 6 || loading) && styles.buttonDisabled,
        ]}
        onPress={onContinue}
        disabled={loading || !otp || otp.length !== 6}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continuar</Text>
        )}
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
  otpInput: {
    fontSize: 32,
    textAlign: "center",
    letterSpacing: 8,
    fontWeight: "600",
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
  resendButton: {
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  resendText: {
    color: "#8b5cf6",
    fontSize: 14,
    fontWeight: "600",
  },
});
