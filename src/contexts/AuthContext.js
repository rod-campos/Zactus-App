import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  async function loadStoredUser() {
    try {
      const storedUser = await AsyncStorage.getItem("@zactus:user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email, password) {
    // TODO: Implementar lógica de login com sua API
    // Exemplo de dados mockados
    const userData = {
      email,
      name: email.split("@")[0],
      id: Date.now().toString(),
    };

    await AsyncStorage.setItem("@zactus:user", JSON.stringify(userData));
    setUser(userData);

    return userData;
  }

  async function signOut() {
    await AsyncStorage.removeItem("@zactus:user");
    setUser(null);
  }

  async function signUp(email, password, name) {
    // TODO: Implementar lógica de cadastro com sua API
    // Exemplo de dados mockados
    const userData = {
      email,
      name,
      id: Date.now().toString(),
    };

    await AsyncStorage.setItem("@zactus:user", JSON.stringify(userData));
    setUser(userData);

    return userData;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
