import React from "react";
import { useForm } from "react-hook-form";
import "./Paciente.css"

function RegistroPaciente() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const tipoDocumentoSeleccionado = watch("tipo_doc")

  const onSubmit = (data) => {
    console.log(data);
  };

  const validateTexto = (value) => {
    if (!value) return "Este campo es obligatorio";
    return true;
  };

  const validateNombres = (value) => {
    if (!value) return "Nombres requerido";
    if (value.length < 3) return "Los Nombres no deben ser menor a 2 caracteres";
    if (value.length > 15) return "Nombres no debe ser mayor a 4 caracteres";
    return true;
  };

  const validateApellidos = (value) => {
    if (!value) return "Apellidos requeridos";
    if (value.length < 3) return "Los apellidos no deben ser menor a 2 caracteres";
    if (value.length > 15) return "Apellidos no debe ser mayor a 4 caracteres";
    return true;
  };

  const validateNumeroDocumento = (value, tipoDoc) => {
      value = value.trim().toUpperCase();

      // Validación para cédula de ciudadanía y Cedula de extranjeria
      if (tipoDoc === "C.C" || tipoDoc ==="C.E") {
          if (!/^\d{10}$/.test(value)) {
          return "La cedula debe tener 10 dígitos numéricos.";
          }
      }
      // Validación para Pasaporte
      else if (tipoDoc === "P.A") {
          if (!/^\d{9}$/.test(value)) {
          return "El pasaporte debe tener 9 dígitos numéricos.";
          }
      }
      else {
          return "Tipo de documento no válido.";
      }
      return true;
  };

  const validateTelefono = (value) => {
    if (!value) return "El numero de celular es obligatorio";
    if (!/^\d{10}$/.test(value)) return "Debe contener exactamente 10 dígitos numéricos";
    return true;
  };

  const validateCorreo = (value) => {
    if (!value) return "El correo es obligatorio";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return "Formato de correo inválido";
    return true;
  };

  const validateSelect = (value) => {
    return value ? true : "Selecciona una opción";
  };

  const validateFechaNacimiento = (value) => {
    if (!value) return "La fecha de nacimiento es requerida";
    const hoy = new Date();
    const fechaIngresada = new Date(value);
    return fechaIngresada <= hoy || "La fecha no puede ser futura";
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="formPaciente">
        <h1>Registro de Paciente</h1>

        <label>Nombres</label>
        <input
          type="text"
          {...register("nombres", { validate: validateNombres })}
        />
        {errors.nombres && <span>{errors.nombres.message}</span>}

        <label>Apellidos</label>
        <input
          type="text"
          {...register("apellidos", { validate: validateApellidos })}
        />
        {errors.apellidos && <span>{errors.apellidos.message}</span>}

        <label>Tipo de documento</label>
        <select {...register("tipo_doc", { validate: validateSelect})}>
          <option value="">Seleccione una opción</option>
          <option value="C.C">Cédula de ciudadanía</option>
          <option value="C.E">Cédula de extranjería</option>
          <option value="P.A">Pasaporte</option>
        </select>
        {errors.tipo_doc && <span>{errors.tipo_doc.message}</span>}

        <label>Número de documento</label>
        <input type="text"
          {...register("num_doc",
          {validate: (value) => validateNumeroDocumento(value, tipoDocumentoSeleccionado)})} />
          {errors.num_doc && <span>{errors.num_doc.message}</span>}

        <label>Fecha de nacimiento</label>
        <input
          type="date"
          {...register("fechaNacimiento", { validate: validateFechaNacimiento })}
        />
        {errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>}

        <label>Género</label>
        <select {...register("genero", { validate: validateSelect })}>
          <option value="">Seleccione una opción</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.genero && <span>{errors.genero.message}</span>}

        <label>Teléfono</label>
        <input
          type="text"
          {...register("telefono", { validate: validateTelefono })}
        />
        {errors.telefono && <span>{errors.telefono.message}</span>}

        <label>Correo electrónico</label>
        <input
          type="email"
          {...register("correo", { validate: validateCorreo })}
        />
        {errors.correo && <span>{errors.correo.message}</span>}

        <label>Dirección</label>
        <input
          type="text"
          {...register("direccion", { validate: validateTexto })}
        />
        {errors.direccion && <span>{errors.direccion.message}</span>}

        <label>Ciudad</label>
        <input
          type="text"
          {...register("ciudad", { validate: validateTexto })}
        />
        {errors.ciudad && <span>{errors.ciudad.message}</span>}

        <label>Departamento</label>
        <input
          type="text"
          {...register("departamento", { validate: validateTexto })}
        />
        {errors.departamento && <span>{errors.departamento.message}</span>}

        <label>EPS</label>
        <input
          type="text"
          {...register("eps", { validate: validateTexto })}
        />
        {errors.eps && <span>{errors.eps.message}</span>}

        <label>Grupo sanguíneo</label>
        <select {...register("grupoSanguineo", { validate: validateSelect})}>
          <option value="">Seleccione una opción</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        {errors.grupoSanguineo && <span>{errors.grupoSanguineo.message}</span>}

        <label>Contacto de emergencia</label>
        <input
          type="text"
          {...register("contactoEmergencia", { validate: validateTelefono })}
        />
        {errors.contactoEmergencia && <span>{errors.contactoEmergencia.message}</span>}

        <label>Parentesco del contacto de emergencia</label>
        <select {...register("parentescoEmergencia", { validate: validateSelect })}>
          <option value="">Seleccione una opción</option>
          <option value="Madre">Madre</option>
          <option value="Padre">Padre</option>
          <option value="Hermano/a">Hermano/a</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.parentescoEmergencia && <span>{errors.parentescoEmergencia.message}</span>}

        <label>Ocupación</label>
        <input
          type="text"
          {...register("ocupacion", { validate: validateTexto })}
        />
        {errors.ocupacion && <span>{errors.ocupacion.message}</span>}

        <label>Estado civil</label>
        <select {...register("estadoCivil", { validate:validateSelect })}>
          <option value="">Seleccione una opción</option>
          <option value="Soltero">Soltero</option>
          <option value="Casado">Casado</option>
          <option value="Unión libre">Unión libre</option>
          <option value="Divorciado">Divorciado</option>
        </select>
        {errors.estadoCivil && <span>{errors.estadoCivil.message}</span>}

        <label>Discapacidad</label>
        <input
          type="text"
          {...register("discapacidad", { validate: validateTexto })}
        />
        {errors.discapacidad && <span>{errors.discapacidad.message}</span>}

        <label>Alergias conocidas</label>
        <input
          type="text"
          {...register("alergias", { validate: validateTexto })}
        />
        {errors.alergias && <span>{errors.alergias.message}</span>}

        <label>¿Cómo se enteró de nuestra consulta o clínica?</label>
        <input
          type="text"
          {...register("fuenteConsulta", { validate: validateTexto })}
        />
        {errors.fuenteConsulta && <span>{errors.fuenteConsulta.message}</span>}

        <button type="submit">Registrar Paciente</button>
      </form>
    </div>
  );
}

export default RegistroPaciente;
