package ro.unitbv.restlab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.unitbv.restlab.model.Game;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Integer> {
    List<Game> findByTitleContainingIgnoreCase(String title);

    List<Game> findByGenreIgnoreCase(String genre);

    boolean existsByTitleIgnoreCase(String title);
}
