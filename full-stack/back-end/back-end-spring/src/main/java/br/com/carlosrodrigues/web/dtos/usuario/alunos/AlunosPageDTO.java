package br.com.carlosrodrigues.web.dtos.usuario.alunos;

import java.util.List;

public record AlunosPageDTO(List<AlunosDTO> alunos, long totalElements, int totalPages) {
}
