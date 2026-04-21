package com.yourcompany.memnar.controller; // Make sure to change this to your actual package name

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

// This annotation is crucial for allowing requests from your frontend (e.g., http://localhost:5173)
// Adjust the port if your React development server uses a different one.
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class ConfigController {

    // This will store the configuration in a file named "memnar_config.json" in the application's root directory.
    private static final Path CONFIG_PATH = Paths.get("memnar_config.json");
    private final ObjectMapper objectMapper = new ObjectMapper();

    // This class represents the structure of your configuration object.
    // It's good practice to use a class like this for type safety.
    // You can also move this to its own file (e.g., com/yourcompany/memnar/model/Config.java)
    public static class Config {
        public double minSupp;
        public double minConf;
        public boolean findConditionalMutualExclusiveSets;
        public boolean findMutualExclusiveSets;
        public int minZScore;
        public int maxSetSize;
        public double pValueCutoff;
        public boolean sortByPathway;
        public String tumorsOfInterest;
    }

    @GetMapping("/config")
    public Config getConfig() {
        if (Files.exists(CONFIG_PATH)) {
            try {
                // Spring Boot with Jackson on the classpath will automatically convert the JSON to a Config object.
                return objectMapper.readValue(CONFIG_PATH.toFile(), Config.class);
            } catch (IOException e) {
                // Log the error and fall back to default
                System.err.println("Error reading config file, returning default: " + e.getMessage());
                return createDefaultConfig();
            }
        }
        // If the file doesn't exist, return a default configuration.
        return createDefaultConfig();
    }

    @PostMapping("/config")
    public void saveConfig(@RequestBody Config config) throws IOException {
        // serialize the received Config object back to a JSON string to save it.
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(CONFIG_PATH.toFile(), config);
    }

    private Config createDefaultConfig() {
        Config defaultConfig = new Config();
        defaultConfig.minSupp = 0.1;
        defaultConfig.minConf = 0.5;
        defaultConfig.findConditionalMutualExclusiveSets = true;
        defaultConfig.findMutualExclusiveSets = true;
        defaultConfig.minZScore = -10;
        defaultConfig.maxSetSize = 6;
        defaultConfig.pValueCutoff = 1.0;
        defaultConfig.sortByPathway = false;
        defaultConfig.tumorsOfInterest = "other";
        return defaultConfig;
    }
}
