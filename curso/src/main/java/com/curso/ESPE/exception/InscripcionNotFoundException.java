package com.curso.ESPE.exception;
@SuppressWarnings("serial")
public class InscripcionNotFoundException extends RuntimeException {
    public InscripcionNotFoundException(String message) {
        super(message);
    }
}