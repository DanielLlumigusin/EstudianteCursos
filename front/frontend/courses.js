document.addEventListener("DOMContentLoaded", () => {
    fetchCourses();

    document.getElementById("add-course-btn").addEventListener("click", () => {
        document.getElementById("course-id").value = ""; // Limpiar el ID para crear un nuevo curso
        openModal("course-modal", "Crear Curso");
    });

    document.getElementById("course-form").addEventListener("submit", handleCourseFormSubmit);
});

async function openCourseEnrollmentsModal(courseId, courseName) {
    document.getElementById("enrollment-course-name").textContent = courseName;

    // Llamamos a la función que obtiene los estudiantes inscritos en el curso
    await fetchCourseEnrollments(courseId);

    // Abrir el modal
    openModal("enrollments-modal");
}

// Obtener los estudiantes inscritos en un curso
async function fetchCourseEnrollments(courseId) {
    try {
        const estudiantes = await fetchRequest(`http://4.236.176.137:8081/api/curso-estudiante/${courseId}/estudiantes`);
        const tableBody = document.getElementById("enrollments-table");

        if (!tableBody) {
            console.error("Elemento 'enrollments-table' no encontrado");
            return;
        }

        // Limpiar la tabla antes de agregar nuevos datos
        tableBody.innerHTML = "";

        if (Array.isArray(estudiantes) && estudiantes.length > 0) {
            estudiantes.forEach((estudiante) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${estudiante.id}</td>
                    <td>${estudiante.nombre}</td>
                    <td>
                        <button class="btn-danger" onclick="deleteCourseEnrollment(${courseId}, ${estudiante.id})">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3">No hay estudiantes inscritos en este curso.</td>
                </tr>
            `;
        }
    } catch (error) {
        console.error("Error al cargar estudiantes inscritos:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar los estudiantes inscritos",
        });
    }
}

// Manejo del formulario de cursos (crear/editar)
async function handleCourseFormSubmit(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const id = document.getElementById("course-id").value;
    const nombre = document.getElementById("curso-nombre").value;
    const nrc = document.getElementById("curso-nrc").value;
    const creditos = document.getElementById("curso-creditos").value;

    // Validar que los campos obligatorios estén llenos
    if (!nombre || !nrc || !creditos) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Todos los campos son obligatorios",
        });
        return;
    }

    // Determinar la URL y el método HTTP
    const url = id
        ? `http://4.236.176.137:8081/api/cursos/editar-curso/${id}` // Si hay ID, es una actualización (PUT)
        : "http://4.236.176.137:8081/api/cursos"; // Si no hay ID, es una creación (POST)
    const method = id ? "PUT" : "POST";
    try {
        // Enviar la solicitud al servidor
        await fetchRequest(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id, nombre, nrc, creditos }),
        });

        // Cerrar el modal y actualizar la lista de cursos
        closeModal("course-modal");
        fetchCourses();

        // Mostrar mensaje de éxito
        Swal.fire({
            icon: "success",
            title: "Éxito",
            text: id ? "Curso actualizado" : "Curso creado",
        });
    } catch (error) {
        // Mostrar mensaje de error
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al guardar el curso",
        });
    }
}

// Cargar todos los cursos y llenar la tabla correspondiente
async function fetchCourses() {
    try {
        const cursos = await fetchRequest("http://4.236.176.137:8081/api/cursos");
        const tableBody = document.getElementById("courses-table");

        if (!tableBody) {
            console.error("Elemento 'courses-table' no encontrado");
            return;
        }

        // Limpiar la tabla antes de agregar nuevos datos
        tableBody.innerHTML = "";

        if (Array.isArray(cursos) && cursos.length > 0) {
            cursos.forEach((curso) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${curso.id}</td>
                    <td>${curso.nombre}</td>
                    <td>${curso.nrc}</td>
                    <td>${curso.creditos}</td>
                    <td>
                        <button class="btn-secondary" onclick="editCourse(${curso.id})">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn-danger" onclick="deleteCourse(${curso.id})">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                        <button class="btn-primary" onclick="openCourseEnrollmentsModal(${curso.id}, '${curso.nombre}')">
                            <i class="fas fa-users"></i> Ver inscritos
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3">No hay cursos disponibles.</td>
                </tr>
            `;
        }
    } catch (error) {
        console.error("Error al cargar cursos:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar los cursos",
        });
    }
}

// Editar curso: cargar datos en el formulario y abrir el modal
async function editCourse(id) {
    try {
        const curso = await fetchRequest(`http://4.236.176.137:8081/api/cursos/${id}`, null);
        if (curso) {
            document.getElementById("course-id").value = curso.id;
            document.getElementById("curso-nombre").value = curso.nombre;
            document.getElementById("curso-nrc").value = curso.nrc;
            document.getElementById("curso-creditos").value = curso.creditos;

            openModal("course-modal", "Editar Curso");
        } else {
            console.error("No se recibieron datos del curso.");
        }
    } catch (error) {
        console.error("Error al editar curso:", error);
    }
}

// Eliminar curso
async function deleteCourse(id) {
    const confirmResult = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Sí, eliminar",
    });
    if (confirmResult.isConfirmed) {
        try {
            await fetchRequest(`http://4.236.176.137:8081/api/cursos/${id}`, { method: "DELETE" });
            fetchCourses();
            Swal.fire("Eliminado", "El curso ha sido eliminado", "success");
        } catch (error) {
            Swal.fire("Error", "Hubo un problema al eliminar el curso", "error");
        }
    }
}