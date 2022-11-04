//const fs = require('fs');

let lngTotal = 0;  //Total number of users
let lngRibbonPosition = 0;  //Position of ribbon at ordianl number of participant
let myTimer;
let myID0 = 0;
let myID = 0;
let blnStart = false;
let arrParticipants = [];
let arrCandidates = [];
let arrWinner = [];
let arrWinnerName = [];
let arrWinners = [];
let blnFinished = false;
let lngWinner = 5;  //Maximum number of winners
let lngTotalWinner = lngWinner;
let lngExistingWinner = 0;


getData();

async function getData() {
  const response = await fetch('users.json');
  const data = await response.json();

  let theID = 0;
  let userID = '';

  lngTotal = JSON.parse(JSON.stringify(data)).length
    
  let theUsers = document.getElementById('idParticipants');

  let theRibbon = document.getElementById('id2Ribbon');
 
  for (item of data) {
    arrParticipants.push(item.UserName);
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
      btnWinner.style.fontSize = "18px";
      btnWinner.style.fontWeight = "bold";

      if (lng1 <= 15) {
        btnWinner.style.backgroundColor = "rgb(255,182,0)";
        btnWinner.style.color = "black";
      } else {
        btnWinner.style.backgroundColor = "rgb(190,58,40)";
        btnWinner.style.color = "white";
      }

      btnWinner.style.borderColor = "orange";

      let div1 = document.getElementById("idWinnerList")
      div1.appendChild(btnWinner);
      
      lngWinner=lngTotalWinner-lngExistingWinner;
    }
  }

}

function changeStyle(){
  if (arrWinner.length < lngTotal) {
    if (myID0 > 0) {
      let element0=document.getElementById('idCandidate' + myID0);
      element0.style.backgroundColor = "lightblue";
      element0.style.color = "rgb(100,100,100)";
    }

    myID = Math.floor(Math.random() * 15) + 1;

    let element = document.getElementById('idCandidate' + myID);
    console.log(element);
    element.style.backgroundColor = "green";
    element.style.color = "white";

    myID0 = myID;
    document.getElementById('idPicked').textContent=element.textContent
  } else {
    blnFinished = true;
    let img1 = document.getElementById("idImgStart");
    img1.src ="Finished.jpg";
    clearInterval(myTimer);
  }
}

function clearWinners() {
  let blnClear=false;

  blnClear=confirm('Would you like to clear winner list?');
  if (blnClear === true){
    window.localStorage.clear();
    arrWinnerName = [];
    let div1 = document.getElementById("idWinnerList")
    while (div1.firstChild) {
      div1.removeChild(div1.firstChild);
    }
    lngWinner = lngTotalWinner;
  }
}

function clearCandidates() {
  let div1 = document.getElementById("idParticipants")
  while (div1.firstChild) {
    div1.removeChild(div1.firstChild);
  }
}

function clearMarquee() {
  let div1 = document.getElementById("idMarquee")
  while (div1.firstChild) {
    div1.removeChild(div1.firstChild);
  }
}

function startDraw() {
  if (blnFinished === false) {
    if (lngWinner > 0) {
      if (blnStart === false) {
        blnStart = true;
        addCandidates();
        document.getElementById("idImgStart").src="StopDraw.jpg";

        document.getElementById("idPicked").style.backgroundColor = "white";
        document.getElementById("idPicked").style.color = "red";

        myTimer = setInterval(changeStyle, 200);
      } else {  //When blnStart = true
        blnStart = false;

        document.getElementById("idPicked").style.backgroundColor = "red";
        document.getElementById("idPicked").style.color = "white";

        document.getElementById("idImgStart").src="StartDraw.jpg";
        clearInterval(myTimer);
        arrWinner.push(myID.toString());

        let strUserName = document.getElementById('idPicked').textContent;
        strWinner=lngWinner + '. ' + strUserName  //Text to be displayed on winner buttons
        arrWinners.push(strWinner);  //Add the winner to the arrange arrWinners
        arrWinnerName.push(strUserName);
        window.localStorage.setItem(lngWinner.toString(), strUserName);

        let btnWinner = document.createElement("button");
        btnWinner.innerHTML=strWinner;
        btnWinner.style.textAlign = "left";
        btnWinner.style.fontSize = "18px";
        btnWinner.style.fontWeight = "bold";

        if (lngWinner <= 15) {
          btnWinner.style.backgroundColor = "rgb(255,182,0)";
          btnWinner.style.color = "black";
         } else {
          btnWinner.style.backgroundColor = "rgb(190,58,40)";
          btnWinner.style.color = "white";
         }

        
        btnWinner.style.borderColor = "orange";
        btnWinner.id='btnWin' + lngWinner.toString();

        lngWinner = lngWinner - 1;

        let div1 = document.getElementById("idWinnerList")
        div1.appendChild(btnWinner);
        //window.speechSynthesis.speak(new SpeechSynthesisUtterance('.' + strUserName));
        if (lngWinner === 0) {
          document.getElementById("idImgStart").src="Finished.jpg";
          blnFinished = true;

          clearCandidates();

          let winner1 = document.getElementById("idParticipants");
          winner1.innerText = "Congratulations to\n" + document.getElementById("idPicked").innerText + " !"
          winner1.style.fontSize="120px";
          winner1.style.fontFamily="Arial";
          winner1.style.backgroundColor="green";
          winner1.style.color="white";
          winner1.style.textAlign = "center";
          winner1.style.alignContent="center";

          clearMarquee();
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

function addCandidates() {
  let strName = '';
  let lng1 = 0;
  let lng2 = 0;
  let bln1 = false;
  let str1 = '';
  let str2 = '';

  arrCandidates = [];

  do {
    lng1 = Math.floor(Math.random() * lngTotal);  //Removed "+1"
    str1 = arrParticipants.at(lng1)
    bln1 = arrWinnerName.includes(str1) || arrCandidates.includes(str1)

    
    if (bln1 === false) {
      arrCandidates.push(str1)

      str2 = 'idCandidate' + (lng2 + 1).toString();
      console.log(str2);
      document.getElementById(str2).textContent = str1;

      ++lng2;
    }
  } 
  while (lng2 < 15);
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

    let div1 = document.getElementById("idWinnerList")
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