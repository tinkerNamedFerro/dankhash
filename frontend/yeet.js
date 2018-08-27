var tokenAmount = 5573;
var tokenPrice = 0.0001783166904;
console.log(tokenPrice);

var calcPrice = function() {
  if (tokenAmount >= 5573) {
    tokenPrice = 0.0002080299563;
    console.log(tokenPrice);
  } else if (tokenAmount < 11145) {
    tokenPrice = 0.0002377555873;
    console.log(tokenPrice);
  } else if (tokenAmount < 16717) {
    tokenPrice = 0.0002675227394;
    console.log(tokenPrice);
  }
}

calcPrice();
