package br.com.carlosrodrigues.web.controllers;

import br.com.carlosrodrigues.core.models.Alunos;
import br.com.carlosrodrigues.web.dtos.AlunosDTO;
import br.com.carlosrodrigues.web.services.AlunosService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Alunos cadastrar(@RequestBody @Valid AlunosDTO alunosDTO) {
       return alunosService.cadastrar(alunosDTO);
    }

    @GetMapping("/{id}")
    public AlunosDTO buscarPorId(@PathVariable @NotNull @Positive Long id) {
        return alunosService.buscarPorId(id);
    }

}
