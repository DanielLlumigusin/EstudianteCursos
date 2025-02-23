document.addEventListener("DOMContentLoaded", () => {
    const enrollForm = document.getElementById("enroll-form");
    enrollForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const studentId = enrollForm.dataset.studentId;
      const cursoId = document.getElementById("curso-id").value;
  
      try {
        await fetchRequest(`http://4.236.176.137:8081/api/curso-estudiante/${cursoId}/estudiantes/${studentId}`, {
          method: "POST"
        });
        Swal.fire("Éxito", "Estudiante inscrito en el curso", "success");
        closeModal("enroll-modal");
      } catch (error) {
        Swal.fire("Error", "Hubo un problema al inscribir al estudiante", "error");
      }
    });
  });
  
  async function openEnrollModal(studentId) {
    const select = document.getElementById("curso-id");
    select.innerHTML = `<option value="">Cargando cursos...</option>`;
    try {
      const cursos = await fetchRequest("http://4.236.176.137:8081/api/cursos");
      select.innerHTML = "";
      cursos.forEach(({ id, nombre }) => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = nombre;
        select.appendChild(option);
      });
      // Asignamos el id del estudiante al dataset del formulario
      document.getElementById("enroll-form").dataset.studentId = studentId;
      openModal("enroll-modal", "Inscribir en Curso");
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  }
  