package br.com.carlosrodrigues.web.controllers.geral.professores;

import br.com.carlosrodrigues.core.models.geral.professores.Professores;
import br.com.carlosrodrigues.web.dtos.geral.professores.ProfessoresDTO;
import br.com.carlosrodrigues.web.dtos.geral.professores.ProfessoresPageDTO;
import br.com.carlosrodrigues.web.services.geral.professores.ProfessoresServices;
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
@RequestMapping("/api/professores")
public class ProfessoresController {

    @Autowired
    private ProfessoresServices professoresServices;

    @GetMapping
    public ProfessoresPageDTO listarTodos(@RequestParam(defaultValue = "0") @PositiveOrZero int page,
                                          @Positive @Max(100) @RequestParam(defaultValue = "10") int tamanho,
                                          @RequestParam(required = false) String nome) {
        return professoresServices.listarTodos(page, tamanho, nome);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Professores cadastrar(@RequestBody @Valid ProfessoresDTO professoresDTO) {
        return professoresServices.cadastrar(professoresDTO);
    }

    @GetMapping("/{id}")
    public ProfessoresDTO buscarPorId(@PathVariable @NotNull @Positive Long id) {
        return professoresServices.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public ProfessoresDTO editar(@RequestBody @Valid ProfessoresDTO professoresDTO, @PathVariable @NotNull @Positive Long id) {
        return professoresServices.editar(professoresDTO, id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable @NotNull @Positive Long id) {
        professoresServices.excluir(id);
    }

}
