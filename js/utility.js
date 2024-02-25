function getInnerText(id) {
  return document.getElementById(id).innerText;
}

function setInnerText(id, value) {
  document.getElementById(id).innerText = value;
}

function showElementById(id) {
  document.getElementById(id).classList.remove("hidden");
}
function hideElementById(id) {
  document.getElementById(id).classList.add("hidden");
}

// function setAttributeByClassName(cls) {
//     console.log(cls);
//  let elm = document.querySelector(cls)
//  elm.setAttribute('disabled',true)
 
//  console.log(elm);
// }
