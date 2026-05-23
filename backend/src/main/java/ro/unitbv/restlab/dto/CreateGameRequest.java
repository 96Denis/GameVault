package ro.unitbv.restlab.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record CreateGameRequest(
        @NotBlank(message = "Title must not be blank")
        @Size(max = 160, message = "Title must be at most 160 characters")
        String title,

        @NotBlank(message = "Publisher must not be blank")
        @Size(max = 160, message = "Publisher must be at most 160 characters")
        String publisher,

        @NotNull(message = "Release year is required")
        @Min(value = 1970, message = "Release year must be realistic")
        @Max(value = 2100, message = "Release year must be realistic")
        Integer releaseYear,

        @NotBlank(message = "Platform must not be blank")
        @Size(max = 80, message = "Platform must be at most 80 characters")
        String platform,

        @NotBlank(message = "Genre must not be blank")
        @Size(max = 80, message = "Genre must be at most 80 characters")
        String genre,

        @NotNull(message = "Estimated price is required")
        @DecimalMin(value = "0.01", message = "Estimated price must be positive")
        BigDecimal estimatedPrice,

        @NotBlank(message = "Description must not be blank")
        @Size(max = 2000, message = "Description must be at most 2000 characters")
        String description,

        @NotBlank(message = "Image URL must not be blank")
        @Pattern(regexp = "^https?://.+", message = "Image URL must start with http:// or https://")
        @Size(max = 500, message = "Image URL must be at most 500 characters")
        String imageUrl,

        @NotBlank(message = "System requirements must not be blank")
        @Size(max = 2000, message = "System requirements must be at most 2000 characters")
        String systemRequirements
) {
}
