import { useForm } from "react-hook-form";
import './Hclinica.css'
function HistoriaClinica() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const validateTexto = (value) =>
    value?.trim().length >= 3 || "Debe tener al menos 3 letras";

  const validateFechaHoy = (value) => {
    const hoy = new Date().toISOString().split("T")[0];
    return value <= hoy || "La fecha no puede ser futura";
  };

  const validateCodigo = (value) =>
    /^[A-Za-z0-9]{4,}$/.test(value) || "Código inválido (mínimo 4 caracteres)";



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formHistoria">
      <h1>Registro de Historia Clínica</h1>

      <label>Fecha de consulta</label>
      <input type="date" {...register("fechaConsulta", { validate: validateFechaHoy })} />
      {errors.fechaConsulta && <span>{errors.fechaConsulta.message}</span>}

      <label>Motivo de consulta</label>
      <textarea {...register("motivoConsulta", { validate: validateTexto })} />
      {errors.motivoConsulta && <span>{errors.motivoConsulta.message}</span>}

      <label>Enfermedad actual</label>
      <textarea {...register("enfermedadActual", { validate: validateTexto })} />
      {errors.enfermedadActual && <span>{errors.enfermedadActual.message}</span>}

      <label>Antecedentes personales</label>
      <textarea {...register("antecedentesPersonales", { validate: validateTexto })} />
      {errors.antecedentesPersonales && <span>{errors.antecedentesPersonales.message}</span>}

      <label>Antecedentes familiares</label>
      <textarea {...register("antecedentesFamiliares", { validate: validateTexto })} />
      {errors.antecedentesFamiliares && <span>{errors.antecedentesFamiliares.message}</span>}

      <label>Medicamentos actuales</label>
      <textarea {...register("medicamentosActuales")} />

      <label>Alergias</label>
      <textarea {...register("alergias")} />

      <label>Hábitos nocivos</label>
      <textarea {...register("habitosNocivos")} />

      <label>Signos vitales</label>
      <input type="text" placeholder="Ej: Tensión 120/80" {...register("signosVitales")} />

      <label>Examen físico</label>
      <textarea {...register("examenFisico")} />

      <label>Diagnóstico</label>
      <textarea {...register("diagnostico", { validate: validateTexto })} />
      {errors.diagnostico && <span>{errors.diagnostico.message}</span>}

      <label>Tratamiento</label>
      <textarea {...register("tratamiento")} />

      <label>Recomendaciones</label>
      <textarea {...register("recomendaciones")} />

      <label>Próxima cita</label>
      <input type="date" {...register("proximaCita")} />

      <label>Especialidad médica</label>
      <select {...register("especialidad", { validate: validateTexto })}>
        <option value="">Seleccione una</option>
        <option value="general">Medicina general</option>
        <option value="pediatria">Pediatría</option>
        <option value="cardiologia">Cardiología</option>
        <option value="dermatologia">Dermatología</option>
      </select>
      {errors.especialidad && <span>{errors.especialidad.message}</span>}

      <label>Médico tratante</label>
      <input type="text" {...register("medicoTratante", { validate: validateTexto })} />
      {errors.medicoTratante && <span>{errors.medicoTratante.message}</span>}

      <label>Código del médico</label>
      <input type="text" {...register("codigoMedico", { validate: validateCodigo })} />
      {errors.codigoMedico && <span>{errors.codigoMedico.message}</span>}

      <label>Firma del médico (nombre completo)</label>
      <input type="text" {...register("firmaMedico", { validate: validateTexto })} />
      {errors.firmaMedico && <span>{errors.firmaMedico.message}</span>}

      <label>Responsable de ingreso</label>
      <input type="text" {...register("responsableIngreso", { validate: validateTexto })} />
      {errors.responsableIngreso && <span>{errors.responsableIngreso.message}</span>}

      <label>Relación del responsable</label>
      <input type="text" {...register("relacionResponsable", { validate: validateTexto })} />
      {errors.relacionResponsable && <span>{errors.relacionResponsable.message}</span>}

      <button type="submit">Guardar Historia</button>
    </form>
  );
}

export default HistoriaClinica;
