package br.com.carlosrodrigues.web.dtos.usuario.frequencias;

import java.util.List;

public record FrequenciaResumoPageDTO(
        List<FrequenciaResumoDTO> alunos,
        long totalElements,
        int totalPages
) {}
