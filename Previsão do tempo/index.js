const input = document.querySelector("#input");
const button = document.querySelector("#button");
const app = document.querySelector(".app");
const conteudo = document.querySelector(".conteudo");
const info = document.querySelector(".info");
const errorBox = document.querySelector(".error-box");

const key_API = CONFIG.API_KEY;

button.addEventListener(`click`, () => {
  const cidade = input.value;

  input.value = "";

  async function buscar() {
    const dados = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key_API}&units=metric&lang=pt_br`,
    );
    const resultado = await dados.json();

    console.log(resultado);
    if (resultado.cod === "404") {
      app.classList.add("fadeIn");
      errorBox.classList.add("fadeIn");
      errorBox.style.display = "block";
      app.style.height = "300px";
    } else {
      app.classList.add("fadeIn");
      errorBox.classList.remove("fadeIn");
      errorBox.style.display = "none";
      app.style.height = "660px";
      info.classList.add("fadeIn");
      conteudo.classList.add("fadeIn");

      const infoHtml = `<div class="vento">
                        <i class="fa-solid fa-wind"></i>
                        <span>Vento</span>
                        <p>${resultado.wind.speed}Km/h</p>
                    </div>
                    <div class="humidade">
                        <i class="fa-solid fa-droplet-slash"></i>
                        <span>humidade</span>
                        <p>${resultado.main.humidity}%</p>
                    </div>`;
      switch (resultado.weather[0].main) {
        case "Clouds":
          conteudo.innerHTML = `<img src="./img/cloud.png" alt="">
                <span>${parseInt(resultado.main.temp)} °C</span>
                <p>${resultado.weather[0].description}</p>`;
          info.innerHTML = infoHtml;
          break;
        case "Clear":
          conteudo.innerHTML = `<img src="./img/clear.png" alt="">
                <span>${parseInt(resultado.main.temp)} °C</span>
                <p>${resultado.weather[0].description}</p>`;
          info.innerHTML = infoHtml;
          break;
        case "Rain":
          conteudo.innerHTML = `<img src="./img/rain.png" alt="">
                <span>${parseInt(resultado.main.temp)} °C</span>
                <p>${resultado.weather[0].description}</p>`;
          info.innerHTML = infoHtml;
          break;
        case "Snow":
          conteudo.innerHTML = `<img src="./img/snow.png" alt="">
                <span>${parseInt(resultado.main.temp)} °C</span>
                <p>${resultado.weather[0].description}</p>`;
          info.innerHTML = infoHtml;
          break;
        case "Haze":
          conteudo.innerHTML = `<img src="./img/mist.png" alt="">
                <span>${parseInt(resultado.main.temp)} °C</span>
                <p>${resultado.weather[0].description}</p>`;
          info.innerHTML = infoHtml;
          break;
        default:
          conteudo.innerHTML = `<img src="./img/" alt="">`;
          break;
      }
    }
  }
  buscar();
});
