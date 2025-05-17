package br.com.carlosrodrigues.web.dtos;

import java.util.List;

public record FrequenciaPageDTO(List<FrequenciaDTO> alunos, long totalElements, int totalPages) {
}
