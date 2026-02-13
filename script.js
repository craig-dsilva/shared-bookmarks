// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData } from "./storage.js";

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
    renderBookmarks();
  });
}

function renderBookmarks() {
  const container = document.getElementById("bookmarks-container");
  container.innerHTML = "";

  if (!currentUser) {
    return;
  }

  const bookmarks = getData(currentUser) || [];

  if (bookmarks.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No bookmarks found for this user.";
    container.appendChild(emptyMessage);
    return;
  }

  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  sortedBookmarks.forEach((bookmark, index) => {
    const card = createBookmarkCard(bookmark, index);
    container.appendChild(card);
  });
}
