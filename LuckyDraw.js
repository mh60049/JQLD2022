//const fs = require('fs');

const max_fireworks = 5,
max_sparks = 10;
let canvas = document.getElementById('idCanvas');
let context = canvas.getContext('2d');
let fireworks = [];

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
let lngWinner = 30;  //Maximum number of winners
let lngTotalWinner = lngWinner;
let lngExistingWinner = 0;
const lngMaxCandidates = 15;

addCandidates();  //Add the 15 candidate buttons to the screen
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
      arrWinnerName.push(strUserName);

      let btnWinner = document.createElement("button");
      btnWinner.innerHTML=strWinner;
      btnWinner.style.textAlign = "left";
      btnWinner.style.fontSize = "18px";
      btnWinner.style.fontWeight = "bold";


      if (lng1 <= 5) {
        btnWinner.style.backgroundColor = "rgb(255,216,91)";
        btnWinner.style.color = "black";
      } else if (lng1 <= 10) {
        btnWinner.style.backgroundColor = "rgb(246,134,198)";
        btnWinner.style.color = "black";
      } else if (lng1 <= 20) {
        btnWinner.style.backgroundColor = "rgb(248,163,133)";
        btnWinner.style.color = "black";
      } else if (lng1 <= 30) {
        btnWinner.style.backgroundColor = "rgb(139,43,8)";
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
      element0.style.color = "rgba(0,0,0,1)";
    }

    myID = Math.floor(Math.random() * lngMaxCandidates) + 1;

    let element = document.getElementById('idCandidate' + myID);
    console.log(element);
    element.style.backgroundColor = "green";
    element.style.color = "rgba(255,255,255,1)";

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
        loadCandidates();
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

        if (lngWinner <= 5) {
          btnWinner.style.backgroundColor = "rgb(255,216,91)";
          btnWinner.style.color = "black";
        } else if (lngWinner <= 10) {
          btnWinner.style.backgroundColor = "rgb(246,134,198)";
          btnWinner.style.color = "black";
        } else if (lngWinner <= 20) {
          btnWinner.style.backgroundColor = "rgb(248,163,133)";
          btnWinner.style.color = "black";
        } else if (lngWinner <= 30) {
          btnWinner.style.backgroundColor = "rgb(139,43,8)";
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
          winner1.style.fontSize="100px";
          winner1.style.height = "400px";
          winner1.style.fontFamily="Arial";
          winner1.style.fontWeight = "bold";
          winner1.style.backgroundColor="white";
          winner1.style.color="rgb(243, 102, 51)";
          winner1.style.textAlign = "center";
          winner1.style.alignContent="center";

          let div2 = document.getElementById('id2Participants');
          div2.style.position = "relative";
          div2.style.height = "200px";
          div2.style.backgroundColor = "black";

          winner1.style.position="absolute";
          canvas.style.position = "absolute";
          canvas.style.padding = "0px";
          canvas.style.width = "100%";
          canvas.style.height = "400px";
          canvas.style.zIndex = "99";

          startFireworks();

          clearMarquee();  //Stop the moving text
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
  let lngB1 = 0;
  for (lngB1=1; lngB1 <= 15; lngB1++) {
    let btn1 = document.createElement('button');
    btn1.className = "clsCandidate";
    btn1.id='idCandidate' + lngB1;
    btn1.style.backgroundImage = "url(Dice.JPG)"
    btn1.style.backgroundSize = "100% 100%";
    btn1.style.color = "rgba(0, 0, 0, 0)"
    btn1.innerText="Can";
    btn1.style.paddingTop="20px";
    btn1.style.paddingBottom="20px";
    document.getElementById('idParticipants').appendChild(btn1);
  }
}

function loadCandidates() {
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

      let btn1 = document.getElementById(str2)
      btn1.style.backgroundImage = null;
      btn1.textContent = str1;
      btn1.style.color="rgba(0, 0, 0, 1)";
      btn1.style.paddingTop="5px";
      btn1.style.paddingBottom="5px";

      ++lng2;
    }
  } 
  while (lng2 < lngMaxCandidates);
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
    if (lngWinner === 1) {
      document.getElementById("idParticipants").innerText =" ";
      canvas.style.zIndex = "-1";
      document.getElementById("idImgStart").src="StartDraw.jpg";
      blnFinished = false;
      addCandidates();
    }
  }
}



window.addEventListener('beforeunload', (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
});


function startFireworks() {
  for (let i = 0; i < max_fireworks; i++) {
      let firework = {
          sparks: []
      };

      for (let n = 0; n < max_sparks; n++) {
          let spark = {
              vx: Math.random() * 5 + .5,
              vy: Math.random() * 5 + .5,
              weight: Math.random() * .3 + .03,
              red: Math.floor(Math.random() * 2),
              green: Math.floor(Math.random() * 2),
              blue: Math.floor(Math.random() * 2)
          };

          if (Math.random() > .5) spark.vx = -spark.vx;
          if (Math.random() > .5) spark.vy = -spark.vy;
          firework.sparks.push(spark);
      }
      fireworks.push(firework);
      resetFirework(firework);
  }
  window.requestAnimationFrame(explode);
}

function resetFirework(firework) {
  firework.x = Math.floor(Math.random() * canvas.width);
  firework.y = canvas.height;
  firework.age = 0;
  firework.phase = 'fly';
}

function explode() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework,index) => {
      if (firework.phase == 'explode') {
          firework.sparks.forEach((spark) => {
              for (let i = 0; i < 10; i++) {
                  let trailAge = firework.age + i;
                  let x = firework.x + spark.vx * trailAge;
                  let y = firework.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
                  let fade = i * 20 - firework.age * 2;
                  let r = Math.floor(spark.red * fade);
                  let g = Math.floor(spark.green * fade);
                  let b = Math.floor(spark.blue * fade);
                  context.beginPath();
                  context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
                  context.rect(x, y, 4, 4);
                  context.fill();
              }
          });

          firework.age++;

          if (firework.age > 100 && Math.random() < .05) {
              resetFirework(firework);
          }
      } else {
          firework.y = firework.y - 10;
          for (let spark = 0; spark < lngMaxCandidates; spark++) {
              context.beginPath();
              context.fillStyle = 'rgba(' + index * 50 + ',' + spark * 17 + ',0,1)';
              context.rect(firework.x + Math.random() * spark - spark / 2, firework.y + spark * 4, 4, 4);
              context.fill();
          }
      if (Math.random() < .001 || firework.y < 200) firework.phase = 'explode';
      }
  });
  window.requestAnimationFrame(explode);
}