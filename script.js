// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, setData, getData } from "./storage.js";

const bookmarkForm = document.querySelector("#bookmark-form");
const addBookmarkSelectEl = document.querySelector("#select-user");
getUserIds().map((user) => {
  const optionEl = document.createElement("option");
  optionEl.id = "add-bookmark-" + user;
  optionEl.value = user;
  optionEl.innerText = user;
  addBookmarkSelectEl.appendChild(optionEl);
});

bookmarkForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const urlEl = document.querySelector("#url");
  const titleEl = document.querySelector("#title");
  const descriptionEl = document.querySelector("#description");
  const id = addBookmarkSelectEl.value;
  const url = urlEl.value;
  const title = titleEl.value;
  const description = descriptionEl.value;
  setData(id, { id, url, title, description });
  urlEl.value = "";
  titleEl.value = "";
  descriptionEl.value = "";
});

let currentUser = null;

window.onload = function () {
  populateUserDropdown();
  setupUserSelection();
};

function populateUserDropdown() {
  const users = getUserIds();
  const dropdown = document.getElementById("user-select");

  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    dropdown.appendChild(option);
  });
}

function setupUserSelection() {
  const dropdown = document.getElementById("user-select");

  dropdown.addEventListener("change", function (event) {
    const selectedUserId = event.target.value;
    currentUser = selectedUserId || null;
  });
}
