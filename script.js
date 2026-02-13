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
  setupFormHandler();
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

function handleLike(bookmarkIndex) {
  if (!currentUser) {
    alert("Please select a user to like bookmarks.");
    return;
  }

  const bookmarks = getData(currentUser) || [];

  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  sortedBookmarks[bookmarkIndex].likes =
    (sortedBookmarks[bookmarkIndex].likes || 0) + 1;

  setData(currentUser, sortedBookmarks);
  renderBookmarks();
}
function setupFormHandler() {
  const bookmarkForm = document.querySelector("#bookmark-form");

  bookmarkForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!currentUser) {
      alert("Please select a user first!");
      return;
    }

    const urlEl = document.getElementById("url");
    const titleEl = document.getElementById("title");
    const descriptionEl = document.getElementById("description");

    const url = urlEl.value;
    const title = titleEl.value;
    const description = descriptionEl.value;

    const bookmarks = getData(currentUser) || [];

    const newBookmark = {
      url: url,
      title: title,
      description: description,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    bookmarks.push(newBookmark);
    setData(currentUser, bookmarks);

    urlEl.value = "";
    titleEl.value = "";
    descriptionEl.value = "";

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

function createBookmarkCard(bookmark, index) {
  const card = document.createElement("div");
  card.className = "bookmark-card";

  const title = document.createElement("h3");
  const link = document.createElement("a");
  link.href = bookmark.url;
  link.textContent = bookmark.title;
  link.target = "_blank";
  title.appendChild(link);

  const description = document.createElement("p");
  description.textContent = bookmark.description;

  const timestamp = document.createElement("p");
  const date = new Date(bookmark.createdAt);
  timestamp.textContent = `Created at: ${date.toLocaleString()}`;

  const likeContainer = document.createElement("div");
  likeContainer.className = "like-container";

  const likeButton = document.createElement("button");
  likeButton.textContent = "Like";
  likeButton.type = "button";

  const likeCount = document.createElement("span");
  likeCount.textContent = ` ${bookmark.likes || 0} likes`;

  likeButton.addEventListener("click", function () {
    handleLike(bookmarkIndex);
  });

  likeContainer.appendChild(likeButton);
  likeContainer.appendChild(likeCount);

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(timestamp);
  card.appendChild(likeContainer);

  return card;
}
