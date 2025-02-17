import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
import {
  ref,
  get,
  set,
  child,
  remove,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzisxZ8gcTdWuqAzHVdfOeQl-LUdZqpww",
  authDomain: "webdev-firebase-practice.firebaseapp.com",
  databaseURL:
    "https://webdev-firebase-practice-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webdev-firebase-practice",
  storageBucket: "webdev-firebase-practice.firebasestorage.app",
  messagingSenderId: "347280382857",
  appId: "1:347280382857:web:170d7a45c65579ed7a9f58",
  measurementId: "G-2Z4WSV30D5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function deleteItem(category, id) {
  remove(ref(db, `items/${category}/${id}`))
    .then(() => {
      alert("Item deleted successfully");
      document.getElementById("search-button").click();
    })
    .catch((error) => {
      console.log(error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  var add_item_input = document.getElementById("add-item");
  var add_item_button = document.getElementById("add-item-button");
  var category_input = document.getElementById("category");
  var brand_input = document.getElementById("brand");
  var description_input = document.getElementById("description");
  var search_input = document.getElementById("search");
  var search_button = document.getElementById("search-button");
  var items_list = document.getElementById("items-list");

  add_item_button.addEventListener("click", function () {
    var item = add_item_input.value;
    var category = category_input.value;
    var brand = brand_input.value;
    var description = description_input.value;
    var date = new Date();
    var id = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

    set(ref(db, `items/${category}/${id}`), {
      name: item,
      brand: brand,
      description: description,
      date: date.toUTCString(),
    })
      .then(() => {
        alert("Data added successfully");
      })
      .catch((error) => {
        console.log(error);
      });

    add_item_input.value = "";
    category_input.value = "";
    brand_input.value = "";
    description_input.value = "";
  });

  search_button.addEventListener("click", function () {
    var search = search_input.value;
    if (search === "") {
      alert("Enter an item to search");
      return;
    } else {
      get(child(ref(db), `items/${search}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            var data = snapshot.val();
            items_list.innerHTML = "";
            for (var id in data) {
              items_list.innerHTML += `<li>${data[id].name} - ${data[id].brand} - ${data[id].description} - ${data[id].date} <button class="delete-button" data-category="${search}" data-id="${id}">Retrieve</button></li>`;
            }
          } else {
            items_list.innerHTML = "No item found";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  items_list.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-button")) {
      var category = e.target.getAttribute("data-category");
      var id = e.target.getAttribute("data-id");
      deleteItem(category, id);
    }
  });
});

export { db };
