let anchor;

window.addEventListener("DOMContentLoaded", function (){

  anchor = document.getElementById("input");

  if(anchor){
    setInnerHtml();
  }

});

function setInnerHtml(){
  anchor.innerHTML = getClosedList();
  addPhoneEvent();
}

function getClosedList(){
  return `
  <form id="form">
    <input id="phone" class="form-control" type="tel" placeholder="" value="+381">
    <button type="submit">Submit</button>
  </form>
  `;
}

function addPhoneEvent(){
  var input = document.querySelector("#phone");
  window.intlTelInput(input,{});
  document.getElementById("form").addEventListener("submit", function (){
    event.preventDefault();
    console.log(document.getElementById("phone").value)
  })
}
