package com.curso.ESPE.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.curso.ESPE.entity.CursoEstudiante;

public interface ICursoEstudianteRepository extends CrudRepository<CursoEstudiante, Long>{
	List<CursoEstudiante> findByCursoId(Long cursoId);
	Optional<CursoEstudiante> findByCursoIdAndEstudianteId(Long cursoId, Long estudianteId);
	void deleteByCursoId(Long id);
}
