const firebaseConfig = {
  apiKey: "AIzaSyDSlypZZQeqZy5Z0hgrVxBDE1x2N_dQThs",
  authDomain: "quiz-b261f.firebaseapp.com",
  projectId: "quiz-b261f",
  storageBucket: "quiz-b261f.appspot.com",
  messagingSenderId: "88952241952",
  appId: "1:88952241952:web:25efa874ad8722acaba145",
};
var app = firebase.initializeApp(firebaseConfig);
// console.log(app)
firebase
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    // console.log(data.val())
      var trVar = document.createElement("tr");
      var tHVar = document.createElement("th");
      var editVar = document.createElement("td");
      var deleteVar = document.createElement("td");

      var editBtn = document.createElement("button");
      var deleteBtn = document.createElement("button");

      editBtn.setAttribute("class", "editBtn");
      deleteBtn.setAttribute("class", "delBtn");

      editBtn.setAttribute("onclick", "editItem(this)");
      editBtn.setAttribute("id", data.val().key);
      deleteBtn.setAttribute("onclick", "delItem(this)");
      deleteBtn.setAttribute("id", data.val().key);



      // var itemVal = document.createTextNode(val.value);
      // var val = document.getElementById("item");
      var itemVal = document.createTextNode(data.val().value);  
      var editBtnTxt = document.createTextNode("Edit");
      var deleteBtnTxt = document.createTextNode("Delete");

      editBtn.appendChild(editBtnTxt);
      deleteBtn.appendChild(deleteBtnTxt);

      tHVar.appendChild(itemVal);
      editVar.appendChild(editBtn);
      deleteVar.appendChild(deleteBtn);

      trVar.appendChild(tHVar);
      trVar.appendChild(editVar);
      trVar.appendChild(deleteVar);

      tHVar.setAttribute("class", "firstTd");
      editVar.setAttribute("class", "secondTd");
      deleteVar.setAttribute("class", "thirdTd");

      var tbVar = document.getElementById("table");
      tbVar.appendChild(trVar);
    
  });
  var randomkey = firebase.database().ref("todos"); //random firebase ki key heee path addresstype
function addItem() {
  var val = document.getElementById("item");
  if (val.value != "") {
  var key = randomkey.push().key;
  var todo = {
    value: val.value,
    key: key,
  };
  randomkey.child(key).set(todo);
  val.value = "";
  }
}

function clearall() {
  var tbData = document.getElementById("table");
  tbData.innerHTML = "";
}
function delItem(e) {
  randomkey.child(e.id).remove();
  e.parentNode.parentNode.remove();
  // console.log(e.id)
}

function editItem(e) {
  // console.log(e.id)
  var litxt = e.parentNode.parentNode.firstChild.firstChild.nodeValue;
  var editLiTxt = prompt("EDIT TODO", litxt);
  var edittodo={
    value:editLiTxt,
    key:e.id
  }
  randomkey.child(e.id).set(edittodo)
  e.parentNode.parentNode.firstChild.firstChild.nodeValue = editLiTxt;
  // console.log(edittodo)
}
