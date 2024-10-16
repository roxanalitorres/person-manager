import React, {useEffect} from 'react';
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personSchema, PersonSchema } from '@/schemas/personSchema';
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Select, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, SelectGroup } from "@/app/components/ui/select"
import { Label } from "@/app/components/ui/label"
import {PlusCircle, X} from "lucide-react";
import {Textarea} from "@/app/components/ui/textarea"


type PersonFormProps = {
  onSubmit: (data: PersonSchema) => void;
  initialData?: PersonSchema | null;
};

export const PersonForm: React.FC<PersonFormProps> = ({ onSubmit, initialData }) => {
  const { control, handleSubmit, watch, reset, formState: { errors } } = useForm<PersonSchema>({
    resolver: yupResolver(personSchema),
    mode: 'onChange',
    defaultValues: {
      ...initialData,
      hasFarm: initialData?.hasFarm ?? false,
      family: initialData?.family || [{ name: '', lastName: '', ci: '' }],
      hasWorkers: initialData?.hasWorkers ?? false,
      hasPregnandWorkers: initialData?.hasPregnandWorkers ?? false,
      hasRuc: initialData?.hasRuc ?? false,
    },
  });

  const hasRuc = watch('hasRuc');
  const hasFarm = watch('hasFarm');
  const hasWorkers = watch('hasWorkers');
  const hasPregnandWorkers = watch('hasPregnandWorkers');
  const crops = watch('crops');

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const { fields: cropFields, append: appendCrop, remove: removeCrop } = useFieldArray({
    control,
    name: "crops"
  });

  const { fields: familyFields, append: appendFamilyMember, remove: removeFamilyMember } = useFieldArray({
    control,
    name: "family"
  });

  useEffect(() => {
    if (hasFarm && (!crops || crops.length === 0)) {
      appendCrop('');
    }
  }, [hasFarm, crops, appendCrop]);


  const onSubmitWrapper = (data: PersonSchema) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className="space-y-4">
      <Controller
        name="name"
        control={control}
        render={({field}) => (
          <div>
            <label htmlFor="name">Nombre</label>
            <Input
              {...field}
              id="name"
              placeholder="Nombre"
              value={field.value ?? ''}
            />
            {errors.name && <p className="text-red-500">{errors.name.message as React.ReactNode}</p>}
          </div>
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({field}) => (
          <div>
            <label htmlFor="lastName">Apellido</label>
            <Input {...field} id="lastName" placeholder="Apellido"/>
            {errors.lastName && <p className="text-red-500">{errors.lastName.message as React.ReactNode}</p>}
          </div>
        )}
      />

      <Controller
        name="ci"
        control={control}
        render={({field}) => (
          <div>
            <label htmlFor="ci">Cédula de Identidad (CI)</label>
            <Input {...field} id="ci" placeholder="CI" value={field.value ?? ''}/>
            {errors.ci && <p className="text-red-500">{errors.ci.message as React.ReactNode}</p>}
          </div>
        )}
      />

      <Controller
        name="dateOfBirth"
        control={control}
        render={({field}) => (
          <div>
            <label htmlFor="dateOfBirth">Fecha de Nacimiento</label>
            <Input
              {...field}
              id="dateOfBirth"
              type="date"
              value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
              onChange={(e) => field.onChange(new Date(e.target.value))}
            />
            {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message as React.ReactNode}</p>}
          </div>
        )}
      />

      <Controller
        name="hasRuc"
        control={control}
        render={({field}) => (
          <div className="flex items-center space-x-2">
            <label htmlFor="hasRuc">¿Tiene RUC?</label>
            <Checkbox
              id="hasRuc"
              checked={field.value ?? false}
              onCheckedChange={(value) => field.onChange(value ?? false)}/>
          </div>
        )}
      />
      <p className="text-sm text-gray-500">Marque la casilla si la respuesta es sí.</p>

      {hasRuc && (
        <Controller
          name="rucNumber"
          control={control}
          render={({field}) => (
            <div>
              <label htmlFor="rucNumber">Número de RUC</label>
              <Input {...field} id="rucNumber" placeholder="Ingrese el RUC (13 dígitos)"/>
              {errors.rucNumber && <p className="text-red-500">{errors.rucNumber.message as React.ReactNode}</p>}
            </div>
          )}
        />
      )}

      <Controller
        name="gender"
        control={control}
        render={({field}) => (
          <div>
            <label htmlFor="gender">Género</label>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccione un género"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Femenino</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-red-500">{errors.gender.message as React.ReactNode}</p>}
          </div>
        )}
      />

      <Controller
        name="hasFarm"
        control={control}
        render={({field}) => (
          <div className="flex items-center space-x-2">
            <label htmlFor="hasFarm">¿Tiene Granja?</label>
            <Checkbox
              id="hasFarm"
              checked={field.value ?? false}
              onCheckedChange={(value) => field.onChange(value ?? false)}/>
          </div>
        )}
      />
      <p className="text-sm text-gray-500">Marque la casilla si la respuesta es sí.</p>

      {hasFarm && (
        <>
          <Controller
            name="farmHa"
            control={control}
            render={({field}) => (
              <div>
                <label htmlFor="farmHa">Tamaño de la Granja (Ha)</label>
                <Input {...field} id="farmHa" type="number" step="0.1"/>
                {errors.farmHa && <p className="text-red-500">{errors.farmHa.message as React.ReactNode}</p>}
              </div>
            )}
          />

          <Controller
            name="farmName"
            control={control}
            render={({field}) => (
              <div>
                <label htmlFor="farmName">Nombre de la Granja</label>
                <Input {...field} id="farmName" placeholder="Nombre de la Granja"/>
                {errors.farmName && <p className="text-red-500">{errors.farmName.message as React.ReactNode}</p>}
              </div>
            )}
          />

          <div>
            <label>Cultivos </label>
            {cropFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mt-2">
                <Controller
                  name={`crops.${index}`}
                  control={control}
                  render={({field}) => (
                    <Input {...field} placeholder="Nombre del cultivo"/>
                  )}
                />
                {cropFields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeCrop(index)}
                  >
                    <X className="h-4 w-4"/>
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => appendCrop('')}
            >
              <PlusCircle className="h-4 w-4 mr-2"/>
              Agregar Cultivo
            </Button>
            {errors.crops && (
              <p className="text-red-500 mt-1">
                {Array.isArray(errors.crops)
                  ? errors.crops.map((error, index) => (
                    <span key={index}>{error.message}<br/></span>
                  ))
                  : errors.crops.message as React.ReactNode}
              </p>
            )}
          </div>
        </>
      )}

      <div>
        <label>Familia</label>
        {familyFields.map((field, index) => (
          <div key={field.id} className="space-y-2 mt-2 p-4 border rounded">
            <Controller
              name={`family.${index}.name`}
              control={control}
              render={({field}) => (
                <div>
                  <Label htmlFor={`family.${index}.name`}>Nombre</Label>
                  <Input {...field} id={`family.${index}.name`} placeholder="Nombre"/>
                  {errors.family && Array.isArray(errors.family) && errors.family[index]?.name && (
                    <p className="text-red-500">
                      {errors.family[index]?.name?.message as React.ReactNode}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`family.${index}.lastName`}
              control={control}
              render={({field}) => (
                <div>
                  <Label htmlFor={`family.${index}.lastName`}>Apellido</Label>
                  <Input {...field} id={`family.${index}.lastName`} placeholder="Apellido"/>
                  {errors.family && Array.isArray(errors.family) && errors.family?.[index]?.lastName &&
                    <p className="text-red-500">{errors.family[index].lastName?.message}</p>}
                </div>
              )}
            />
            <Controller
              name={`family.${index}.ci`}
              control={control}
              render={({field}) => (
                <div>
                  <Label htmlFor={`family.${index}.ci`}>CI</Label>
                  <Input {...field} id={`family.${index}.ci`} placeholder="CI"/>
                  {errors.family && Array.isArray(errors.family) &&
                    errors.family?.[index]?.ci && <p className="text-red-500">{errors.family[index].ci?.message}</p>}
                </div>
              )}
            />
            {familyFields.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeFamilyMember(index)}
              >
                <X className="h-4 w-4 mr-2"/>
                Eliminar Miembro
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => appendFamilyMember({name: '', lastName: '', ci: ''})}
        >
          <PlusCircle className="h-4 w-4 mr-2"/>
          Agregar Miembro de Familia
        </Button>
        {errors.family && <p className="text-red-500 mt-1">{errors.family.message as React.ReactNode}</p>}
      </div>

      <Controller
        name="hasWorkers"
        control={control}
        render={({field}) => (
          <div className="flex items-center space-x-2">
            <label htmlFor="hasWorkers">¿Tiene Trabajadores?</label>
            <Checkbox
              id="hasWorkers"
              checked={field.value ?? false}
              onCheckedChange={(value) => field.onChange(value ?? false)}/>
          </div>
        )}
      />
      <p className="text-sm text-gray-500">Marque la casilla si la respuesta es sí.</p>

      {hasWorkers && (
        <>
          <Controller
            name="totalWorkers"
            control={control}
            render={({field}) => (
              <div>
                <Label htmlFor="totalWorkers">Total de Trabajadores</Label>
                <Input {...field} id="totalWorkers" type="number"/>
                {errors.totalWorkers &&
                  <p className="text-red-500">{errors.totalWorkers.message as React.ReactNode}</p>}
              </div>
            )}
          />

          <Controller
            name="menWorkers"
            control={control}
            render={({field}) => (
              <div>
                <Label htmlFor="menWorkers">Trabajadores Hombres</Label>
                <Input {...field} id="menWorkers" type="number"/>
                {errors.menWorkers && <p className="text-red-500">{errors.menWorkers.message as React.ReactNode}</p>}
              </div>
            )}
          />

          <Controller
            name="womanWorkers"
            control={control}
            render={({field}) => (
              <div>
                <Label htmlFor="womanWorkers">Trabajadoras Mujeres</Label>
                <Input {...field} id="womanWorkers" type="number"/>
                {errors.womanWorkers &&
                  <p className="text-red-500">{errors.womanWorkers.message as React.ReactNode}</p>}
              </div>
            )}
          />

          <Controller
            name="over18Workers"
            control={control}
            render={({field}) => (
              <div>
                <Label htmlFor="over18Workers">Trabajadores Mayores de 18</Label>
                <Input {...field} id="over18Workers" type="number"/>
                {errors.over18Workers &&
                  <p className="text-red-500">{errors.over18Workers.message as React.ReactNode}</p>}
              </div>
            )}
          />

          <Controller
            name="under18Workers"
            control={control}
            render={({field}) => (
              <div>
                <Label htmlFor="under18Workers">Trabajadores Menores de 18</Label>
                <Input {...field} id="under18Workers" type="number"/>
                {errors.under18Workers &&
                  <p className="text-red-500">{errors.under18Workers.message as React.ReactNode}</p>}
              </div>
            )}
          />

          <Controller
            name="minorWorkersOcuppacion"
            control={control}
            render={({field}) => (
              <div>
                <Label htmlFor="minorWorkersOcuppacion">Ocupación de Trabajadores Menores</Label>
                <Textarea {...field} id="minorWorkersOcuppacion"/>
                {errors.minorWorkersOcuppacion && <p className="text-red-500">
                  {errors.minorWorkersOcuppacion.message as React.ReactNode}</p>}
              </div>
            )}
          />

          <Controller
            name="hasPregnandWorkers"
            control={control}
            render={({field}) => (
              <div className="flex items-center space-x-2">
                <Label htmlFor="hasPregnandWorkers">¿Tiene Trabajadoras Embarazadas?</Label>
                <Checkbox
                  id="hasPregnandWorkers"
                  checked={field.value ?? false}
                  onCheckedChange={(value) => field.onChange(value ?? false)}
                />
              </div>
            )}
          />

          {hasPregnandWorkers && (
            <>
              <Controller
                name="pregnandWorkers"
                control={control}
                render={({field}) => (
                  <div>
                    <Label htmlFor="pregnandWorkers">Número de Trabajadoras Embarazadas</Label>
                    <Input {...field} id="pregnandWorkers" type="number"/>
                    {errors.pregnandWorkers && <p className="text-red-500">
                      {errors.pregnandWorkers.message as React.ReactNode}</p>}
                  </div>
                )}
              />

              <Controller
                name="pregnandWorkersOcuppacion"
                control={control}
                render={({field}) => (
                  <div>
                    <Label htmlFor="pregnandWorkersOcuppacion">Ocupación de Trabajadoras Embarazadas</Label>
                    <Textarea {...field} id="pregnandWorkersOcuppacion"/>
                    {errors.pregnandWorkersOcuppacion && <p className="text-red-500">
                      {errors.pregnandWorkersOcuppacion.message as React.ReactNode}</p>}
                  </div>
                )}
              />
            </>
          )}
        </>
      )}
      <Button type="submit">
        {initialData ? 'Actualizar' : 'Crear'}
      </Button>
    </form>
  );
};