//const fs = require('fs');

let lngTotal = 0;  //Total number of users
let myTimer;
let myID0 = 0;
let myID = 0;
let blnStart = false;
let arrWinner = [];
let arrWinners = [];
let blnFinished = false;
let lngWinner = 5;  //Maximum number of winners


getData();

async function getData() {
  const response = await fetch('users.json');
  const data = await response.json();

  let theID = 0;
  let userID = '';
  lngTotal = JSON.parse(JSON.stringify(data)).length
  let theUsers = document.getElementById('idUsers');
 
  for (item of data) {
    theID++;
    const userName = document.createElement('div');
    userName.className='userName1';
    userID = ('id' + toString(theID));
    userName.id = theID;
    userName.textContent = `${item.mood}`;

    theUsers.append(userName);
  }
  console.log(data);
}

function changeStyle(){
  if (arrWinner.length < lngTotal) {
    if (myID0 > 0) {
      let element0=document.getElementById(myID0);
      element0.style.backgroundColor = "lightblue";
      element0.style.color = "black";
    }

    do {
      myID = Math.floor(Math.random() * lngTotal) + 1;
    } 
    while (arrWinner.includes(myID.toString()) === true);

    let element = document.getElementById(myID);
    element.style.backgroundColor = "green";
    element.style.color = "white";

    myID0 = myID;
    document.getElementById('txtWinner').textContent=element.textContent
  } else {
    blnFinished = true;
    let img1 = document.getElementById("imgStart");
    img1.src ="./Finished.jpg";
    clearInterval(myTimer);
  }
}

function startDraw() {
  if (blnFinished === false) {
    if (lngWinner > 0) {
      if (blnStart === false) {
        blnStart = true;
        document.getElementById("imgStart").src="StopDraw.jpg";
        myTimer = setInterval(changeStyle, 200);
      } else {  //When blnStart = true
        blnStart = false;
        document.getElementById("imgStart").src="StartDraw.jpg";
        clearInterval(myTimer);
        arrWinner.push(myID.toString());

        let strUserName = document.getElementById('txtWinner').textContent;
        strWinner=lngWinner + '. ' + strUserName
        arrWinners.push(strWinner);
        let btnWinner = document.createElement("button");
        btnWinner.innerHTML=strWinner;
        btnWinner.style.textAlign = "left";
        btnWinner.style.backgroundColor = "green";
        btnWinner.style.color = "white";
        btnWinner.style.borderColor = "lightgreen";

        lngWinner = lngWinner - 1;

        let div1 = document.getElementById("divWinners")
        div1.appendChild(btnWinner);
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(strUserName));
        if (lngWinner === 0) {
          document.getElementById("imgStart").src="Finished.jpg";
          blnFinished = true;
        }
      }
    } else {  
      /*const allWinners = JSON.stringify(arrWinners);
      fs.writeFile("./AllWinners.json", allWinners, 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file for all winners was saved!");
      })*/
      alert('Lucky draw has been successfully concluded.')
    }
  } else {
    alert('Nothing left to be drawn.')
  }
}

window.addEventListener('beforeunload', (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
});
