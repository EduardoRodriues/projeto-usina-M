package br.com.carlosrodrigues.web.services;

import br.com.carlosrodrigues.core.exceptions.RecordNotFoundException;
import br.com.carlosrodrigues.core.models.Alunos;
import br.com.carlosrodrigues.core.repositories.IAlunosRepository;
import br.com.carlosrodrigues.web.mappers.IAlunosMapper;
import br.com.carlosrodrigues.web.dtos.AlunosDTO;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlunosService {

    @Autowired
    private IAlunosRepository alunosRepository;

    @Autowired
    private IAlunosMapper alunosMapper;

    public List<Alunos> listarTodos() {
        return alunosRepository.findAll();
    }

    public Alunos cadastrar(AlunosDTO alunosDTO) {
        var model = alunosMapper.toModel(alunosDTO);
        return alunosRepository.save(model);
    }

    public AlunosDTO buscarPorId(@NotNull @Positive Long id) {
        return alunosRepository.findById(id).map(alunosMapper::toDTO).
                orElseThrow(() -> new RecordNotFoundException(id));
    }


}
