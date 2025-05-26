package br.com.carlosrodrigues.web.controllers.usuario.frequencias;

import br.com.carlosrodrigues.web.dtos.usuario.frequencias.FrequenciaResumoPageDTO;
import br.com.carlosrodrigues.web.services.usuario.frequencias.FrequenciaService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("/api/frequencias")
public class FrequenciaController {

    @Autowired
    private FrequenciaService frequenciaService;

    @GetMapping
    public FrequenciaResumoPageDTO listarTodos(
            @RequestParam(defaultValue = "0") @PositiveOrZero int page,
            @RequestParam(defaultValue = "10") @Positive @Max(100) int tamanho,
            @RequestParam(required = false) String nome) {
        return frequenciaService.listarFrequenciasResumo(page, tamanho, nome);
    }

}