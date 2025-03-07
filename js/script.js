// Código principal da aplicação
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa os eventos depois que o DOM estiver carregado
  initializeEvents();
});

function initializeEvents() {
  document
    .getElementById("search-btn")
    .addEventListener("click", searchMotorcycle);
  document
    .getElementById("motorcycle-model")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        searchMotorcycle();
      }
    });
}

function searchMotorcycle() {
  const modelInput = document
    .getElementById("motorcycle-model")
    .value.toLowerCase()
    .trim();
  const resultContainer = document.getElementById("result-container");
  const modelName = document.getElementById("model-name");
  const leftVolume = document.getElementById("left-volume");
  const rightVolume = document.getElementById("right-volume");
  const recommendation = document.getElementById("recommendation");

  // Limpar resultados anteriores
  resultContainer.classList.remove("active");

  if (modelInput === "") {
    alert("Por favor, digite um modelo de motocicleta.");
    return;
  }

  // Buscar no banco de dados
  const foundMotorcycle = findMotorcycle(modelInput);

  if (foundMotorcycle) {
    // Mostrar os resultados
    modelName.textContent = formatModelName(foundMotorcycle.model);
    leftVolume.textContent = foundMotorcycle.leftVolume;
    rightVolume.textContent = foundMotorcycle.rightVolume;
    recommendation.innerHTML = `<p>Recomendação: ${foundMotorcycle.recommendation}</p>`;

    resultContainer.classList.add("active");
  } else {
    // Mostrar mensagem de não encontrado
    modelName.textContent = formatModelName(modelInput);
    leftVolume.textContent = "N/A";
    rightVolume.textContent = "N/A";
    recommendation.innerHTML = `
            <p class="not-found">Modelo não encontrado em nosso banco de dados.</p>
            <p>Sugestões:</p>
            <ul>
                <li>Verifique a ortografia do modelo.</li>
                <li>Tente buscar pela marca e modelo (ex: Honda CB500F).</li>
                <li>Consulte o manual do proprietário para informações precisas.</li>
            </ul>
        `;

    resultContainer.classList.add("active");
  }
}

function findMotorcycle(searchTerm) {
  // Busca por correspondência parcial no banco de dados
  return motorcycleDatabase.find(
    (moto) => moto.model.includes(searchTerm) || searchTerm.includes(moto.model)
  );
}

function formatModelName(modelName) {
  return modelName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
