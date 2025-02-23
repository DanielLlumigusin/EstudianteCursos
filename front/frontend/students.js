document.addEventListener("DOMContentLoaded", () => {
    fetchStudents();
  
    document.getElementById("add-student-btn").addEventListener("click", () => {
      document.getElementById("student-id").value = "";
      openModal("student-modal", "Crear Estudiante");
    });
  
    document.getElementById("student-form").addEventListener("submit", handleStudentFormSubmit);
  });
  
  async function handleStudentFormSubmit(event) {
    event.preventDefault();
    const id = document.getElementById("student-id").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
  
    const url = id 
      ? `http://4.236.176.137:8080/api/estudiantes/${id}` 
      : "http://4.236.176.137:8080/api/estudiantes";
    const method = id ? "PUT" : "POST";
  
    try {
      await fetchRequest(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido })
      });
      closeModal("student-modal");
      fetchStudents();
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: id ? "Estudiante actualizado" : "Estudiante creado"
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al guardar el estudiante"
      });
    }
  }
  
  async function fetchStudents() {
    try {
      const students = await fetchRequest("http://4.236.176.137:8080/api/estudiantes");
      const tableBody = document.getElementById("students-table");
      if (students.length > 0) {
        tableBody.innerHTML = students.map(student => `
          <tr>
            <td>${student.id}</td>
            <td>${student.nombre}</td>
            <td>${student.apellido}</td>
            <td>
              <button class="btn-secondary" onclick="editStudent(${student.id})">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn-danger" onclick="deleteStudent(${student.id})">
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </td>
          </tr>
        `).join("");
      } else {
        tableBody.innerHTML = `<tr><td colspan="4">No hay estudiantes registrados</td></tr>`;
      }
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  }
  
  async function editStudent(id) {
    try {
      const student = await fetchRequest(`http://4.236.176.137:8080/api/estudiantes/${id}`);
      if (student) {
        document.getElementById("student-id").value = student.id;
        document.getElementById("nombre").value = student.nombre;
        document.getElementById("apellido").value = student.apellido;
        openModal("student-modal", "Editar Estudiante");
      }
    } catch (error) {
      console.error("Error al editar estudiante:", error);
    }
  }
  
  async function deleteStudent(id) {
    const confirmResult = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#dc3545"
    });
    if (confirmResult.isConfirmed) {
      try {
        await fetchRequest(`http://4.236.176.137:8080/api/estudiantes/${id}`, { method: "DELETE" });
        fetchStudents();
        Swal.fire("Eliminado", "El estudiante ha sido eliminado", "success");
      } catch (error) {
        Swal.fire("Error", "Hubo un problema al eliminar el estudiante", "error");
      }
    }
  }

  async function fetchStudents() {
    try {
      const students = await fetchRequest("http://4.236.176.137:8080/api/estudiantes");
      const tableBody = document.getElementById("students-table");
      if (students.length > 0) {
        tableBody.innerHTML = students.map(student => `
          <tr>
            <td>${student.id}</td>
            <td>${student.nombre}</td>
            <td>${student.apellido}</td>
            <td>
              <button class="btn-secondary" onclick="editStudent(${student.id})">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn-danger" onclick="deleteStudent(${student.id})">
                <i class="fas fa-trash"></i> Eliminar
              </button>
              <button class="btn-primary" onclick="openEnrollModal(${student.id})">
                <i class="fas fa-book"></i> Inscribir
              </button>
            </td>
          </tr>
        `).join("");
      } else {
        tableBody.innerHTML = `<tr><td colspan="4">No hay estudiantes registrados</td></tr>`;
      }
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  }
  