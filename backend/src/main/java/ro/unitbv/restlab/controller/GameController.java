package ro.unitbv.restlab.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.unitbv.restlab.dto.CreateGameRequest;
import ro.unitbv.restlab.dto.GameResponse;
import ro.unitbv.restlab.dto.UpdateGameRequest;
import ro.unitbv.restlab.service.GameService;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @GetMapping
    public List<GameResponse> getAllGames() {
        return gameService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameResponse> getGameById(@PathVariable Integer id) {
        return ResponseEntity.ok(gameService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GameResponse> createGame(@Valid @RequestBody CreateGameRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(gameService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GameResponse> updateGame(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateGameRequest request
    ) {
        return ResponseEntity.ok(gameService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteGame(@PathVariable Integer id) {
        gameService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
