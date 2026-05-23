package ro.unitbv.restlab.mapper;

import org.springframework.stereotype.Component;
import ro.unitbv.restlab.dto.GameResponse;
import ro.unitbv.restlab.model.Game;

@Component
public class GameMapper {

    public GameResponse toResponse(Game game) {
        return new GameResponse(
                game.getId(),
                game.getTitle(),
                game.getPublisher(),
                game.getReleaseYear(),
                game.getPlatform(),
                game.getGenre(),
                game.getEstimatedPrice(),
                game.getDescription(),
                game.getImageUrl(),
                game.getSystemRequirements(),
                game.getCreatedAt()
        );
    }
}
