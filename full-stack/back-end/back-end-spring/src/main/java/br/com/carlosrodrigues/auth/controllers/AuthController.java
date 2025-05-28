package br.com.carlosrodrigues.auth.controllers;

import br.com.carlosrodrigues.auth.dtos.LoginRequestDTO;
import br.com.carlosrodrigues.auth.dtos.RegisterRequestDTO;
import br.com.carlosrodrigues.auth.dtos.ResponseDTO;
import br.com.carlosrodrigues.auth.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body){
        try {
            ResponseDTO response = authService.login(body);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {
        try {
            ResponseDTO response = authService.register(body);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro interno: " + e.getMessage());
        }
    }
}
