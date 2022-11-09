let strDevID = "1";  //Device ID
let strSet = 'A';
let myTimer;

getDevID();
myTimer = setInterval(showImg,1000);

function recordDevID() {
  strDevID = prompt("What is your Device ID? ");
  window.localStorage.setItem("DeviceID", strDevID.toString())
}

function getDevID() {
  const str1 = window.localStorage.getItem("DeviceID");
  if (str1) {
    strDevID = str1;
  }
}

function showImg() {
  const current = new Date();

  const lngSec = current.getSeconds();
  const lngSec10 = Math.floor(lngSec / 10);

  if((lngSec10 % 2) === 0) {
    strSet = 'A';
  } else {
    strSet = 'B';
  }

  let strURL = strSet + strDevID + ".JPG";
  let img1 = document.getElementById("idImg")
  img1.src = strURL;
}