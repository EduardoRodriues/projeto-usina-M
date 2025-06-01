package br.com.carlosrodrigues.web.dtos.geral.professores;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record ProfessoresDTO(
        @JsonProperty("_id") Long id,
        @NotNull @NotEmpty @Length(min = 3, max = 100) @JsonProperty("nome") String nome,
        @NotNull @NotEmpty @Email @JsonProperty("email") String email,
        @NotNull @NotEmpty @Length(min = 11, max = 11) @JsonProperty("cpf") String cpf,
        @NotNull @Length(min = 11, max = 11) @JsonProperty("contato") String contato
) {
}
