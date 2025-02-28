package com.estudiante.ESPE.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.estudiante.ESPE.entity.Estudiante;
import com.estudiante.ESPE.repository.IEstudianteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteService {

    @Autowired
    IEstudianteRepository estudianteRepository;

    public List<Estudiante> getAll() {
        return (List<Estudiante>) estudianteRepository.findAll();
    }

    public Optional<Estudiante> getEstudianteById(Long id) {
        return estudianteRepository.findById(id);
    }

    @Transactional
    public Estudiante createEstudiante(Estudiante newEstudiante) {
        // Lógica para validar o transformar el estudiante si es necesario
        return estudianteRepository.save(newEstudiante);
    }

    @Transactional
    public Estudiante updateEstudiante(Estudiante updateEstudiante, Long id) {
        // Si el estudiante no existe, se puede lanzar una excepción
        return estudianteRepository.findById(id)
                .map(existingEstudiante -> {
                    existingEstudiante.setNombre(updateEstudiante.getNombre());
                    existingEstudiante.setApellido(updateEstudiante.getApellido());
                    // Agregar cualquier otra actualización de atributos aquí
                    return estudianteRepository.save(existingEstudiante);
                })
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));
    }

    @Transactional
    public void deleteEstudiante(Long id) {
        // Se puede lanzar una excepción si el estudiante no existe
        estudianteRepository.findById(id)
                .ifPresentOrElse(estudianteRepository::delete,
                        () -> { throw new RuntimeException("Estudiante no encontrado"); });
    }
}
