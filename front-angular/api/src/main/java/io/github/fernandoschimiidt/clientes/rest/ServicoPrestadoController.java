package io.github.fernandoschimiidt.clientes.rest;

import io.github.fernandoschimiidt.clientes.model.entity.Cliente;
import io.github.fernandoschimiidt.clientes.model.entity.ServicoPrestado;
import io.github.fernandoschimiidt.clientes.model.repository.ClienteRepository;
import io.github.fernandoschimiidt.clientes.model.repository.ServicoPrestadoRepository;
import io.github.fernandoschimiidt.clientes.rest.dto.ServicoPrestadoDTO;
import io.github.fernandoschimiidt.clientes.util.BigDecimalConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;


@RestController
@RequestMapping("/api/servicos-prestados")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200")
public class ServicoPrestadoController {

    private final ClienteRepository clienteRepository;
    private final ServicoPrestadoRepository repository;
    private final BigDecimalConverter bigDecimalConverter;


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @CrossOrigin("http://localhost:4200")
    public ServicoPrestado salvar( @RequestBody @Valid ServicoPrestadoDTO dto ){
        LocalDate data = LocalDate.parse(dto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        Integer idCliente = dto.getIdCliente();

        Cliente cliente =
                clienteRepository
                        .findById(idCliente)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.BAD_REQUEST, "Cliente inexistente."));


        ServicoPrestado servicoPrestado = new ServicoPrestado();
        servicoPrestado.setDescricao(dto.getDescricao());
        servicoPrestado.setData( data );
        servicoPrestado.setCliente(cliente);
        servicoPrestado.setValor( bigDecimalConverter.converter(dto.getPreco())  );

        return repository.save(servicoPrestado);
    }

    @GetMapping
    public List<ServicoPrestado> pesquisar(
            @RequestParam(value = "nome", required = false, defaultValue = "") String nome,
            @RequestParam(value = "mes", required = false) Integer mes
    ) {
        return repository.findByNomeClienteAndMes("%" + nome + "%", mes);
    }
    

    @DeleteMapping("{id}")
    @CrossOrigin("http://localhost:4200")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Integer id) {
        repository
                .findById(id)
                .map(servico -> {
                    repository.delete(servico);
                    return Void.TYPE;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

}
