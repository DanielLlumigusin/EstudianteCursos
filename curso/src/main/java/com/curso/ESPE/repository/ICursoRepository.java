package com.curso.ESPE.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.curso.ESPE.entity.Curso;

@Repository
public interface ICursoRepository extends CrudRepository<Curso, Long>{

}
