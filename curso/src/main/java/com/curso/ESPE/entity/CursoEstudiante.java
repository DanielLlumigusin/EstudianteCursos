package com.curso.ESPE.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class CursoEstudiante {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @ManyToOne
	    @JoinColumn(name = "curso_id", nullable = false)
	    @JsonBackReference
	    private Curso curso;

	    private Long estudianteId;

	    private LocalDate fechaInscripcion = LocalDate.now();

		public Long getId() {
			return id;
		}

		public Curso getCurso() {
			return curso;
		}

		public void setCurso(Curso curso) {
			this.curso = curso;
		}

		public Long getEstudianteId() {
			return estudianteId;
		}

		public void setEstudianteId(Long estudianteId) {
			this.estudianteId = estudianteId;
		}

		public LocalDate getFechaInscripcion() {
			return fechaInscripcion;
		}

		public void setFechaInscripcion(LocalDate fechaInscripcion) {
			this.fechaInscripcion = fechaInscripcion;
		}

		public void setId(Long id) {
			this.id = id;
		}

			    
}
