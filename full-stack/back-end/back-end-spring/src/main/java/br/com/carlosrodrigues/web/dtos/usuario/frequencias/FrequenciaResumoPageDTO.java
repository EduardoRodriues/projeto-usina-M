package br.com.carlosrodrigues.web.dtos;

import java.util.List;

public record FrequenciaResumoPageDTO(
        List<FrequenciaResumoDTO> alunos,
        long totalElements,
        int totalPages
) {}
