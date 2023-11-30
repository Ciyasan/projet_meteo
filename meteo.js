document.addEventListener("DOMContentLoaded", function () {
  // Récupérer la configuration de la ville depuis conf.json
  function meteo() {
    fetch("conf.json")
      .then((response) => response.json())
      .then((data) => {
        const ville = data.ville;
        const apiKey = data.apiKey;

        // Utiliser l'API météo pour récupérer les données
        const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${ville}`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((weatherData) => {
            // Affichage des données météo dans la div #meteo
            const meteoElement = document.getElementById("meteo");
            meteoElement.innerHTML = `
                      <h2>Météo à ${ville}</h2>
                      <p>à ${weatherData.current.observation_time}</p>
                      <p>Température: ${weatherData.current.temperature}°C</p>
                      <img src=${weatherData.current.weather_icons} alt="Image illustrant la météo actuelle">
                      <p>Conditions: ${weatherData.current.weather_descriptions[0]}</p>
                  `;
          })
          //Affichage des erreurs en console
          .catch((error) =>
            console.error(
              "Erreur lors de la récupération des données météo:",
              error
            )
          );
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération de la configuration de la ville:",
          error
        )
      );
  }
  // Appeler la fonction pour la première fois au chargement de la page
  meteo();

  // Mise à jour des données toutes les heures
  const interval = 3600000; // 1 heure
  setInterval(meteo, interval);
});
