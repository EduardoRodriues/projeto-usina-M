package br.com.carlosrodrigues.web.dtos.geral.frequencias;

import java.time.LocalDate;

public record FrequenciaDiaDTO(
        Long alunoId,
        LocalDate data,
        Boolean presente
) {}