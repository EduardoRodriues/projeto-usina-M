package br.com.carlosrodrigues.core.repositories.geral.frequencias;

import br.com.carlosrodrigues.core.models.geral.alunos.Alunos;
import br.com.carlosrodrigues.core.models.geral.frequencias.Frequencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;


@Repository
public interface IFrequenciaRepository extends JpaRepository<Frequencia, Long> {

    @EntityGraph(attributePaths = "aluno")
    Page<Frequencia> findAll(Pageable pageable);

    int countByAlunoAndPresenteTrue(Alunos aluno);

    Optional<Frequencia> findByAlunoAndData(Alunos aluno, LocalDate data);

}
