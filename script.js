function search() {
  return new Promise((resolve, reject) => {
    const odgovor = document.querySelector("#Unos");
    /*https://developers.google.com/custom-search/v1/introduction from this link you get api key*/
    const API_KEY = "";
    /*https://programmablesearchengine.google.com/controlpanel/all from this link make a project and get Search engine ID*/
    const CX = "";
    const query = `weight of ${odgovor.value} in kg`;

    fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        const results = data.items;
        const regex = /\b\d+(?:,\d+)*(?:\.\d+)?(?=\s*(?:kg|kilograms|tons|ton|pounds|lbs|pound|grams|gram|t|g))/;
        const str = results[0].snippet;
        const match = str.match(regex);

        if (match) {
          const value = match[0];
          const unitRegex = /\s*(?:kg|kilograms|tons|ton|pounds|lbs|pound|grams|gram|t|g)/;
          const unitMatch = str.substring(match.index + match[0].length).match(unitRegex);
          if (unitMatch) {
            const unit = unitMatch[0].trim();
            resolve([str, value, unit]);
          } else {
            alert(`${odgovor.value} nije pronadjeno`)
          }
        } else {
          alert(`${odgovor.value} nije pronadjeno`)
        }
      })
      .catch((err) => alert(`${odgovor.value} nije pronadjeno`));
  });
}

document.querySelector("#Pretrazi").addEventListener("click", async function () {
    search().then(([str, value, unit]) => {
      console.log(str);
      console.log(value, unit);

      const inputGroup = document.createElement("div");
      inputGroup.classList.add("input-group");

      const textarea1 = document.createElement("textarea");
      textarea1.style.width = "500px";
      textarea1.classList.add("form-control", "text-center");
      textarea1.id = "Unos";
      textarea1.textContent = `${value}`;
      textarea1.style.fontSize = "60px";

      const span = document.createElement("span");
      span.classList.add("input-group-text");
      span.id = "basic-addon2";
      span.textContent = unit;

      const textarea2 = document.createElement("textarea");
      textarea2.style.width = "600px";
      textarea2.style.height = "500px";
      textarea2.classList.add("form-control", "m-5");
      textarea2.id = "Unos";
      textarea2.textContent = `${str}`;

      inputGroup.appendChild(textarea1);
      inputGroup.appendChild(span);

      const container = document.getElementById("import");
      container.innerHTML = "";
      container.appendChild(inputGroup);
      container.appendChild(textarea2);
  });
});

document.getElementById('btnradio1').addEventListener('click', function() {
  document.querySelector('#body').classList.remove("bg-light")
  document.querySelector('#body').classList.add("bg-dark") 

  document.querySelector('#search').classList.remove("text-dark")
  document.querySelector('#search').classList.add("text-white")
});
document.getElementById('btnradio2').addEventListener('click', function() {
  document.querySelector('#body').classList.remove("bg-dark")
  document.querySelector('#body').classList.add("bg-light") 

  document.querySelector('#search').classList.remove("text-white")
  document.querySelector('#search').classList.add("text-dark")
});