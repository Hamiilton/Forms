import "./Medico.css";
import { useForm } from "react-hook-form";

function Medico() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const tipoDocumentoSeleccionado = watch("tipo_doc");

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

    const validateFechaNacimiento = (value) => {
        if (!value) return "La fecha de nacimiento es obligatoria";
        const hoy = new Date();
        const fechaIngresada = new Date(value);
        return fechaIngresada <= hoy || "La fecha no puede ser futura";
    };

    const validateSelect = (value) => {
        return value ? true : "Selecciona una opción";
    };

    const validateTelefono = (value) => {
        if (!value) return "El teléfono es obligatorio";
        if (!/^\d{10}$/.test(value)) return "Debe contener exactamente 10 dígitos numéricos";
        return true;
    };

    const validateCorreo = (value) => {
        if (!value) return "El correo es obligatorio";
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) return "Formato de correo inválido";
        return true;
    };

    const validateUniversidad = (value) => {
        if (!value) return "El nombre de la universidad es obligatorio";
        if (value.length < 3) return "Debe tener al menos 3 caracteres";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(value)) {
            return "Solo se permiten letras y espacios";
        }
        return true;
    };

    const validateTarjetaProfesional = (value) => {
        if (!value) return "El número de tarjeta profesional es obligatorio";
        if (!/^\d+$/.test(value)) return "Solo se permiten números";
        if (value.length < 6) return "Debe tener al menos 6 dígitos";
        if (value.length > 15) return "No debe superar los 15 dígitos";
        return true;
    };

    const validateAñosExperiencia = (value) => {
        if (value === "") return "Este campo es obligatorio";
        const num = Number(value);
        if (isNaN(num)) return "Debe ser un número válido";
        if (num < 0) return "No se permiten valores negativos";
        return true;
    };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="formMedico">
        <h1>REGISTRO PARA MÉDICOS</h1>

        <h1>Datos personales</h1>

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

        <label>Tipos de documento</label>
        <select {...register("tipo_doc",{validate: validateSelect})}>
          <option value="">Seleccione una opción</option>
          <option value="C.C">Cédula de ciudadanía</option>
          <option value="C.E">Cédula de extranjería</option>
          <option value="P.A">Pasaporte</option>
        </select>
        {errors.tipo_doc && <span>{errors.tipo_doc.message}</span>}

        <label>Numero de Documento</label>
        <input type="text" {...register("num_doc", 
        {validate: (value) => validateNumeroDocumento(value, tipoDocumentoSeleccionado)})} />
        {errors.num_doc && <span>{errors.num_doc.message}</span>}

        <label>Fecha de nacimiento</label>
        <input
          type="date"
          {...register("fechaNacimiento", { validate: validateFechaNacimiento })}
        />
        {errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>}

        <label>Género</label>
        <select {...register("genero", {validate: validateSelect})}>
          <option value="">Seleccione una opción</option>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
          <option value="no_binario">No binario</option>
        </select>
        {errors.genero && <span>{errors.genero.message}</span>}

        <label>Tipo de vía</label>
        <select {...register("tipoVia", {validate: validateSelect})}>
          <option value="">Seleccione una opción</option>
          <option value="calle">Calle</option>
          <option value="carrera">Carrera</option>
          <option value="avenida">Avenida</option>
          <option value="transversal">Transversal</option>
          <option value="diagonal">Diagonal</option>
        </select>
        {errors.tipoVia && <span>{errors.tipoVia.message}</span>}

        <label>Número</label>
        <input type="text" {...register("numeroVia")} placeholder="Ej: 123" />

        <label>Complemento</label>
        <input type="text" {...register("complemento")} placeholder="Ej: casa 220, Etapa 3" />

        <label>Teléfono</label>
        <input type="text" {...register("telefono", {validate: validateTelefono})} />
        {errors.telefono && <span>{errors.telefono.message}</span>}

        <label>Contacto de emergencia</label>
        <input type="text" {...register("numero_em", {validate: validateTelefono})} />
        {errors.numero_em && <span>{errors.numero_em.message}</span>}

        <label>Parentezco del contacto de emergencia</label>
        <select {...register("parentezco", {validate: validateSelect})}>
          <option value="">Seleccione una opción</option>
          <option value="Categoría 1">Mamá</option>
          <option value="Categoría 2">Papá</option>
          <option value="Categoría 3">Hermano/a</option>
          <option value="Categoría 3">Otro</option>
        </select>
        {errors.parentezco && <span>{errors.parentezco.message}</span>}

        <label>Correo</label>
        <input type="email" {...register("correo" , {validate: validateCorreo})} />
        {errors.correo && <span>{errors.correo.message}</span>}

        <h1>Información Académica</h1>

        <label>Universidad de formación</label>
        <input type="text" {...register("universidad", {validate: validateUniversidad})} />
        {errors.universidad && <span>{errors.universidad.message}</span>}


        <label>Idiomas que maneja</label>
        <select {...register("idioma", {validate: validateSelect})}>
          <option value="">Seleccione una opción</option>
          <option value="ingles">Inglés</option>
          <option value="portugues">Portugués</option>
          <option value="frances">Francés</option>
        </select>
        {errors.idioma && <span>{errors.idioma.message }</span>}

        <label>Hoja de vida (subir archivo)</label>
        <input type="file" {...register("hojaVida")} accept=".pdf" />

        <label>Certificaciones (subir archivo)</label>
        <input type="file" {...register("certificados")} accept=".pdf,.doc,.docx" />

        <h1>Datos laborales</h1>

        <label>Especialidad</label>
        <select
          {...register("especialidad", {
            validate: validateSelect,
          })}
        >
          <option value="">Seleccione una opción</option>
          <option value="Medicina general">Medicina general</option>
          <option value="Pediatría">Pediatría</option>
          <option value="Cardiología">Cardiología</option>
          <option value="Ginecología">Ginecología</option>
          <option value="Neurología">Neurología</option>
        </select>
        {errors.especialidad && <span>{errors.especialidad.message}</span>}

        <label>Número de Tarjeta profesional</label>
        <input type="text" {...register("tarjeta_profesional", {validate: validateTarjetaProfesional})} />
        {errors.tarjeta_profesional && <span>{errors.tarjeta_profesional.message}</span>}

        <label>Años de experiencia</label>
        <input
          type="number"
          min={0}
          max={10}
          {...register("añosExperiencia", {
            validate: validateAñosExperiencia,
          })}
        />
        {errors.añosExperiencia && <span>{errors.añosExperiencia.message}</span>}


        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Medico;
