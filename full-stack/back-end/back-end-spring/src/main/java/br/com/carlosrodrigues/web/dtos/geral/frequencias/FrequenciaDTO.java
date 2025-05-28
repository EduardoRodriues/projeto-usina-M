package br.com.carlosrodrigues.web.dtos.geral.frequencias;

import br.com.carlosrodrigues.core.models.geral.alunos.Alunos;
import com.fasterxml.jackson.annotation.JsonProperty;

public record FrequenciaDTO(
        @JsonProperty("alunoId") Long alunoId,
        @JsonProperty("nome") String nome,
        @JsonProperty("email") String email,
        @JsonProperty("frequencia") int frequencia,
        @JsonProperty("presenteHoje") Boolean presenteHoje
) {
    public static FrequenciaDTO from(Alunos aluno, int totalPresencas, boolean presenteHoje) {
        return new FrequenciaDTO(
                aluno.getId(),
                aluno.getNome(),
                aluno.getEmail(),
                totalPresencas,
                presenteHoje
        );
    }
}

