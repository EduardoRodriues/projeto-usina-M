package br.com.carlosrodrigues.web.dtos.geral.alunos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;


public record AlunosDTO(@JsonProperty("_id") Long id,
                        @NotNull @NotEmpty @Length(min = 3, max = 100) @JsonProperty("nome") String nome,
                        @NotNull @NotEmpty @Email @JsonProperty("email") String email,
                        @NotNull @NotEmpty @Length(min = 11, max = 11) @JsonProperty("cpf") String cpf,
                        @NotNull @Length(min = 8, max = 8) @JsonProperty("dataNascimento") String dataNascimento,
                        @NotNull @Length(min = 11, max = 11) @JsonProperty("contato") String contato,
                        @NotNull @NotEmpty @JsonProperty("genero") String genero) {
}
