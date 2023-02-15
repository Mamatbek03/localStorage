let inpName = document.querySelector("#name");
let email = document.querySelector("#email");
let img = document.querySelector("#img");
let phone = document.querySelector("#phone");
let btn = document.querySelector(".btn");
let list = document.querySelector(".list");

console.log(inpName, email, img, phone);
btn.addEventListener("click", () => {
  if (
    !inpName.value.trim() ||
    !email.value.trim() ||
    !img.value.trim() ||
    !phone.value.trim()
  ) {
    alert("Error");
    return;
  }

  let obj = {
    name: inpName.value,
    email: email.value,
    img: img.value,
    phone: phone.value,
  };
  setItemToStorage(obj);
  inpName.value = "";
  email.value = "";
  img.value = "";
  phone.value = "";
  createElement();
});
createElement();
function setItemToStorage(elem) {
  if (!localStorage.getItem("person-data")) {
    localStorage.setItem("person-data", "[]");
  }
  let data = JSON.parse(localStorage.getItem("person-data"));
  data.push(elem);
  localStorage.setItem("person-data", JSON.stringify(data));
}
function createElement() {
  if (!localStorage.getItem("person-data")) {
    localStorage.setItem("person-data", "[]");
  }
  let newData = JSON.parse(localStorage.getItem("person-data"));
  list.innerHTML = "";
  newData.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML += `<div class='person'><img src='${item.img}'></img>
    <div id=${index} class='person-info'>
    <h5>${item.name}</h5>
    <p>${item.email}</p>
    <p>${item.phone}</p>
    <button class='btnEdit'>Edit</button>
    <button class='btnDelete'>Delete</button>
    </div>

    <div class='modal'>
      <button id=${index} class="btn-edit-close">X</button>
   
    <input
          type="text"
          class="inp-edit inp-name"
          placeholder="Имя"
        />
        <input
          type="text"
          class="inp-edit inp-email"
          placeholder="электронная почта"
        />
        <input
          type="tel"
          class="inp-edit inp-phone"
          placeholder="номер телефона"
        />
        <input
          type="text"
          class="inp-edit inp-img"
          class=''
          placeholder="ссылка картинки"
        />
        <button class='btn-edit'>Change</button>
    </div>
    </div>`;
    // console.log(btnDelete.value);
    // btnDelete.innerText = "Delete";
    // btnEdit.innerText = "Edit";
    // li.append(btnDelete);
    // li.append(btnEdit);
    list.append(li);

    let btnDelete = document.getElementsByClassName("btnDelete");
    let btnEdit = document.getElementsByClassName("btnEdit");
    let btnEditClose = document.getElementsByClassName("btn-edit-close");

    btnDelete[index].addEventListener("click", () => {
      deleteElement(index);
    });
    btnEdit[index].addEventListener("click", () => {
      // let personInfo = document.querySelector(".person-info");
      // let modal = document.querySelector(".modal");
      // personInfo.style.display = "none";
      // modal.style.display = "block";
      editElement(index);
    });
    btnEditClose[index].addEventListener("click", () => {
      // let personInfo = document.querySelector(".person-info");
      // let modal = document.querySelector(".modal");
      // personInfo[index].style.display = "block";
      // modal[index].style.display = "none";
      closeEditModal(index);
    });
    // btnEdit.addEventListener("click", () => {});
  });
}
function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("person-data"));
  data.splice(index, 1);
  localStorage.setItem("person-data", JSON.stringify(data));
  createElement();
}
// modal
let personInfo = document.getElementsByClassName("person-info");
let modal = document.getElementsByClassName("modal");
let test = document.getElementsByTagName("input");
let inpNewName = document.querySelector(".inp-name");
let inpEmail = document.querySelector(".inp-email");
let inpPhone = document.querySelector(".inp-phone");
let inpImg = document.querySelector(".inp-img");

console.log(inpNewName);
function editElement(index) {
  personInfo[index].style.display = "none";
  modal[index].style.display = "block";
  let data = JSON.parse(localStorage.getItem("person-data"));

  test[4 * index + 4].value = data[index].name;
  test[4 * index + 5].value = data[index].email;
  test[4 * index + 6].value = data[index].phone;
  test[4 * index + 7].value = data[index].img;

  // inpEmail.value = data[index].email;
  // inpPhone.value = data[index].phone;
  // inpImg.value = data[index].img;
  // inpNewName.setAttribute("id", index);
}

function closeEditModal(index) {
  personInfo[index].style.display = "block";
  modal[index].style.display = "none";
}

let btnNewEdit = document.querySelector(".btn-edit");
btnNewEdit.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("person-data"));
  let index = inpNewName.id;
  console.log(inpNewName);
  if (
    !inpNewName.value.trim() ||
    !inpEmail.value.trim() ||
    !inpPhone.value.trim() ||
    !inpImg.value.trim()
  ) {
    alert("Заполните поле!");
    return;
  }
  let editedTask = {
    name: inpNewName.value,
    email: inpEmail.value,
    imageUrl: inpImg.value,
    phone: inpPhone.value,
  };
  data.splice(index, 1, editedTask);
  localStorage.setItem("person-data", JSON.stringify(data));
  personInfo[index].style.display = "block";
  modal[index].style.display = "none";
  createElement();
});
