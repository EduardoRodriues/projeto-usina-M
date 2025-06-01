package br.com.carlosrodrigues.core.repositories.geral.professores;

import br.com.carlosrodrigues.core.models.geral.professores.Professores;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProfessoresRepository extends JpaRepository<Professores, Long> {

    Page<Professores> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
