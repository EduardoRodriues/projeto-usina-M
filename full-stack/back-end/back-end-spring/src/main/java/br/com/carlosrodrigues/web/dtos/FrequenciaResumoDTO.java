package br.com.carlosrodrigues.web.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public record FrequenciaResumoDTO(

        @JsonProperty("alunoId") Long alunoId,
        @JsonProperty("nome") String nome,
        @JsonProperty("email") String email,
        @JsonProperty("frequencia") int frequencia

) {}
