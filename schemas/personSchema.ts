import * as Yup from 'yup';
import { validarRucEcuador, isOver18, validarCedulaEcuatoriana } from '@/app/utils/validations';

const familyMemberSchema = Yup.object().shape({
  name: Yup.string().trim().required('El nombre es requerido'),
  lastName: Yup.string().trim().required('El apellido es requerido'),
  ci: Yup.string()
    .required('La cédula de identidad es requerida')
    .test('validar-cedula', 'La cédula de identidad no es válida', (value) => {
      if (!value) return false;
      return validarCedulaEcuatoriana(value);
    }),
});

export const personSchema = Yup.object().shape({
  _id: Yup.string().optional(),
  name: Yup.string().required('El nombre es requerido'),
  lastName: Yup.string().required('El apellido es requerido'),
  ci: Yup.string()
    .required('La cédula de identidad es requerida')
    .test('validar-cedula', 'La cédula de identidad no es válida', (value) => {
      if (!value) return false;
      return validarCedulaEcuatoriana(value);
    }),
  dateOfBirth: Yup.date()
    .required('La fecha de nacimiento es requerida')
    .test('is-over-18', 'Debe ser mayor de 18 años', function(value) {
      if (!value) return false;
      return isOver18(new Date(value));
    }),
  hasRuc: Yup.boolean().required('Debe especificar si tiene RUC').defined(),
  rucNumber: Yup.string().when('hasRuc', {
    is: true,
    then: (schema) =>
      schema
        .required('El número de RUC es requerido')
        .test('ruc-valido', 'El RUC no es válido', (value) => validarRucEcuador(value || '')),
    otherwise: (schema) => schema.notRequired(),
  }),
  gender: Yup.string().oneOf(['male', 'female', 'other'], 'Género inválido').required('El género es requerido'),
  hasFarm: Yup.boolean().required('Debe especificar si tiene granja').defined(),
  farmHa: Yup.number().when('hasFarm', {
    is: true,
    then: (schema) => schema.required('El tamaño de la granja es requerido cuando hasFarm es true')
      .positive('El tamaño de la granja debe ser un número positivo'),
    otherwise: (schema) => schema.notRequired(),
  }),
  farmName: Yup.string().when('hasFarm', {
    is: true,
    then: (schema) => schema.required('El nombre de la granja es requerido cuando hasFarm es true'),
    otherwise: (schema) => schema.notRequired(),
  }),
  crops: Yup.array().when('hasFarm', {
    is: true,
    then: (schema) => schema
      .of(Yup.string().required('El nombre del cultivo es requerido'))
      .min(1, 'Debe especificar al menos un cultivo')
      .required('Debe especificar los cultivos'),
    otherwise: (schema) => schema.notRequired(),
  }),

  family: Yup.array().of(familyMemberSchema)
    .min(1, 'Debe incluir al menos un miembro de la familia')
    .max(10, 'No puede incluir más de 10 miembros de la familia'),

  hasWorkers: Yup.boolean().required('Debe especificar si tiene trabajadores').defined(),
  totalWorkers: Yup.number().when('hasWorkers', {
    is: true,
    then: (schema) => schema
      .required('El número total de trabajadores es requerido cuando hasWorkers es true')
      .min(1, 'Debe tener al menos un trabajador'),
    otherwise: (schema) => schema.notRequired(),
  }),
  menWorkers: Yup.number().min(0, 'El número de trabajadores hombres no puede ser negativo'),
  womanWorkers: Yup.number().min(0, 'El número de trabajadoras mujeres no puede ser negativo'),
  over18Workers: Yup.number().min(0, 'El número de trabajadores mayores de 18 no puede ser negativo'),
  under18Workers: Yup.number().min(0, 'El número de trabajadores menores de 18 no puede ser negativo'),
  minorWorkersOcuppacion: Yup.string(),
  hasPregnandWorkers: Yup.boolean().required('Debe especificar si tiene trabajadoras embarazadas').defined(),
  pregnandWorkers: Yup.number().when('hasPregnandWorkers', {
    is: true,
    then: (schema) => schema
      .required('El número de trabajadoras embarazadas es requerido cuando hasPregnandWorkers es true')
      .min(1, 'Debe tener al menos una trabajadora embarazada'),
    otherwise: (schema) => schema.notRequired(),
  }),
  pregnandWorkersOcuppacion: Yup.string().max(200, 'La descripción de la ocupación no puede exceder 200 caracteres'),
}).test('worker-validations', 'Validaciones de trabajadores', function(obj){
  if (obj.hasWorkers) {
    const errors: Yup.ValidationError[] = [];
    const totalWorkers = obj.totalWorkers || 0;
    const menWorkers = obj.menWorkers || 0;
    const womanWorkers = obj.womanWorkers || 0;
    const over18Workers = obj.over18Workers || 0;
    const under18Workers = obj.under18Workers || 0;
    const pregnandWorkers = obj.pregnandWorkers || 0;

    if (menWorkers + womanWorkers !== totalWorkers) {
      errors.push(new Yup.ValidationError(
        'La suma de trabajadores hombres y mujeres debe ser igual al total de trabajadores',
        obj.totalWorkers,
        'totalWorkers'
      ));
    }

    if (over18Workers + under18Workers !== totalWorkers) {
      errors.push(new Yup.ValidationError(
        'La suma de trabajadores mayores y menores de 18 años debe ser igual al total de trabajadores',
        obj.totalWorkers,
        'totalWorkers'
      ));
    }

    if (pregnandWorkers > womanWorkers) {
      errors.push(new Yup.ValidationError(
        'El número de trabajadoras embarazadas no puede ser mayor al número de trabajadoras mujeres',
        obj.pregnandWorkers,
        'pregnandWorkers'
      ));
    }

    if (under18Workers > 0 && !obj.minorWorkersOcuppacion) {
      errors.push(new Yup.ValidationError(
        'La ocupación de trabajadores menores es requerida cuando hay trabajadores menores de 18 años',
        obj.minorWorkersOcuppacion,
        'minorWorkersOcuppacion'
      ));
    }

    if (pregnandWorkers > 0 && !obj.pregnandWorkersOcuppacion) {
      errors.push(new Yup.ValidationError(
        'La ocupación de trabajadoras embarazadas es requerida cuando hay trabajadoras embarazadas',
        obj.pregnandWorkersOcuppacion,
        'pregnandWorkersOcuppacion'
      ));
    }

    if (errors.length > 0) {
      return new Yup.ValidationError(errors);
    }
  }
  return true;

});

export type PersonSchema = Yup.InferType<typeof personSchema>;