module.exports = class FairShare {

  constructor(settings){

    const defaults = {
      msBeforeShare: 10
    };

    Object.assign(this,defaults,settings,{
      iterations:0,
      pauses:0,
      start: Date.now()
    });

  }

  get elapsed(){
    return Date.now() - this.start;
  }

  get stats(){
    let c = Math.ceil(this.iterations/this.pauses);
    return {
      iterations: this.iterations,
      pauses: this.pauses,
      cyclesBetweenInterupts: c
    }
  }

  do(){
    this.iterations++;
    if(this.elapsed < this.msBeforeShare){ return; }
    this.start = Date.now();
    this.pauses++;
    return new Promise((resolve)=>{
      setImmediate(()=>{ resolve(); });
    });
  }

}