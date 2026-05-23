package ro.unitbv.restlab.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ro.unitbv.restlab.model.AppUser;
import ro.unitbv.restlab.model.Game;
import ro.unitbv.restlab.repository.AppUserRepository;
import ro.unitbv.restlab.repository.GameRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final AppUserRepository userRepository;
    private final GameRepository gameRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            AppUser admin = AppUser.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .enabled(true)
                    .roles(Set.of("ADMIN"))
                    .build();

            AppUser user = AppUser.builder()
                    .username("user")
                    .password(passwordEncoder.encode("user123"))
                    .enabled(true)
                    .roles(Set.of("USER"))
                    .build();

            AppUser manager = AppUser.builder()
                    .username("manager")
                    .password(passwordEncoder.encode("manager123"))
                    .enabled(true)
                    .roles(Set.of("MANAGER"))
                    .build();

            userRepository.saveAll(Set.of(admin, user, manager));
        }

        seedGame(
                "Cyberpunk 2077",
                "CD Projekt Red",
                2020,
                "PC / PlayStation 5 / Xbox Series X",
                "RPG",
                new BigDecimal("199.99"),
                "Un RPG open-world plasat in Night City, un megalopolis obsedat de putere, glamour si modificari corporale.",
                "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
                "Minimum: Core i7-6700 / Ryzen 5 1600, 12GB RAM, GTX 1060 6GB | Recommended: Core i7-12700 / Ryzen 7 7800X3D, 16GB RAM, RTX 2060 Super"
        );
        seedGame(
                "Counter-Strike 2",
                "Valve",
                2023,
                "PC",
                "Shooter",
                new BigDecimal("0.00"),
                "Cel mai popular shooter tactic competitiv. CS2 aduce Source 2, fum dinamic si harti clasice reimaginate.",
                "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",
                "Minimum: Core i5-750, 8GB RAM, 1GB VRAM (DirectX 11) | Recommended: Core i5-9600K / Ryzen 5 3600, 16GB RAM, GTX 1660 Super"
        );
        seedGame(
                "Grand Theft Auto V",
                "Rockstar Games",
                2013,
                "PC / PlayStation 5 / Xbox Series X|S",
                "Action",
                new BigDecimal("149.99"),
                "Trei criminali foarte diferiti isi unesc fortele pentru jafuri periculoase in Los Santos. Include GTA Online.",
                "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg",
                "Minimum: Core 2 Quad Q6600, 4GB RAM, 9800 GT 1GB | Recommended: Core i5 3470, 8GB RAM, GTX 660 2GB"
        );
        seedGame(
                "Overwatch 2",
                "Blizzard Entertainment",
                2022,
                "PC / PlayStation 5 / Xbox Series X|S / Nintendo Switch",
                "Shooter",
                new BigDecimal("0.00"),
                "Un shooter cu eroi, free-to-play, bazat pe echipe de 5v5 cu personaje si harti vibrante.",
                "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/header.jpg",
                "Minimum: Core i3, 6GB RAM, GTX 600 series | Recommended: Core i7, 8GB RAM, GTX 1060 / RTX 2060"
        );
        seedGame(
                "The Witcher 3: Wild Hunt",
                "CD Projekt Red",
                2015,
                "PC / PlayStation / Xbox / Nintendo Switch",
                "RPG",
                new BigDecimal("99.99"),
                "Intra in pielea lui Geralt din Rivia si porneste intr-o calatorie epica pentru a gasi copilul profetiei.",
                "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",
                "Minimum: Core i5-2500K, 6GB RAM, GTX 660 | Recommended: Core i7 3770, 8GB RAM, GTX 770"
        );
        seedGame(
                "Valorant",
                "Riot Games",
                2020,
                "PC",
                "Shooter",
                new BigDecimal("0.00"),
                "Un shooter tactic 5v5 in care gunplay-ul precis se combina cu abilitati unice ale agentilor.",
                "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/8f0df8efd5b986039cd37a4d5f3bf31b815d0c54-3840x2160.jpg",
                "Minimum: Core 2 Duo E8400, 4GB RAM, Intel HD 4000 | Recommended: Core i5-9400F, 8GB RAM, GTX 1050 Ti"
        );
        seedGame(
                "Red Dead Redemption 2",
                "Rockstar Games",
                2018,
                "PC / PlayStation 4 / Xbox One",
                "Action",
                new BigDecimal("179.99"),
                "O poveste epica despre onoare si loialitate in amurgul Vestului Salbatic, cu Arthur Morgan si banda Van der Linde.",
                "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
                "Minimum: Core i5-2500K, 8GB RAM, GTX 770 2GB | Recommended: Core i7-4770K, 12GB RAM, GTX 1060 6GB"
        );
        seedGame(
                "Age of Empires IV",
                "Relic Entertainment",
                2021,
                "PC",
                "Strategy",
                new BigDecimal("179.99"),
                "Unul dintre cele mai iubite jocuri de strategie in timp real revine cu batalii istorice epice.",
                "https://cdn.akamai.steamstatic.com/steam/apps/1466860/header.jpg",
                "Minimum: Core i5-6300U, 8GB RAM, Intel HD 520 | Recommended: Core i5-8400, 16GB RAM, GTX 970"
        );
        seedGame(
                "Black Myth: Wukong",
                "Game Science",
                2024,
                "PC / PlayStation 5",
                "Action",
                new BigDecimal("249.99"),
                "Un Action RPG spectaculos bazat pe mitologia chineza, cu monstri epici si prezentare cinematografica.",
                "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg",
                "Minimum: Core i5-8400, 16GB RAM, GTX 1060 6GB | Recommended: Core i7-9700, 16GB RAM, RTX 2060 / RX 5700"
        );
    }

    private void seedGame(
            String title,
            String publisher,
            int releaseYear,
            String platform,
            String genre,
            BigDecimal estimatedPrice,
            String description,
            String imageUrl,
            String systemRequirements
    ) {
        if (gameRepository.existsByTitleIgnoreCase(title)) {
            return;
        }

        gameRepository.save(new Game(
                title,
                publisher,
                releaseYear,
                platform,
                genre,
                estimatedPrice,
                description,
                imageUrl,
                systemRequirements
        ));
    }
}
