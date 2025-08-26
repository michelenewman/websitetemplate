document.addEventListener("DOMContentLoaded", () => {

  // Load YAML
  fetch("data.yml")
    .then(response => response.text())
    .then(yamlText => {
      const data = jsyaml.load(yamlText);

      // Bio
      document.getElementById("bio-text").textContent = data.bio.text;

      // Research
      const researchDiv = document.getElementById("research-list");
      researchDiv.innerHTML = "";
      const ul = document.createElement("ul");
      ul.className = "research-list";
      data.research.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.emoji} ${item.text}`;
        ul.appendChild(li);
      });
      researchDiv.appendChild(ul);

      // My Work buttons
      const workDiv = document.getElementById("my-work-buttons");
      workDiv.innerHTML = "";
      data.my_work.forEach(work => {
        const btn = document.createElement("button");
        btn.className = "work-btn";
        btn.id = work.id;
        btn.textContent = work.name;
        workDiv.appendChild(btn);

        // Add pop-up functionality
        btn.addEventListener("click", () => {
          createProjectPopup(work.name);
        });
      });
    });

  // Bio image pop-ups (90s scattered windows)
  document.getElementById("bio-image").addEventListener("click", () => {
    createFunFactPopup("💡 Fun Fact", "Communities make knowledge fun!");
    createFunFactPopup("✨ Another Fact", "Pop-ups are 90s style!");
  });

  // Zelda Easter Egg
  document.getElementById("egg-icon").addEventListener("click", () => {
    createZeldaPopup();
  });

  /* ---------- Functions to create pop-ups ---------- */
  function createProjectPopup(title) {
    const popup = document.createElement("div");
    popup.className = "project-window projects";
    popup.innerHTML = `
      <div class="window-header">
        <span>${title}</span>
        <button class="close-btn">X</button>
      </div>
      <div class="window-body">
        ${title} content goes here…
      </div>
    `;
    document.body.appendChild(popup);

    popup.querySelector(".close-btn").addEventListener("click", () => popup.remove());
    centerPopup(popup);
    makeDraggable(popup);
  }

  function createFunFactPopup(title, content) {
    const popup = document.createElement("div");
    popup.className = "project-window scattered";
    popup.innerHTML = `
      <div class="window-header">${title}</div>
      <div class="window-body">${content}</div>
    `;
    document.body.appendChild(popup);
    randomPosition(popup);
    makeDraggable(popup);
  }

  function createZeldaPopup() {
    const popup = document.createElement("div");
    popup.className = "egg-window zelda";
    popup.innerHTML = `
      <div class="window-header">🟨 Zelda Easter Egg</div>
      <div class="window-body">
        <div class="scroll-text"><span>🔺 You found the Triforce! 🔺</span></div>
        <p style="color:#6a5acd;">It's dangerous to go alone… take this! 🗡️</p>
        <button class="close-btn">Close</button>
      </div>
    `;
    document.body.appendChild(popup);
    popup.querySelector(".close-btn").addEventListener("click", () => popup.remove());
    centerPopup(popup);
    makeDraggable(popup);
  }

  function centerPopup(popup) {
    popup.style.left = `50%`;
    popup.style.top = `50%`;
    popup.style.transform = `translate(-50%, -50%)`;
  }

  function randomPosition(popup) {
    const x = Math.random() * (window.innerWidth - 250);
    const y = Math.random() * (window.innerHeight - 150);
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
  }

  /* ---------- Simple draggable functionality ---------- */
  function makeDraggable(el) {
    let isDragging = false;
    let offsetX, offsetY;

    const header = el.querySelector(".window-header");
    header.style.cursor = "move";

    header.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      el.style.zIndex = 3000;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener("mouseup", () => { isDragging = false; });
  }
});
