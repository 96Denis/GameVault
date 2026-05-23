package ro.unitbv.restlab.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record GameResponse(
        Integer id,
        String title,
        String publisher,
        Integer releaseYear,
        String platform,
        String genre,
        BigDecimal estimatedPrice,
        String description,
        String imageUrl,
        String systemRequirements,
        LocalDateTime createdAt
) {
}
