package com.curso.ESPE.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.curso.ESPE.entity.Curso;
import com.curso.ESPE.repository.ICursoEstudianteRepository;
import com.curso.ESPE.repository.ICursoRepository;

import jakarta.transaction.Transactional;

@Service
public class CursoService {

	@Autowired
	ICursoRepository cursoRepository;
	
	@Autowired
	ICursoEstudianteRepository cursoEstudianteRepository;
	
	public List<Curso> getAll(){
		return (List<Curso>)cursoRepository.findAll();
	}
	
	public Optional<Curso> getCursoById(Long id){
		return (Optional<Curso>)cursoRepository.findById(id);
	}
	
	public Curso CreateCurso(Curso newCurso) {
		return cursoRepository.save(newCurso);
	}
	
	public boolean UpdateCurso(Curso updateCurso, Long id) {
		if(!cursoRepository.findById(id).isEmpty()) {
			cursoRepository.save(updateCurso);
			return true;
		}else {
			return false;
		}
	}
	
	@Transactional
	public boolean deleteCurso(Long id) {
	    Optional<Curso> curso = cursoRepository.findById(id);
	    if (curso.isPresent()) {
	        // Eliminar primero las inscripciones del curso en curso_estudiante
	        cursoEstudianteRepository.deleteByCursoId(id);

	        // Luego eliminar el curso
	        cursoRepository.deleteById(id);
	        return true;
	    }
	    return false;
	}

	
}
