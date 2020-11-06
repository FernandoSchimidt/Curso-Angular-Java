package io.github.fernandoschimiidt.clientes.rest;

import io.github.fernandoschimiidt.clientes.model.entity.Cliente;
import io.github.fernandoschimiidt.clientes.model.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteRepository repository;

    @Autowired
    public ClienteController(ClienteRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    @CrossOrigin("http://localhost:4200")
    public List<Cliente> getAll(){
        return  repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @CrossOrigin("http://localhost:4200")
    public Cliente salvar(@RequestBody @Valid Cliente cliente) {
        return repository.save(cliente);
    }

    @GetMapping("{id}")
    @CrossOrigin("http://localhost:4200")
    public Cliente acharPorId(@PathVariable Integer id) {
        return repository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Cliente não encontrado"));
    }

    @DeleteMapping("{id}")
    @CrossOrigin("http://localhost:4200")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Integer id) {
        repository
                .findById(id)
                .map(cliente -> {
                    repository.delete(cliente);
                    return Void.TYPE;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
    @PutMapping("{id}")
    @CrossOrigin("http://localhost:4200")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar(@PathVariable Integer id, @RequestBody @Valid Cliente clienteAtt) {
        repository
                .findById(id)
                .map(cliente -> {
                    clienteAtt.setId(cliente.getId());
                    return repository.save(clienteAtt);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
