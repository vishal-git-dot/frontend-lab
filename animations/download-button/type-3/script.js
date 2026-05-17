const button = document.getElementById("downloadBtn");

button.addEventListener("click", () => {

  if (
    button.classList.contains("loading") ||
    button.classList.contains("success")
  ) return;

  // Start animation
  button.classList.add("loading");

  // Complete
  setTimeout(() => {

    button.classList.remove("loading");
    button.classList.add("success");

    button.querySelector(".text").textContent = "Downloaded";
    button.querySelector(".arrow").textContent = "✓";

  }, 1800);

});
