package br.com.carlosrodrigues.web.dtos.usuario.frequencias;

import br.com.carlosrodrigues.core.models.empresa.alunos.Alunos;
import com.fasterxml.jackson.annotation.JsonProperty;

public record FrequenciaResumoDTO(
        @JsonProperty("alunoId") Long alunoId,
        @JsonProperty("nome") String nome,
        @JsonProperty("email") String email,
        @JsonProperty("frequencia") int frequencia,
        @JsonProperty("presenteHoje") Boolean presenteHoje
) {
    public static FrequenciaResumoDTO from(Alunos aluno, int totalPresencas, boolean presenteHoje) {
        return new FrequenciaResumoDTO(
                aluno.getId(),
                aluno.getNome(),
                aluno.getEmail(),
                totalPresencas,
                presenteHoje
        );
    }
}

