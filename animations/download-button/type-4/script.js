const button = document.getElementById("downloadBtn");

button.addEventListener("click", () => {

  if (
    button.classList.contains("loading") ||
    button.classList.contains("success")
  ) return;

  // Start launch
  button.classList.add("loading");

  // Finish
  setTimeout(() => {

    button.classList.remove("loading");
    button.classList.add("success");

    button.innerHTML = `
      <span class="text">
        ✓ Download Complete
      </span>
    `;

  }, 2200);

});
