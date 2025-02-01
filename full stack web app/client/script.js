import {
  getAndDisplayApiData,
  getFormDataAndCreateUser,
  uploadImages,
} from "./functions.js";

const form = document.querySelector(".element__form");
const upload = document.querySelector("#upload");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav__links");
const dropArea = document.querySelector("#drop-area");

getAndDisplayApiData();
form.addEventListener("submit", getFormDataAndCreateUser);
upload.addEventListener("change", (e) => uploadImages(e.target.files));

dropArea.addEventListener("drop", (e) => {
  preventDefaults(e);
  const files = e.dataTransfer.files;

  if (files.length) {
    uploadImages(files);
    dropArea.classList.remove("drag-over");
  }
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// Preventing default browser behavior when dragging a file over the container
dropArea.addEventListener("dragover", preventDefaults);
dropArea.addEventListener("dragenter", preventDefaults);
dropArea.addEventListener("dragleave", preventDefaults);

dropArea.addEventListener("dragover", () => {
  dropArea.classList.add("drag-over");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("drag-over");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  {
    rootMargin: "0px",
    threshold: [0.1, 0.5, 1],
  }
);

const tags = document.querySelectorAll("header, section");
tags.forEach((tag) => {
  observer.observe(tag);
});


console.log(window.env)