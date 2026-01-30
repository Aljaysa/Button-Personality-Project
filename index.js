// /////////////////////////////////////////////
//              JASON ANIMATIONS              //
// /////////////////////////////////////////////

const jasonButton = document.getElementById("jasonButton");

const jasonAssets = [
    document.getElementById("jasonFire"),
    document.getElementById("jasonFish"),
    document.getElementById("jasonPlant"),
    document.getElementById("jasonPlant2"),
    document.getElementById("jasonPlant3"),
    document.getElementById("jasonComp"),
    document.getElementById("jasonPerson")

];

const wave = document.getElementById("jasonBTNAnimation");
let waveTimeout = null;

let assetsVisible = false;
let isClicked = false


jasonButton.addEventListener("click", () => {
    if (isClicked === false) {
        jasonButton.classList.add("active");
        isClicked = true;
    } else {
        jasonButton.classList.remove("active");
        isClicked = false;
    }

    if (isClicked === true) {
        wave.classList.add("visible");
        clearTimeout(waveTimeout);
        waveTimeout = setTimeout(() => {
            wave.classList.remove("visible");
        }, 5000)

    } else {
        clearTimeout(waveTimeout);
        wave.classList.remove("visible");

    }

    // Hides assests
    if (assetsVisible) {
        jasonAssets.forEach(asset => {
            asset.classList.remove("visible");
        });
        assetsVisible = false;
        // Shows assets on click
    } else {
        jasonAssets.forEach((asset, i) => {
            setTimeout(() => {
                asset.classList.add("visible");
            }, i * 120);
        });
        assetsVisible = true;
    }


});


// /////////////////////////////////////////////
//           JULLIANA ANIMATIONS              //
// /////////////////////////////////////////////

const jullianaAssets = [
    document.getElementById("jullianaLaptop"),
    document.getElementById("jullianaPiano"),
    document.getElementById("jullianaPerson"),
    document.getElementById("jullianaPolaroid"),
    document.getElementById("jullianaVanity"),
    document.getElementById("jullianaMic"),
    document.getElementById("jullianaLuggage")
  ];
  
  const jullianaFlash = document.getElementById("jullianaBTNAnimation");
  
  const jullianaButton = document.getElementById("jullianaButton");
  const jasonBtn = document.getElementById("jasonButton");
  const justinBtn = document.getElementById("justinButton");
  
  let jullianaAssetsVisible = false;
  let currentSize = 0;
  let unlocked = false;
  
  jullianaButton.classList.add("size-0");
  
  jullianaButton.addEventListener("click", () => {
    if (!unlocked) {
      jullianaButton.classList.remove(`size-${currentSize}`);
      currentSize++;
      jullianaButton.classList.add(`size-${currentSize}`);
      if (currentSize >= 4) {
        unlocked = true;
        // Show assets and glow when button reaches full size
        jullianaAssets.forEach((asset, i) => {
          setTimeout(() => {
            asset.classList.add("visible");
          }, i * 120);
        });
        jullianaAssetsVisible = true;

        jasonBtn.classList.add("glow");
        justinBtn.classList.add("glow");
        jullianaFlash.classList.add("visible");
      }
      return;
    }
  
    // Once button at full size
    jullianaButton.classList.add("active");
    // Hide assets and glow
    if (jullianaAssetsVisible) {
      jullianaAssets.forEach(asset => {
        asset.classList.remove("visible");
      });
      jullianaAssetsVisible = false;
  
      jasonBtn.classList.remove("glow");
      justinBtn.classList.remove("glow");
      jullianaFlash.classList.remove("visible");
      // Show assets and glow on click
    } else {
      jullianaAssets.forEach((asset, i) => {
        setTimeout(() => {
          asset.classList.add("visible");
        }, i * 120);
      });
      jullianaAssetsVisible = true;
  
      jasonBtn.classList.add("glow");
      justinBtn.classList.add("glow");
      jullianaFlash.classList.add("visible");
    }
  });
  