async function fetchCourseEnrollments(courseId) {
    try {
        const estudiantes = await fetchRequest(
            `http://4.236.176.137:8081/api/curso-estudiante/${courseId}/estudiantes`
        );
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

// Abrir modal de inscripciones para un curso
async function openCourseEnrollmentsModal(courseId, courseName) {
    // Se asume que en el HTML existe un elemento con id "enrollment-course-name"
    const enrollmentCourseNameEl = document.getElementById("enrollment-course-name");
    if (!enrollmentCourseNameEl) {
        console.error("Elemento 'enrollment-course-name' no encontrado");
        return;
    }
    enrollmentCourseNameEl.textContent = courseName;
    await fetchCourseEnrollments(courseId);
    openModal("enrollments-modal", `Estudiantes inscritos en ${courseName}`);
}

// Eliminar inscripción de un estudiante en un curso
async function deleteCourseEnrollment(courseId, estudianteId) {
    const confirmResult = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Se eliminará la inscripción del estudiante en este curso",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
    });

    if (confirmResult.isConfirmed) {
        try {
            await fetchRequest(
                `http://4.236.176.137:8081/api/curso-estudiante/${courseId}/estudiantes/${estudianteId}`,
                { method: "DELETE" }
            );
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "El estudiante ha sido eliminado del curso",
            });
            await fetchCourseEnrollments(courseId);
        } catch (error) {
            console.error("Error al eliminar inscripción:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al eliminar la inscripción",
            });
        }
    }
}

/*==============================*/
/* Opcional: Inscripciones por Alumno */
/*==============================*/

// Si tu aplicación también gestiona inscripciones de alumnos en cursos, puedes agregar funciones separadas.
// Por ejemplo, para cargar inscripciones de un alumno:

async function fetchStudentEnrollments(studentId) {
    try {
        const enrollments = await fetchRequest(
            `http://4.236.176.137:8081/api/estudiantes/${studentId}/cursos`
        );
        const tableBody = document.getElementById("student-enrollments-table");

        if (!tableBody) {
            console.error("Elemento 'student-enrollments-table' no encontrado");
            return;
        }
        tableBody.innerHTML = "";

        if (Array.isArray(enrollments) && enrollments.length > 0) {
            enrollments.forEach((enrollment) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${enrollment.id}</td>
                    <td>${enrollment.nombre}</td>
                    <td>
                        <button class="btn-danger" onclick="deleteStudentEnrollment(${studentId}, ${enrollment.id})">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3">El alumno no está inscrito en ningún curso.</td>
                </tr>
            `;
        }
    } catch (error) {
        console.error("Error al cargar inscripciones:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar las inscripciones",
        });
    }
}

// Abrir modal de inscripciones para un alumno
async function openStudentEnrollmentsModal(studentId, studentName) {
    // Se asume que en el HTML existe un elemento con id "enrollment-student-name"
    const enrollmentStudentNameEl = document.getElementById("enrollment-student-name");
    if (!enrollmentStudentNameEl) {
        console.error("Elemento 'enrollment-student-name' no encontrado");
        return;
    }
    enrollmentStudentNameEl.textContent = studentName;
    await fetchStudentEnrollments(studentId);
    openModal("student-enrollments-modal", `Inscripciones de ${studentName}`);
}

// Eliminar inscripción de un alumno en un curso
async function deleteStudentEnrollment(studentId, courseId) {
    const confirmResult = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Se eliminará la inscripción del curso",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
    });

    if (confirmResult.isConfirmed) {
        try {
            await fetchRequest(
                `http://4.236.176.137:8081/api/estudiantes/${studentId}/cursos/${courseId}`,
                { method: "DELETE" }
            );
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "La inscripción ha sido eliminada",
            });
            await fetchStudentEnrollments(studentId);
        } catch (error) {
            console.error("Error al eliminar inscripción:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al eliminar la inscripción",
            });
        }
    }
}
