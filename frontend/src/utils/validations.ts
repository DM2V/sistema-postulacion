export function validateEcuadorianID(id: string): boolean {
  const numberPattern = /^[0-9]*$/;

  if (!id || !numberPattern.test(id)) {
    return false; // Retorna falso si el campo está vacío o contiene caracteres que no son números
  }

  const pattern = /^(0[1-7]|1[0-9]|20)(\d{7})\d$/;
  return pattern.test(id);
}


export function validateEmail(email: string): boolean{
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return pattern.test(email);
}

export function validatePassport(passport: string): boolean {
  const passportRegex = /^[A-Z0-9<]{2,20}$/;
  return passportRegex.test(passport);
}

export function validateNumbersOnly(input: string): boolean {
  const pattern = /^[0-9]+$/;
  return pattern.test(input);
}

export function validateLettersSpaces(input: string): boolean {
  const pattern = /^[a-zA-Z\s]+$/;
  return pattern.test(input);
}

export function validateNumberLettersSpaces(input: string): boolean {
  const pattern = /^[a-zA-Z0-9\s]+$/;
  return pattern.test(input);
}

export const defaultValidationFunction = (value: string): boolean => true;

export function validateNotEmpty(input: string): boolean {
  const pattern = /^(.+)$/;
  return pattern.test(input);
}


export function validatePassword(password: string): boolean {
  // Define los criterios para una contraseña segura
  const lengthCheck = password.length >= 8; // Mínimo 8 caracteres
  const uppercaseCheck = /[A-Z]/.test(password); // Al menos una letra mayúscula
  const lowercaseCheck = /[a-z]/.test(password); // Al menos una letra minúscula
  const numberCheck = /\d/.test(password); // Al menos un número
  const specialCharacterCheck = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(
    password
  ); // Al menos un carácter especial

  // Verifica si la contraseña cumple con todos los criterios
  return (
    lengthCheck &&
    uppercaseCheck &&
    lowercaseCheck &&
    numberCheck &&
    specialCharacterCheck
  );
}

export function calculateAge(birthdate: string): number {
  const birthdateDate = new Date(birthdate);
  const currentDate = new Date();
  
  const years = currentDate.getFullYear() - birthdateDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const birthdateMonth = birthdateDate.getMonth();

  if (currentMonth < birthdateMonth || (currentMonth === birthdateMonth && currentDate.getDate() < birthdateDate.getDate())) {
    return years - 1;
  }

  return years;
}