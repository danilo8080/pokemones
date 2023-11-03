const CACHE_NAME = "my-cache";

const urlsToCache = [
  "/",
  "/pokemones/index.html",
  "/pokemones/styles.css",
  "/pokemones/app.js",
  "/pokemones/img/fondoPokemon.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("cache done");
        return cache.addAll(urlsToCache);
      })
  );
});



