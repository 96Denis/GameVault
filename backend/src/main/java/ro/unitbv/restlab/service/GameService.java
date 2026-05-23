package ro.unitbv.restlab.service;

import org.springframework.stereotype.Service;
import ro.unitbv.restlab.dto.CreateGameRequest;
import ro.unitbv.restlab.dto.GameResponse;
import ro.unitbv.restlab.dto.UpdateGameRequest;
import ro.unitbv.restlab.exception.GameNotFoundException;
import ro.unitbv.restlab.mapper.GameMapper;
import ro.unitbv.restlab.model.Game;
import ro.unitbv.restlab.repository.GameRepository;

import java.util.List;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final GameMapper gameMapper;

    public GameService(GameRepository gameRepository, GameMapper gameMapper) {
        this.gameRepository = gameRepository;
        this.gameMapper = gameMapper;
    }

    public List<GameResponse> findAll() {
        return gameRepository.findAll().stream()
                .map(gameMapper::toResponse)
                .toList();
    }

    public GameResponse findById(Integer id) {
        return gameRepository.findById(id)
                .map(gameMapper::toResponse)
                .orElseThrow(() -> new GameNotFoundException("Game not found with id: " + id));
    }

    public GameResponse create(CreateGameRequest request) {
        Game game = new Game(
                request.title(),
                request.publisher(),
                request.releaseYear(),
                request.platform(),
                request.genre(),
                request.estimatedPrice(),
                request.description(),
                request.imageUrl(),
                request.systemRequirements()
        );
        return gameMapper.toResponse(gameRepository.save(game));
    }

    public GameResponse update(Integer id, UpdateGameRequest request) {
        Game existing = gameRepository.findById(id)
                .orElseThrow(() -> new GameNotFoundException("Game not found with id: " + id));

        existing.setTitle(request.title());
        existing.setPublisher(request.publisher());
        existing.setReleaseYear(request.releaseYear());
        existing.setPlatform(request.platform());
        existing.setGenre(request.genre());
        existing.setEstimatedPrice(request.estimatedPrice());
        existing.setDescription(request.description());
        existing.setImageUrl(request.imageUrl());
        existing.setSystemRequirements(request.systemRequirements());

        return gameMapper.toResponse(gameRepository.save(existing));
    }

    public void deleteById(Integer id) {
        if (!gameRepository.existsById(id)) {
            throw new GameNotFoundException("Game not found with id: " + id);
        }
        gameRepository.deleteById(id);
    }
}
