import { useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import ProgressBar from "../../components/ProgressBar";
import Step1 from "../../components/register/Step1";
import Step2 from "../../components/register/Step2";
import Step3 from "../../components/register/Step3";
import {
  cleanCPF,
  validateCPF,
  validateEmail,
  validatePhone,
} from "../../utils/formatters";

const TOTAL_STEPS = 3;

export default function RegisterScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
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
    if (!email || !phone || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("Erro", "Código inválido ou expirado. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleResendCode() {
    Alert.alert("Sucesso", "Código reenviado!");
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
          <Step1
            cpf={cpf}
            setCpf={setCpf}
            onContinue={handleContinueStep1}
            loading={loading}
          />
        );
      case 2:
        return (
          <Step2
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            password={password}
            setPassword={setPassword}
            onContinue={handleContinueStep2}
            loading={loading}
          />
        );
      case 3:
        return (
          <Step3
            otp={otp}
            setOtp={setOtp}
            onContinue={handleContinueStep3}
            onResend={handleResendCode}
            loading={loading}
          />
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
});
