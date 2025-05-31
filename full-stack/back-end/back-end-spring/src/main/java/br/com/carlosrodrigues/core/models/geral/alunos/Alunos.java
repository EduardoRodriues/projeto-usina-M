package br.com.carlosrodrigues.core.models.geral.alunos;

import br.com.carlosrodrigues.core.models.geral.frequencias.Frequencia;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Alunos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("_id")
    private Long id;

    @Column(name = "nome", nullable = false)
    @JsonProperty("nome")
    private String nome;

    @Column(name = "cpf", nullable = false)
    @JsonProperty("cpf")
    private String cpf;

    @Column(name = "email", nullable = false)
    @JsonProperty("email")
    private String email;

    @Column(name = "dataNascimento", nullable = false)
    @JsonProperty("dataNascimento")
    private String dataNascimento;

    @Column(name = "contato", nullable = false)
    @JsonProperty("contato")
    private String contato;

    @Column(name = "genero", nullable = false)
    @JsonProperty("genero")
    private String genero;

    @OneToMany(mappedBy = "aluno", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Frequencia> frequencias = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public List<Frequencia> getFrequencias() {
        return frequencias;
    }

    public void setFrequencias(List<Frequencia> frequencias) {
        this.frequencias = frequencias;
    }
}