package br.com.carlosrodrigues.web.services;

import br.com.carlosrodrigues.core.models.Alunos;
import br.com.carlosrodrigues.core.repositories.IAlunosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlunosService {

    @Autowired
    private IAlunosRepository alunosRepository;

    public List<Alunos> listarTodos() {
        return alunosRepository.findAll();
    }
}
