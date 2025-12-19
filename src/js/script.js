const select = document.getElementById("selectSkill");
const skillCategory = document.querySelectorAll(".skills-category");

const header = document.querySelector("header");

const loops = document.querySelectorAll(".loop");

const closeModalContainer = document.querySelector(".close-btn-container");

const closeModalBtn = document.querySelector(".close-btn");
const modalOverlay = document.querySelector(".modal-bg");
const loading = document.querySelector(".loading-container");

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

async function fetchJson() {
  loading.style.visibility = "visible";
  loading.style.opacity = "1";

  try {
    const response = await fetch("src/assets/data/modal-data.json");
    const data = await response.json();

    console.log(data);

    if (data) {
      showModalContent(data);
    } else {
      alert("ERRO AO MOSTRAR DADOS!");
      closeModal();
    }
  } catch {
    alert("ERRO AO FAZER REQUISIÇÃO DOS DADOS!");
    closeModal();
  }
}

async function showModalContent(data) {
  closeModalContainer.style.visibility = "visible";
  closeModalContainer.style.opacity = "1";
}

function openModal() {
  modalOverlay.style.visibility = "visible";
  modalOverlay.style.opacity = "1";
  document.body.classList.add("active");

  fetchJson();
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
