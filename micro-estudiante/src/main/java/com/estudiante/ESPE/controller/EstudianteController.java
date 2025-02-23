package com.estudiante.ESPE.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.estudiante.ESPE.entity.Estudiante;
import com.estudiante.ESPE.service.EstudianteService;

import java.util.Optional;

@RestController 
@RequestMapping("api/estudiantes")
public class EstudianteController {

    @Autowired
    EstudianteService estudianteService;

    @GetMapping
    public ResponseEntity<?> findAllEstudiantes() {
        return ResponseEntity.ok(estudianteService.getAll());
    }

    @GetMapping("/{idEstudiante}")
    public ResponseEntity<Object> findEstudianteById(@PathVariable("idEstudiante") Long id) {
        Optional<Estudiante> estudiante = estudianteService.getEstudianteById(id);
        return estudiante
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Estudiante no encontrado"));
    }

    @PostMapping
    public ResponseEntity<?> createEstudiante(@RequestBody Estudiante estudiante) {
        return ResponseEntity.status(HttpStatus.CREATED).body(estudianteService.createEstudiante(estudiante));
    }

    @PutMapping("/{idEstudiante}")
    public ResponseEntity<?> updateEstudiante(@PathVariable("idEstudiante") Long id, @RequestBody Estudiante estudiante) {
        try {
            Estudiante updatedEstudiante = estudianteService.updateEstudiante(estudiante, id);
            return ResponseEntity.ok(updatedEstudiante);  // Retorna el estudiante actualizado
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); 
        }
    }

    @DeleteMapping("/{idEstudiante}")
    public ResponseEntity<?> deleteEstudiante(@PathVariable("idEstudiante") Long id) {
        try {
            estudianteService.deleteEstudiante(id);
            return ResponseEntity.ok("Estudiante eliminado correctamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());  // Captura la excepción si no se encuentra el estudiante
        }
    }
}

