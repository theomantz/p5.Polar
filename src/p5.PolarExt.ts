// Extensions to the p5.Polar library
// Contributed by https://github.com/iuli4n

import p5 from "./p5.Polar";

p5.prototype.shiftDistScale = function (_distance, _scale) {
  this.scale(_scale);
  this.translate(0, _distance);
}

p5.prototype.linearDrawCallback = function (_num, _totaldistance, drawCallbackLinear, linear=false) {
  for(let i=1; i<=_num; i++) {
	    let d = 1 - (0.5 * Math.round(Math.pow(i-1, 2)))
	    d = d*_totaldistance;
	
	    this.push();
      this.shiftDistScale(d, Math.pow(i-1,2))
	    drawCallbackLinear(i, _totaldistance);
      this.pop();  
  }
}

export default p5