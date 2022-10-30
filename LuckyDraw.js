//const fs = require('fs');

let lngTotal = 0;  //Total number of users
let myTimer;
let myID0 = 0;
let myID = 0;
let blnStart = false;
let arrWinner = [];
let arrWinners = [];
let blnFinished = false;
let lngWinner = 30;  //Maximum number of winners
let lngTotalWinner = lngWinner;
let lngExistingWinner = 0;


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
    userName.textContent = `${item.UserName}`;

    theUsers.append(userName);
  }
  
  //Load previously drawn winners from localStorage
  lngExistingWinner = window.localStorage.length;
  if (lngExistingWinner > 0) {
    for (lng1 = lngTotalWinner; lng1 > (lngTotalWinner - lngExistingWinner); --lng1) {
      let strKey = lng1.toString();
      let strUserName = window.localStorage.getItem(strKey);
      strWinner=strKey + '. ' + strUserName  //Text to be displayed on winner buttons
      arrWinners.push(strWinner);  //Add the winner to the array arrWinners

      let btnWinner = document.createElement("button");
      btnWinner.innerHTML=strWinner;
      btnWinner.style.textAlign = "left";

      if (lng1 <= 15) {
        btnWinner.style.backgroundColor = "green";
        btnWinner.style.color = "white";
      } else {
        btnWinner.style.backgroundColor = "lightgreen";
        btnWinner.style.color = "black";
      }

      btnWinner.style.borderColor = "lightgreen";

      let div1 = document.getElementById("divWinners")
      div1.appendChild(btnWinner);
      
      lngWinner=lngTotalWinner-lngExistingWinner;
    }
  }

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
    img1.src ="Finished.jpg";
    clearInterval(myTimer);
  }
}

function clearWinners() {
  let blnClear=false;

  blnClear=confirm('Would you like to clear winner list?');
  if (blnClear === true){
    window.localStorage.clear();
    let div1 = document.getElementById("divWinners")
    while (div1.firstChild) {
      div1.removeChild(div1.firstChild);
    }
    lngWinner = lngTotalWinner;
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
        strWinner=lngWinner + '. ' + strUserName  //Text to be displayed on winner buttons
        arrWinners.push(strWinner);  //Add the winner to the arrange arrWinners
        window.localStorage.setItem(lngWinner.toString(), strUserName);

        let btnWinner = document.createElement("button");
        btnWinner.innerHTML=strWinner;
        btnWinner.style.textAlign = "left";

        if (lngWinner <= 15) {
          btnWinner.style.backgroundColor = "green";
          btnWinner.style.color = "white";
         } else {
          btnWinner.style.backgroundColor = "lightgreen";
          btnWinner.style.color = "black";
         }

        
        btnWinner.style.borderColor = "lightgreen";
        btnWinner.id='btnWin' + lngWinner.toString();

        lngWinner = lngWinner - 1;

        let div1 = document.getElementById("divWinners")
        div1.appendChild(btnWinner);
        window.speechSynthesis.speak(new SpeechSynthesisUtterance('.' + strUserName));
        if (lngWinner === 0) {
          document.getElementById("imgStart").src="Finished.jpg";
          blnFinished = true;
        }
      }
    } else {  
      alert('Lucky draw has been successfully concluded.')
    }
  } else {
    let blnShowLocalWinners = false;
    blnShowLocalWinners=confirm('Nothing left to be drawn already. Would you like to show winners?');
    if (blnShowLocalWinners === true) {
      showLocalWinners();
    }
  }
}

function showLocalWinners() {
  let lngTW = window.localStorage.length;
  let strS='';
  if (lngTW > 0) {
      for (lng1 = (lngWinner + 1); lng1 <= lngTotalWinner; ++lng1){
        let strKey = lng1.toString();
        strS = strS + '\n' + strKey + '. ' + window.localStorage.getItem(strKey);
      }
  }
  alert('The existing ' + lngTW + ' winners are:' + strS);
}

function removeLastWinner() {
  let blnRemove = confirm('Confirm to remove the last winner?');
  if (blnRemove === true) {
    strKey = (lngTotalWinner - lngWinner + 2).toString();
    window.localStorage.removeItem(strKey);
    arrWinner.pop;
    arrWinners.pop;

    let div1 = document.getElementById("divWinners")
    div1.removeChild(div1.lastChild);

    lngWinner = lngWinner+1;
  }
}



window.addEventListener('beforeunload', (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
});