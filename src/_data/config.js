export default {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://www.anttikivi.fi"
      : process.env.NODE_ENV === "staging"
        ? "https://staging.anttikivi.fi"
        : "http://localhost:8080",
  description: "Viestintäasiantuntija, yrittäjä ja ylioppilas",
  disabledLocales: [],
  locales: ["en", "fi"],
  socialMedia: {
    githubUrl: "https://github.com/anttikivi",
    instagramUrl: "https://www.instagram.com/anttikiwi/",
    threadsUrl: "https://www.threads.net/@anttikiwi",
  },
  subtitle: "Viestinnän asiantuntija",
  title: "Antti Kivi",
};
