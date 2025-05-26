package br.com.carlosrodrigues.core.repositories.usuario.frequencias;

import br.com.carlosrodrigues.core.models.empresa.alunos.Alunos;
import br.com.carlosrodrigues.core.models.empresa.frequencias.Frequencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IFrequenciaRepository extends JpaRepository<Frequencia, Long> {

    @EntityGraph(attributePaths = "aluno")
    Page<Frequencia> findAll(Pageable pageable);

    int countByAlunoAndPresenteTrue(Alunos aluno);

}
