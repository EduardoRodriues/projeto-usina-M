package br.com.carlosrodrigues.web.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;


public record AlunosDTO(@JsonProperty("_id") Long id,
                        @NotNull @NotEmpty @Length(min = 5, max = 100) @JsonProperty("nome") String nome,
                        @NotNull @NotEmpty @Email @JsonProperty("email") String email) {
}
