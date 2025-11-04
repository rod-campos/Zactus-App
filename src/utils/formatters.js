export const formatCPF = (value) => {
  const cleaned = value.replace(/\D/g, "");
  const limited = cleaned.slice(0, 11);

  if (limited.length <= 3) {
    return limited;
  } else if (limited.length <= 6) {
    return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  } else if (limited.length <= 9) {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  } else {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(
      6,
      9
    )}-${limited.slice(9)}`;
  }
};

export const cleanCPF = (value) => {
  return value.replace(/\D/g, "");
};

export const validateCPF = (cpf) => {
  const cleaned = cleanCPF(cpf);

  if (cleaned.length !== 11) return false;

  if (/^(\d)\1+$/.test(cleaned)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(10, 11))) return false;

  return true;
};

export const formatPhone = (value) => {
  const cleaned = value.replace(/\D/g, "");
  const limited = cleaned.slice(0, 11);

  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 6) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  } else if (limited.length <= 10) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(
      6
    )}`;
  } else {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(
      7
    )}`;
  }
};

export const cleanPhone = (value) => {
  return value.replace(/\D/g, "");
};

export const validatePhone = (phone) => {
  const cleaned = cleanPhone(phone);
  return cleaned.length >= 10 && cleaned.length <= 11;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
