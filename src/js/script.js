const select = document.getElementById("selectSkill");
const skillCategory = document.querySelectorAll(".skills-category");
const toggleBtn = document.getElementById("toggleBtn");

const header = document.querySelector("header");

const loops = document.querySelectorAll(".loop");

const closeModalContainer = document.querySelector(".close-btn-container");

const closeModalBtn = document.querySelector(".close-btn");
const modalOverlay = document.querySelector(".modal-bg");
const loading = document.querySelector(".loading-container");

const projectTitle = document.querySelector(".project-title");
const projectPhotos = document.querySelector(".project-photos");

const projectInfo = document.querySelector(".project-container-info");

const periodContainer = document.querySelector(".period");
const problemsContainer = document.querySelector(".problems");
const functionalitiesContainer = document.querySelector(".functionalities");
const technologiesContainer = document.querySelector(".technologies");
const projectBtnsContainer = document.querySelector(".project-btns-container");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
});
document
  .querySelectorAll(
    ".skills-select, .project-content, .about-content, #contact-me"
  )
  .forEach((el) => observer.observe(el));

window.addEventListener("scroll", () => {
  scrollY > 100
    ? header.classList.add("scroll")
    : header.classList.remove("scroll");
});

const html = document.documentElement;

function changeMode() {
  const img = toggleBtn.querySelector("img");
  const mode = html.dataset.theme;

  html.dataset.theme = mode === "light" ? "dark" : "light";

  img.src =
    mode === "light"
      ? "src/assets/images/moon-fill.svg"
      : "src/assets/images/brightness-high-fill.svg";
  img.alt =
    mode === "light"
      ? "Imagem de lua. Modo Escuro"
      : "Imagem de sol. Modo Claro";
}

function selectCategory() {
  cleanCategory();

  const value = select.value;

  switch (value) {
    case "Front-end":
      skillCategory[0].style.display = "flex";
      break;
    case "Back-end-DB":
      skillCategory[1].style.display = "flex";
      break;
    case "Frameworks":
      skillCategory[2].style.display = "flex";
      break;
    case "Ferramentas":
      skillCategory[3].style.display = "flex";
      break;
  }
}

function cleanCategory() {
  skillCategory.forEach((skill) => (skill.style.display = "none"));
}

select.addEventListener("change", selectCategory);

loops.forEach((loop) => (loop.innerHTML += loop.innerHTML));

async function fetchJson(index) {
  loading.style.visibility = "visible";
  loading.style.opacity = "1";

  try {
    const response = await fetch("src/assets/data/modal-data.json");
    const data = await response.json();

    console.log(data);

    if (data) {
      loading.style.visibility = "hidden";
      loading.style.opacity = "0";
      showModalContent(data, index);
    } else {
      alert("ERRO AO MOSTRAR DADOS!");
      closeModal();
    }
  } catch {
    alert("ERRO AO FAZER REQUISIÇÃO DOS DADOS!");
    closeModal();
  }
}

async function showModalContent(data, index) {
  closeModalContainer.style.visibility = "visible";
  closeModalContainer.style.opacity = "1";

  clearHtml(
    projectTitle,
    projectPhotos,
    periodContainer,
    problemsContainer,
    functionalitiesContainer,
    technologiesContainer,
    projectBtnsContainer
  );

  const modal = data.modals[index];

  const title = modal.projectTitle.title;
  const titleSpan = modal.projectTitle.titleSpan;

  projectTitle.innerHTML = `<h2 style="color:${modal.projectTitle.color1}">${title}<span style="color:${modal.projectTitle.color2}">${titleSpan}</span></h2>
                            <h3>${modal.projectTitle.description}</h3>`;

  projectPhotos.innerHTML = `<img class="project-photo" src="${modal.projectPhotos[0].src}" alt="${modal.projectPhotos[0].alt}">
                             <img class="project-photo" src="${modal.projectPhotos[1].src}" alt="${modal.projectPhotos[1].alt}">`;
  periodContainer.innerHTML = `<h2>${modal.period}</h2>`;

  const problems = modal.projectResolvedProblems
    .map((problem) => `<li>${problem}</li>`)
    .join("");

  problemsContainer.innerHTML = `<h2>Problemas Resolvidos:</h2>
                                 <ul class="problem-list">
                                  ${problems}
                                 </ul>`;
  const functionalities = modal.functionalities
    .map((func) => `<li>${func}</li>`)
    .join("");

  functionalitiesContainer.innerHTML = `<h2>Funcionalidades:</h2>
                                        <ul>
                                          ${functionalities}
                                        </ul>`;

  const technologies = modal.technologies
    .map(
      (technology) =>
        `<li><img class="technology-li" src="${technology.src}" alt="${technology.alt}"></li>`
    )
    .join("");

  technologiesContainer.innerHTML = `<h2>Tecnologias Utilizadas:</h2>
                                     <ul class="technology-ul">
                                      ${technologies}
                                     </ul>`;

  projectBtnsContainer.innerHTML = `<button class="project-btn">
                                      <a target="_blank" href="${modal.acessButtons[0].href}">
                                        <p>GITHUB <i class="devicon-github-original"></i><p>
                                      </a>
                                    </button>
                                    <button class="project-btn">
                                      <a target="_blank" href="${modal.acessButtons[1].href}">
                                        <p>VER PROJETO<p>
                                      </a>
                                    </button>`;

  const accessButton2 = document.querySelectorAll(".project-btn")[1];

  if (index === 1) {
    accessButton2.addEventListener("click", (e) => {
      e.preventDefault();
      alert(
        "PARA ACESSAR O PROJETO, PRIMEIRO ENTRE NO GITHUB E LEIA AS INSTRUÇÕES!"
      );
    });
  }
}

function openModal(index) {
  modalOverlay.style.visibility = "visible";
  modalOverlay.style.opacity = "1";
  document.body.classList.add("active");

  fetchJson(index);
}

function closeModal() {
  modalOverlay.style.visibility = "hidden";
  modalOverlay.style.opacity = "0";

  loading.style.visibility = "hidden";
  loading.style.opacity = "0";

  closeModalContainer.style.visibility = "hidden";
  closeModalContainer.style.opacity = "0";

  document.body.classList.remove("active");
}

function clearHtml(...elements) {
  elements.forEach((e) => {
    e.innerHTML = "";
  });
}
