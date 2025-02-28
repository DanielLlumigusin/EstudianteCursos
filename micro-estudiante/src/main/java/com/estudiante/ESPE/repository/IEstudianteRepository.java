package com.estudiante.ESPE.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.estudiante.ESPE.entity.Estudiante;

@Repository
public interface IEstudianteRepository extends CrudRepository<Estudiante, Long>{

}
