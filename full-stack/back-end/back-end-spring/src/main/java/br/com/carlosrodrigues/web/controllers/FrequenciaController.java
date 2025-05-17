package br.com.carlosrodrigues.web.controllers;

import br.com.carlosrodrigues.web.dtos.FrequenciaDTO;
import br.com.carlosrodrigues.web.dtos.FrequenciaPageDTO;
import br.com.carlosrodrigues.web.dtos.FrequenciaResumoPageDTO;
import br.com.carlosrodrigues.web.services.FrequenciaService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/frequencias")
public class FrequenciaController {

    @Autowired
    private FrequenciaService frequenciaService;

    @GetMapping
    public FrequenciaResumoPageDTO listarTodos(
            @RequestParam(defaultValue = "0") @PositiveOrZero int page,
            @RequestParam(defaultValue = "10") @Positive @Max(100) int tamanho) {
        return frequenciaService.listarFrequenciasResumo(page, tamanho);
    }
}