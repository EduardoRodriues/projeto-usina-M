package br.com.carlosrodrigues.web.dtos;

import br.com.carlosrodrigues.core.models.Alunos;
import com.fasterxml.jackson.annotation.JsonProperty;

public record FrequenciaResumoDTO(

        @JsonProperty("alunoId") Long alunoId,
        @JsonProperty("nome") String nome,
        @JsonProperty("email") String email,
        @JsonProperty("frequencia") int frequencia

) {
    public static FrequenciaResumoDTO from(Alunos aluno, int totalPresencas) {
        return new FrequenciaResumoDTO(
                aluno.getId(),
                aluno.getNome(),
                aluno.getEmail(),
                totalPresencas
        );
    }
}
