package br.com.carlosrodrigues.web.controllers;

import br.com.carlosrodrigues.core.models.Alunos;
import br.com.carlosrodrigues.web.services.AlunosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
public class AlunosController {

    @Autowired
    private AlunosService alunosService;

    @GetMapping
    public List<Alunos> listarTodos() {
        return alunosService.listarTodos();
    }

}
