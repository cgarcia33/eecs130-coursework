const makeBigger = () => {
  document.querySelector(".content p").style.fontSize = "2em";
};

const makeSmaller = () => {
  document.querySelector(".content p").style.fontSize = "0.9em";
};

document.querySelector(".a1").onclick = makeBigger;
document.querySelector(".a2").onclick = makeSmaller;
