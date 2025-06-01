package br.com.carlosrodrigues.web.dtos.geral.professores;

import java.util.List;

public record ProfessoresPageDTO(List<ProfessoresDTO> alunos, long totalElements, int totalPages) {
}
