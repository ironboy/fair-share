# fair-share
Node.js module. Interrupts async functions after a short time span (default is 10 ms) so that other code in waiting in the event loop queue can run in between coming back to the function. Thus making it possible for several aync functions to fairly share processor time.

## Usage

**npm install fair-share**

### Example

```javascript
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
```

### Example stats
```json
{ 
  "iterations": 1000000,
  "pauses": 22,
  "cyclesBetweenInterrupts": 45455
}
```
