package br.com.carlosrodrigues.web.services;

import br.com.carlosrodrigues.core.models.Alunos;
import br.com.carlosrodrigues.core.models.Frequencia;
import br.com.carlosrodrigues.core.repositories.IAlunosRepository;
import br.com.carlosrodrigues.core.repositories.IFrequenciaRepository;
import br.com.carlosrodrigues.web.dtos.FrequenciaDTO;
import br.com.carlosrodrigues.web.dtos.FrequenciaPageDTO;
import br.com.carlosrodrigues.web.dtos.FrequenciaResumoDTO;
import br.com.carlosrodrigues.web.dtos.FrequenciaResumoPageDTO;
import br.com.carlosrodrigues.web.mappers.IFrequenciaMapper;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FrequenciaService {

    @Autowired
    private IAlunosRepository alunoRepository;

    @Autowired
    private IFrequenciaRepository frequenciaRepository;

    public FrequenciaResumoPageDTO listarFrequenciasResumo(int page, int tamanho) {
        Pageable pageable = PageRequest.of(page, tamanho);
        Page<Alunos> alunosPage = alunoRepository.findAll(pageable);

        List<FrequenciaResumoDTO> conteudo = alunosPage.stream().map(aluno -> {
            int totalPresencas = frequenciaRepository.countByAlunoAndPresenteTrue(aluno);
            return new FrequenciaResumoDTO(
                    aluno.getId(),
                    aluno.getNome(),
                    aluno.getEmail(),
                    totalPresencas
            );
        }).toList();

        return new FrequenciaResumoPageDTO(conteudo, alunosPage.getTotalElements(), alunosPage.getTotalPages());
    }


}
