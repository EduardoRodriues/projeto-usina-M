package br.com.carlosrodrigues.web.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public record FrequenciaDTO(
        @JsonProperty("_id") Long id,
        @JsonProperty("status") Integer status,
        @JsonProperty("presente") Boolean presente,
        @JsonProperty("alunoId") Long alunoId,
        @JsonProperty("nomeAluno") String nomeAluno
){}
