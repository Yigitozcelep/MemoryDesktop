let userAnswer     = []
let expectedAnswer = []
let startTime      = 0
let resultTime     = 0
const kartButton     = document.getElementById("button1")
const sayiButton     = document.getElementById("button2")
const sayiNextButton = document.getElementById("sayiNextButton")
const kartNextButton = document.getElementById("kartNextButton")
const sayiEndButton  = document.getElementById("finishButton")
const endTimeText    = document.getElementById("endTimeText")
const totalCorText   = document.getElementById("totalCorrectText")
const corSizeText    = document.getElementById("totalSizeText")
const timeInput      = document.getElementById("timeInput")
const sayiInput      = document.getElementById("sayiAnswer")
const gridLayout     = document.getElementById("gridLayout")

endTimeText.style.display    = "none"
gridLayout.style.display     = "none"
kartNextButton.style.display = "none"
totalCorText.style.display   = "none"
sayiNextButton.style.display = "none"
corSizeText.style.display    = "none"
sayiEndButton.style.display  = "none"
sayiInput.style.display      = "none"



const defaultOrderCardsImg = []
for (let suit of ["club", "diamond", "heart", "spade"]) {
  for (let rank of ["Ace", "2", "3", "4", "5","6","7","8","9","10","Jack","Queen","King"])   defaultOrderCardsImg.push("./assets/" + suit + rank + ".svg")
}

kartButton.addEventListener("click", () => showKartPage())
sayiButton.addEventListener("click", () => showSayiPage())
kartNextButton.addEventListener("click", () => {
    resultTime = performance.now() - startTime
    kartNextButton.style.display = "none"
    showOrderCardsPage()
})

sayiNextButton.addEventListener("click", () => showNumbers())
sayiEndButton.addEventListener("click", () => {
    const cleanedText = sayiInput.value.replace(/[\s\n]/g, '');
    Array.from(cleanedText).forEach(char => userAnswer.push(char));
    console.log(sayiInput.value)
    sayiInput.value = '';
    showStartPage()
})

const generateRandomString = () => {
  let res = [];
  for (let i = 0; i < 52; i++) {
    let str = "";
    for (let j = 0; j < 3; j++) str += Math.floor(Math.random() * 10);
    res.push(str);
  }
  return res;
}

const getCorrectCount = (currentList, answerList) => {
    const minSize = Math.min(currentList.length, answerList.length)
    let count = 0
    for (let i = 0; i < minSize; i++) count += currentList[i] == answerList[i];
    return count;
}

const showStartPage = () => {
  showSize();
  showCorrect();
  showTime();
  hidePages();
  kartButton.style.display = "block";
  sayiButton.style.display = "block";
  timeInput.style.display  = "block";
}

const showOrderCardsPage = () => {
    showCards(defaultOrderCardsImg, (cardResource, imageView) => {
      console.log(userAnswer, cardResource)
      if (userAnswer.includes(cardResource)) {
          userAnswer.splice(userAnswer.indexOf(cardResource), 1);
          imageView.style.backgroundColor = 'transparent';
      } else {
        userAnswer.push(cardResource)
        imageView.style.backgroundColor = 'green';
      }
      if (userAnswer.length == 52) showStartPage()
    })
}

const showNumbers = () => {
  gridLayout.innerHTML = ""
  const numbers = generateRandomString()
  numbers.forEach(el => {
    const textView = document.createElement('div');
    textView.textContent = el;
    textView.style.fontSize = '18px';
    textView.style.padding = '16px';
    textView.style.backgroundColor = '#A9A9A9';
    textView.style.margin = '16px 16px 16px 45px';
    textView.style.display = 'inline-block';
    textView.style.textAlign = 'center';
    gridLayout.appendChild(textView);
  })
}

const hideInitialPage = () => {
  kartButton.style.display   = "none"
  sayiButton.style.display   = "none"
  endTimeText.style.display  = "none"
  totalCorText.style.display = "none"
  timeInput.style.display    = "none"
  corSizeText.style.display  = "none"
}


const hidePages = () => {
    userAnswer     = []
    expectedAnswer = []
    kartButton.display       = "none"
    sayiButton.display       = "none"
    sayiNextButton.display   = "none"
    kartNextButton.display   = "none"
    sayiEndButton.display    = "none"
    endTimeText.display      = "none"
    totalCorText.display     = "none"
    corSizeText.display      = "none"
    timeInput.display        = "none"
    sayiInput.display        = "none"
    gridLayout.display       = "none"
    gridLayout.style.display = "none";
}

const performCommonsOfPages = () => {
    hideInitialPage();
    startTime = performance.now();
    gridLayout.style.display = "grid"
    gridLayout.innerHTML = ""
}


const showTime = () => {
    endTimeText.style.display = "block";
    const seconds = (resultTime / 1000).toFixed(2);
    endTimeText.innerHTML = `Total Time: ${seconds}s`
    startTime = 0
}

const showCorrect = () => {
    const correctCount = getCorrectCount(expectedAnswer, userAnswer);
    totalCorText.style.display = "block";
    totalCorText.innerHTML = `Total Correct: ${correctCount}`
}



const showCards = (cards, onCardClick) => {
    gridLayout.innerHTML = ""
    cards.forEach(cardResource => {
        const imageView = document.createElement("img");
        imageView.src = cardResource
        imageView.style.width  = "130px";
        imageView.style.height = "130px";
        imageView.style.margin = "3px";
        
        imageView.addEventListener("click", () => onCardClick(cardResource, imageView));
        gridLayout.appendChild(imageView)
    })
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const showKartPage = () => {
    performCommonsOfPages()
    expectedAnswer = [...defaultOrderCardsImg]
    shuffle(expectedAnswer)
    kartNextButton.style.display = "block"
    showCards(expectedAnswer, () => {})
}


const showSize = () => {
    corSizeText.style.display = "block";
    corSizeText.innerHTML = `Total Size: ${expectedAnswer.length}`
}

const showSayiPage = () => {
    if (timeInput.value == "" || !timeInput.value) return;
    const minute = timeInput.value - "0"
    performCommonsOfPages()
    sayiNextButton.style.display = "block"
    showNumbers()
    setTimeout(() => {
        gridLayout.style.display     = "none"
        gridLayout.innerHTML         = ""
        sayiNextButton.style.display = "none" 
        sayiEndButton.style.display  = "block"
        sayiInput.style.display      = "block"
    }, minute * 60 * 1000)
}


showStartPage()