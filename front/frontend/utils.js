// Función para abrir cualquier modal
function openModal(modalId, title = "") {
    const modal = document.getElementById(modalId);
    if (title) {
      const titleElement = modal.querySelector("h2");
      titleElement.textContent = title;
    }
    modal.style.display = "flex";
  }
  
  // Función para cerrar cualquier modal y resetear su formulario (si existe)
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
    const form = modal.querySelector("form");
    if (form) {
      form.reset();
    }
  }
  
  // Función genérica para realizar peticiones fetch con manejo de errores
  async function fetchRequest(url, options = {}) {
    try {
        const response = await fetch(url, options);
        
        // Verifica el tipo de contenido de la respuesta
        const contentType = response.headers.get("content-type");
        
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        // Si la respuesta es JSON, parsearla
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            // Si no es JSON, devolver el texto de la respuesta
            return await response.text();
        }
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
  
  // Manejador para cerrar modales al hacer clic en el botón de cerrar
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".modal .close-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        if (modal) modal.style.display = "none";
      });
    });
  });
  