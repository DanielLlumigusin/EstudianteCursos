package com.curso.ESPE.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.curso.ESPE.entity.Curso;
import com.curso.ESPE.service.CursoService;

import java.util.Optional;

@RestController 
@RequestMapping("api/cursos")
public class CursoController {

    @Autowired
    CursoService cursoService;

    @GetMapping
    public ResponseEntity<?> findAllCursos() {
        return ResponseEntity.ok(cursoService.getAll());
    }

    @GetMapping("/{idCurso}")
    public ResponseEntity<Object> findCursoById(@PathVariable("idCurso") Long id) {
        Optional<Curso> curso = cursoService.getCursoById(id);
        return curso
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso no encontrado"));
    }

    @PostMapping
    public ResponseEntity<?> createCurso(@RequestBody Curso curso) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cursoService.CreateCurso(curso));
    }

    @PutMapping("/editar-curso/{idCurso}")
    public ResponseEntity<?> updateCurso(@PathVariable("idCurso") Long id, @RequestBody Curso curso) {
        boolean updated = cursoService.UpdateCurso(curso, id);
        if (updated) {
            return ResponseEntity.ok("Curso actualizado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso no encontrado");
        }
    }

    @DeleteMapping("/{idCurso}") // Corrección de la ruta
    public ResponseEntity<?> deleteCurso(@PathVariable("idCurso") Long id) {
        boolean deleted = cursoService.deleteCurso(id);
        if (deleted) {
            return ResponseEntity.ok("Curso eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso no encontrado");
        }
    }
}
