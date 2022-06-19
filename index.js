// VARIABLES

const seedColor = document.getElementById("seed-color-value");
const schemeBtn = document.getElementById("scheme-btn");
const colorScheme = document.getElementById("color-scheme");
const colorDiv = document.getElementById("color-div");

let clipBoard = document.getElementById("clipboardTextarea");
let schemeMode = "";
let colorsList = [];

// SELECT SCHEME

colorScheme.addEventListener("change", () => {
  function scheme() {
    schemeMode = colorScheme.value;
  }
  scheme();
});

// GET COLOR SCHEME

schemeBtn.addEventListener("click", () => {
  const value = {
    seedcolor: seedColor.value.slice(1, 7),
    mode: schemeMode,
  };

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${value.seedcolor}&mode=${value.mode}`
  )
    .then((res) => res.json())
    .then((data) => {
      let colorsList = [];
      colorDiv.innerHTML = "";

      for (i = 0; i < 5; i++) {
        colorsList.push(data.colors[i].hex.value);
        colorDiv.innerHTML += `<div class="color copy">
                              <div class="hex-code-div">
                              <p class="hex-code">${colorsList[i]}</p>
                              </div>
                               <div class="bar bar-scheme div-1" style="background:${colorsList[i]}"></div>
                               </div>`;
      

      // COPY HEX CODE

      const hexCode = document.querySelectorAll(".hex-code")
      const copyHex = document.querySelectorAll(".copy");

      for (let i = 0; i < copyHex.length; i++) {
        copyHex[i].addEventListener("click", () => {
          clipBoard.value = colorsList[i];
          clipBoard.select();
          clipBoard.setSelectionRange(0, 99999);
          navigator.clipboard.writeText(clipBoard.value);
          hexCode[i].textContent = "Copied!";

        });
        
        copyHex[i].addEventListener("mouseleave", ()=>{
          hexCode[i].textContent = colorsList[i];
        })


      }
    }
    });
});
