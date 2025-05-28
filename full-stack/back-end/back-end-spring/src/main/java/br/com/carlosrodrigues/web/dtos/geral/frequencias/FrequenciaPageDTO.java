package br.com.carlosrodrigues.web.dtos.geral.frequencias;

import java.util.List;

public record FrequenciaPageDTO(
        List<FrequenciaDTO> alunos,
        long totalElements,
        int totalPages
) {}
