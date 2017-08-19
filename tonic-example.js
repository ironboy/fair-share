FairShare = require('fair-share');

async function func(){
  // msBeforeShare is optional, defaults to 10 ms
  let share = new FairShare({msBeforeShare: 5});
  let randomNumberArray = [];
  // a loop that is time consuming
  while(randomNumberArray.length < 1000000){
    randomNumberArray.push(Math.random());
    // interrupts the loop after 5 ms
    // thus sharing/not-blocking other code
    share.do();
  }
  // there are stats about how many interrupts
  // that were done to be had if you want to
  console.log(share.stats);
}

func();
