package com.curso.ESPE.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.curso.ESPE.client.EstudianteFeignClient;
import com.curso.ESPE.entity.Curso;
import com.curso.ESPE.entity.CursoEstudiante;
import com.curso.ESPE.exception.CursoNotFoundException;
import com.curso.ESPE.exception.EstudianteNotFoundException;
import com.curso.ESPE.model.Estudiante;
import com.curso.ESPE.repository.ICursoEstudianteRepository;
import com.curso.ESPE.repository.ICursoRepository;

@Service
public class CursoEstudianteService {

    @Autowired
    private ICursoEstudianteRepository cursoEstudianteRepository;

    @Autowired
    private ICursoRepository cursoRepository;

    @Autowired
    private EstudianteFeignClient estudianteFeignClient;

    public CursoEstudiante inscribirEstudianteEnCurso(Long cursoId, Long estudianteId) {
        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new CursoNotFoundException("Curso no encontrado"));

        ResponseEntity<Estudiante> response = estudianteFeignClient.getEstudiante(estudianteId);
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            Estudiante estudiante = response.getBody();

            Optional<CursoEstudiante> existenciaInscripcion = cursoEstudianteRepository.findByCursoIdAndEstudianteId(cursoId, estudianteId);
            if (existenciaInscripcion.isPresent()) {
                throw new RuntimeException("El estudiante ya está inscrito en este curso");
            }

            CursoEstudiante cursoEstudiante = new CursoEstudiante();
            cursoEstudiante.setCurso(curso);
            cursoEstudiante.setEstudianteId(estudiante.getId());
            cursoEstudiante.setFechaInscripcion(LocalDate.now());

            return cursoEstudianteRepository.save(cursoEstudiante);
        } else {
            throw new EstudianteNotFoundException("Estudiante no encontrado");
        }
    }

    public List<Estudiante> obtenerEstudiantesEnCurso(Long cursoId) {
        List<CursoEstudiante> cursoEstudiantes = cursoEstudianteRepository.findByCursoId(cursoId);
        List<Estudiante> estudiantes = new ArrayList<>();

        for (CursoEstudiante cursoEstudiante : cursoEstudiantes) {
            Long estudianteId = cursoEstudiante.getEstudianteId();
            ResponseEntity<Estudiante> response = estudianteFeignClient.getEstudiante(estudianteId);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Estudiante estudiante = response.getBody();
                estudiantes.add(estudiante);
            } else {
                System.err.println("Estudiante con ID " + estudianteId + " no encontrado");
            }
        }

        return estudiantes;
    }

    public List<Estudiante> obtenerEstudiantesNoInscritosEnCurso(Long cursoId) {
        ResponseEntity<List<Estudiante>> response = estudianteFeignClient.getAllEstudiantes();
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            List<Estudiante> todosLosEstudiantes = response.getBody();
            List<Estudiante> estudiantesInscritos = obtenerEstudiantesEnCurso(cursoId);

            List<Long> idsEstudiantesInscritos = estudiantesInscritos.stream()
                    .map(Estudiante::getId)
                    .collect(Collectors.toList());

            return todosLosEstudiantes.stream()
                    .filter(estudiante -> !idsEstudiantesInscritos.contains(estudiante.getId()))
                    .collect(Collectors.toList());
        } else {
            throw new RuntimeException("No se pudieron obtener los estudiantes");
        }
    }
    
    public void eliminarEstudianteDeCurso(Long courseId, Long studentId) {
        CursoEstudiante courseStudent = cursoEstudianteRepository.findByCursoIdAndEstudianteId(courseId, studentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        cursoEstudianteRepository.delete(courseStudent);
    }
}