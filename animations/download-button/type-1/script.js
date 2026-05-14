const button = document.getElementById("downloadBtn");

button.addEventListener("click", () => {

  // Prevent multiple clicks
  if (
    button.classList.contains("loading") ||
    button.classList.contains("success")
  ) return;

  // Start loading
  button.classList.add("loading");

  button.querySelector(".icon").textContent = "↻";

  // Fake loading delay
  setTimeout(() => {

    button.classList.remove("loading");
    button.classList.add("success");

    button.querySelector(".btn-text").textContent = "Downloaded";
    button.querySelector(".icon").textContent = "✓";

  }, 2500);

});
