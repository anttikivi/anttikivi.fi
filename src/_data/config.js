export default {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://www.anttikivi.fi"
      : process.env.NODE_ENV === "staging"
        ? "https://staging.anttikivi.fi"
        : "http://localhost:8080",
  description: "Viestintäasiantuntija, yrittäjä ja ylioppilas",
  subtitle: "Viestinnän asiantuntija",
  title: "Antti Kivi",
};
