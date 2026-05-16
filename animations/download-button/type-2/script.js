const button = document.getElementById("downloadBtn");

button.addEventListener("click", () => {

  if (
    button.classList.contains("loading") ||
    button.classList.contains("success")
  ) return;

  // Start loading
  button.classList.add("loading");

  // Fake download
  setTimeout(() => {

    button.classList.remove("loading");
    button.classList.add("success");

    button.querySelector(".btn-text").textContent = "✓ Downloaded";

  }, 2500);

});
