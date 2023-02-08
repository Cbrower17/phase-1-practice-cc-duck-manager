// write your code here!
//when the dom is loaded in populate the page with some ducks
let currentDuck;
let likeBtn = document.querySelector("#duck-display-likes");
//got frustratged not sure why the button was being clicked twice so i moved it here//
likeBtn.addEventListener("click", () => {
    likeDuck();
  });
document.addEventListener("DOMContentLoaded", function () {
  //fetch the ducks!
  return (
    fetch("http://localhost:3000/ducks")
      //pares the return as json
      .then((res) => res.json())
      //turn data into duck array
      .then((ducks) => {
        //iterate foreach duck add the duck to the nav #duck-nav
        console.log(ducks);
        duckDisplay(ducks[0]);
        addDuck();
        ducks.forEach((duck) => {
          //duck function time!
          //handler function to show duck pics
          renderDuck(duck);
        });
      })
  );
});

//handler functions

//function to show ducks in the nav
//renderDuck take in a duck
function renderDuck(duck) {
  //create duck img
  let duckImg = document.createElement("img");

  //make duck image duck img_url
  duckImg.setAttribute("src", duck.img_url);
  document.querySelector("#duck-nav").appendChild(duckImg);
  //add event listener to show duck when clicked
  duckImg.addEventListener("click", () => {
    duckDisplay(duck);
  });
}

//once a duck is clicked, show the ducks details
function duckDisplay(duck) {
  //assing value to gloabl variable, currentDuck
  currentDuck = duck;
  //make button easier to work with by creating variable

  //update display value with query selector
  document.querySelector("#duck-display-name").textContent = currentDuck.name;
  document.querySelector("#duck-display-image").src = currentDuck.img_url;
  document.querySelector("#duck-display-likes").textContent = `${currentDuck.likes} likes`;
  //add event listener to like button to increment
//   likeBtn.addEventListener("click", () => {
//     likeDuck();
//     debugger;
//   });
}
//on click add one like to total

function likeDuck() {
  console.log(currentDuck.likes);
  //increment likes by 1
  //debugger;
  currentDuck.likes++;
  console.log(currentDuck.likes + "after");
  //update display by calling displayDuck
  // duckDisplay(currentDuck);

  document.querySelector("#duck-display-likes").textContent = `${currentDuck.likes} likes`;
}
//create a function to add a new duck to the page
//take info from the newduckform and feed it into a duck object
function addDuck() {
  //capture form
  let duckForm = document.querySelector("#new-duck-form");
  duckForm.addEventListener("submit", (e) => {
    //prevent the form from reloading the page
    e.preventDefault();

    console.log(document.querySelector("#img-url").value);
    console.log(e.target['duck-name-input'].value);
    //hack way by adding a sneaky little id in the html
    // let newDuck = {
    //   name: document.querySelector("#duck-name").value,
    //   img_url: document.querySelector("#img-url").value,
    //   likes: 0,
    // };

    //proper targetting using e.target
    let newDuck2 = {
        name: e.target['duck-name-input'].value,
        img_url: e.target['duck-image-input'].value,
        likes: 0,
      };
    //renderDuck(newDuck);
    renderDuck(newDuck2);
    //console.log(e.target.value)
  });
}
