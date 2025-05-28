package br.com.carlosrodrigues.web.services.geral.frequencias;

import br.com.carlosrodrigues.core.models.geral.alunos.Alunos;
import br.com.carlosrodrigues.core.models.geral.frequencias.Frequencia;
import br.com.carlosrodrigues.core.repositories.geral.alunos.IAlunosRepository;
import br.com.carlosrodrigues.core.repositories.geral.frequencias.IFrequenciaRepository;
import br.com.carlosrodrigues.web.dtos.geral.frequencias.FrequenciaDTO;
import br.com.carlosrodrigues.web.dtos.geral.frequencias.FrequenciaPageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class FrequenciaService {

    @Autowired
    private IAlunosRepository alunoRepository;

    @Autowired
    private IFrequenciaRepository frequenciaRepository;

    public FrequenciaPageDTO listarFrequenciasResumo(int page, int tamanho, String nome) {
        Pageable pageable = PageRequest.of(page, tamanho);
        Page<Alunos> alunosPage;

        if (nome != null && !nome.isBlank()) {
            alunosPage = alunoRepository.findByNomeContainingIgnoreCase(nome, pageable);
        } else {
            alunosPage = alunoRepository.findAll(pageable);
        }

        LocalDate hoje = LocalDate.now();

        List<FrequenciaDTO> conteudo = alunosPage.stream().map(aluno -> {
            int totalPresencas = frequenciaRepository.countByAlunoAndPresenteTrue(aluno);
            boolean presenteHoje = frequenciaRepository.findByAlunoAndData(aluno, hoje).isPresent();
            return FrequenciaDTO.from(aluno, totalPresencas, presenteHoje);
        }).toList();

        return new FrequenciaPageDTO(
                conteudo,
                alunosPage.getTotalElements(),
                alunosPage.getTotalPages()
        );
    }

    public void registrarPresenca(Long alunoId, boolean presente) {
        Alunos aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new NoSuchElementException("Aluno não encontrado com id: " + alunoId));

        LocalDate hoje = LocalDate.now();

        if (presente) {
            Frequencia frequencia = frequenciaRepository.findByAlunoAndData(aluno, hoje)
                    .orElse(new Frequencia());

            frequencia.setAluno(aluno);
            frequencia.setData(hoje);
            frequencia.setPresente(true);
            frequencia.setStatus(1);

            frequenciaRepository.save(frequencia);
        } else {
            frequenciaRepository.findByAlunoAndData(aluno, hoje)
                    .ifPresent(frequenciaRepository::delete);
        }
    }
}
