package br.com.carlosrodrigues.web.controllers.usuario.alunos;

import br.com.carlosrodrigues.core.models.empresa.alunos.Alunos;
import br.com.carlosrodrigues.web.dtos.usuario.alunos.AlunosDTO;
import br.com.carlosrodrigues.web.dtos.usuario.alunos.AlunosPageDTO;
import br.com.carlosrodrigues.web.services.usuario.alunos.AlunosService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@Validated
@RestController
@RequestMapping("/api/alunos")
public class AlunosController {

    @Autowired
    private AlunosService alunosService;

    @GetMapping
    public AlunosPageDTO listarTodos(@RequestParam(defaultValue = "0") @PositiveOrZero int page,
                                     @Positive @Max(100) @RequestParam(defaultValue = "10") int tamanho,
                                     @RequestParam(required = false) String nome) {
        return alunosService.listarTodos(page, tamanho, nome);
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

    @PutMapping("/{id}")
    public AlunosDTO editar(@RequestBody @Valid AlunosDTO alunosDTO, @PathVariable @NotNull @Positive Long id) {
        return alunosService.editar(alunosDTO, id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable @NotNull @Positive Long id) {
        alunosService.excluir(id);
    }

}
