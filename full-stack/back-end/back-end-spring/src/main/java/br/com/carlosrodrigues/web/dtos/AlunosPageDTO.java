package br.com.carlosrodrigues.web.dtos;

import java.util.List;

public record AlunosPageDTO(List<AlunosDTO> alunos, long totalElements, int totalPages) {
}
