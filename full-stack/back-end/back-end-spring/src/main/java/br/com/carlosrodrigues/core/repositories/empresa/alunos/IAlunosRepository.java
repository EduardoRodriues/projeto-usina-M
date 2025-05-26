package br.com.carlosrodrigues.core.repositories.usuario.alunos;

import br.com.carlosrodrigues.core.models.empresa.alunos.Alunos;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAlunosRepository extends JpaRepository<Alunos, Long> {

    Page<Alunos> findByNomeContainingIgnoreCase(String nome, Pageable pageable);


}
