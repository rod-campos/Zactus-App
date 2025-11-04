import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import ProgressBar from "../../components/ProgressBar";
import {
  formatCPF,
  cleanCPF,
  validateCPF,
  formatPhone,
  cleanPhone,
  validatePhone,
  validateEmail,
} from "../../utils/formatters";

const TOTAL_STEPS = 3;

export default function RegisterScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={handleBack}
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
      ),
    });
  }, [navigation, currentStep]);

  function handleContinueStep1() {
    const cleanedCPF = cleanCPF(cpf);

    if (!cleanedCPF) {
      Alert.alert("Erro", "Por favor, preencha o CPF");
      return;
    }

    if (!validateCPF(cpf)) {
      Alert.alert("Erro", "CPF inválido");
      return;
    }

    setCurrentStep(2);
  }

  function handleContinueStep2() {
    if (!email || !phone) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erro", "E-mail inválido");
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert("Erro", "Telefone inválido");
      return;
    }

    Alert.alert(
      "Código enviado",
      "Enviamos um código de verificação para seu e-mail e telefone"
    );
    setCurrentStep(3);
  }

  async function handleContinueStep3() {
    if (!otp || otp.length !== 6) {
      Alert.alert("Erro", "Por favor, preencha o código de 6 dígitos");
      return;
    }

    try {
      setLoading(true);
      // Aqui você faria a verificação do OTP e o registro completo
      // await signUp(email, cpf, phone, otp);

      // Simulando uma requisição
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("Erro", "Código inválido ou expirado. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  }

  function renderStep() {
    switch (currentStep) {
      case 1:
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
              style={[
                styles.button,
                (!cpf || loading) && styles.buttonDisabled,
              ]}
              onPress={handleContinueStep1}
              disabled={loading || !cpf}
            >
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        );

      case 2:
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

            <TouchableOpacity
              style={[
                styles.button,
                (!email || !phone || loading) && styles.buttonDisabled,
              ]}
              onPress={handleContinueStep2}
              disabled={loading || !email || !phone}
            >
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        );

      case 3:
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

            <TouchableOpacity style={styles.resendButton} disabled={loading}>
              <Text style={styles.resendText}>Reenviar código</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                (!otp || otp.length !== 6 || loading) && styles.buttonDisabled,
              ]}
              onPress={handleContinueStep3}
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

      default:
        return null;
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <ProgressBar totalSteps={TOTAL_STEPS} currentStep={currentStep} />
          {renderStep()}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
  },
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
