package com.curso.ESPE.exception;

@SuppressWarnings("serial")
public class EstudianteNotFoundException extends RuntimeException {
    public EstudianteNotFoundException(String message) {
        super(message);
    }
}