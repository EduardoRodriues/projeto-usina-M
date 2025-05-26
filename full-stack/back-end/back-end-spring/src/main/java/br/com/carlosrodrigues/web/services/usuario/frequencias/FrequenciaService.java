package br.com.carlosrodrigues.web.services;

import br.com.carlosrodrigues.core.models.Alunos;
import br.com.carlosrodrigues.core.repositories.IAlunosRepository;
import br.com.carlosrodrigues.core.repositories.IFrequenciaRepository;
import br.com.carlosrodrigues.web.dtos.FrequenciaResumoDTO;
import br.com.carlosrodrigues.web.dtos.FrequenciaResumoPageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FrequenciaService {

    @Autowired
    private IAlunosRepository alunoRepository;

    @Autowired
    private IFrequenciaRepository frequenciaRepository;

    public FrequenciaResumoPageDTO listarFrequenciasResumo(int page, int tamanho, String nome) {
        Pageable pageable = PageRequest.of(page, tamanho);
        Page<Alunos> alunosPage;

        if (nome != null && !nome.isBlank()) {
            alunosPage = alunoRepository.findByNomeContainingIgnoreCase(nome, pageable);
        } else {
            alunosPage = alunoRepository.findAll(pageable);
        }

        List<FrequenciaResumoDTO> conteudo = alunosPage.stream().map(aluno ->
                FrequenciaResumoDTO.from(aluno, frequenciaRepository.countByAlunoAndPresenteTrue(aluno))
        ).toList();

        return new FrequenciaResumoPageDTO(conteudo, alunosPage.getTotalElements(), alunosPage.getTotalPages());
    }

}
