package com.curso.ESPE.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.curso.ESPE.model.Estudiante;

@FeignClient(name = "Estudiante", url = "http://4.236.176.137:8080/api/estudiantes")
public interface EstudianteFeignClient {

	@GetMapping("/{id}")
    ResponseEntity<Estudiante> getEstudiante(@PathVariable Long id);

    @GetMapping
    ResponseEntity<List<Estudiante>> getAllEstudiantes();
}
