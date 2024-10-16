export function validarRucEcuador(ruc: string): boolean {
  // Verificar que el RUC tenga exactamente 13 dígitos
  if (ruc.length !== 13) return false;

  // Verificar que los dos primeros dígitos estén entre 01 y 24 (provincia)
  const provincia = parseInt(ruc.substring(0, 2), 10);
  if (provincia < 1 || provincia > 24) return false;

  // El tercer dígito define si es una persona natural o una entidad
  const tercerDigito = parseInt(ruc[2], 10);
  if (tercerDigito >= 6) return false; // Personas naturales tienen dígitos del 0 al 5

  // Verificar los últimos tres dígitos para que sean "001"
  const establecimiento = ruc.substring(10, 13);
  if (establecimiento !== '001') return false;

  // Cálculo del dígito verificador
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let total = 0;

  for (let i = 0; i < coeficientes.length; i++) {
    let valor = parseInt(ruc[i], 10) * coeficientes[i];
    if (valor >= 10) valor -= 9;
    total += valor;
  }

  // Calcular el dígito verificador esperado
  const digitoVerificador = parseInt(ruc[9], 10);
  const modulo = total % 10;
  const digitoCalculado = modulo === 0 ? 0 : 10 - modulo;

  // Validar el dígito verificador
  return digitoVerificador === digitoCalculado;
}

export function isOver18(birthDate: Date): boolean {
  const today = new Date();
  const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  return birthDate <= eighteenYearsAgo;
}

export function validarCedulaEcuatoriana(ci: string): boolean {
  if (!/^\d{10}$/.test(ci)) return false; // Verifica que tenga 10 dígitos

  const provincia = parseInt(ci.substring(0, 2), 10);
  if (provincia < 1 || provincia > 24) return false; // Verifica que los primeros dos dígitos sean válidos

  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let total = 0;

  for (let i = 0; i < coeficientes.length; i++) {
    let valor = parseInt(ci[i], 10) * coeficientes[i];
    if (valor >= 10) valor -= 9;
    total += valor;
  }

  const digitoVerificadorCalculado = 10 - (total % 10);
  const digitoVerificador = parseInt(ci[9], 10);

  return digitoVerificador === (digitoVerificadorCalculado === 10 ? 0 : digitoVerificadorCalculado);
}
