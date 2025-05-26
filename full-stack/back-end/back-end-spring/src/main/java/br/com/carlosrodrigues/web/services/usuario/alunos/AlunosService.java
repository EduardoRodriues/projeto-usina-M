package br.com.carlosrodrigues.web.services;

import br.com.carlosrodrigues.core.exceptions.RecordNotFoundException;
import br.com.carlosrodrigues.core.models.Alunos;
import br.com.carlosrodrigues.core.repositories.IAlunosRepository;
import br.com.carlosrodrigues.web.dtos.AlunosPageDTO;
import br.com.carlosrodrigues.web.mappers.IAlunosMapper;
import br.com.carlosrodrigues.web.dtos.AlunosDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
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
public class AlunosService {

    @Autowired
    private IAlunosRepository alunosRepository;

    @Autowired
    private IAlunosMapper alunosMapper;

    public AlunosPageDTO listarTodos(@PositiveOrZero int page, @Positive @Max(100) int tamanho, String nome) {
        Pageable pageable = PageRequest.of(page, tamanho);
        Page<Alunos> pageAlunos;

        if (nome != null && !nome.isBlank()) {
            pageAlunos = alunosRepository.findByNomeContainingIgnoreCase(nome, pageable);
        } else {
            pageAlunos = alunosRepository.findAll(pageable);
        }

        List<AlunosDTO> alunos = pageAlunos.stream()
                .map(alunosMapper::toDTO)
                .collect(Collectors.toList());

        return new AlunosPageDTO(alunos, pageAlunos.getTotalElements(), pageAlunos.getTotalPages());
    }

    public Alunos cadastrar(AlunosDTO alunosDTO) {
        var model = alunosMapper.toModel(alunosDTO);
        return alunosRepository.save(model);
    }

    public AlunosDTO buscarPorId(@NotNull @Positive Long id) {
        return alunosRepository.findById(id).map(alunosMapper::toDTO).
                orElseThrow(() -> new RecordNotFoundException(id));
    }

    public AlunosDTO editar(@NotNull @Valid AlunosDTO alunosDTO, @Positive @NotNull Long id) {
        return alunosRepository.findById(id).
                map(record -> {
                    Alunos alunos = alunosMapper.toModel(alunosDTO);
                    record.setNome(alunos.getNome());
                    record.setEmail(alunos.getEmail());
                    return alunosMapper.toDTO(alunosRepository.save(record));
                })
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void excluir(@NotNull @Positive Long id) {
        alunosRepository.delete(alunosRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
    }


}
