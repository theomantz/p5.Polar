/**
 * This file defines a set of p5.js functions that allow for drawing shapes in polar coordinates.
 * @packageDocumentation
 */
//       ____   ____       _            
//  _ __| ___| |  _ \ ___ | | __ _ _ __ 
// | '_ \___ \ | |_) / _ \| |/ _` | '__|
// | |_) |__) ||  __/ (_) | | (_| | |   
// | .__/____(_)_|   \___/|_|\__,_|_|   
// |_|   
//
// https://github.com/liz-peng/p5.Polar
// Created by Liz Peng
// Version 2.3 Sep 5th 2023             

import * as p5 from "p5";


/**
 * Sets the center of the polar coordinate system to the given x and y coordinates.
 * If the center has not been previously defined, it will be set to the given coordinates.
 * @function
 * @name setCenter
 * @memberof p5.Polar
 * @param {number} x - The x-coordinate of the center.
 * @param {number} y - The y-coordinate of the center.
 * @instance
 */

p5.prototype.setCenter = function(x: number, y: number): void {
  if(this.center === undefined) {
   this.center = { x, y }
  }
  this.translate(this.center.x = x, this.center.y = y);
}

p5.prototype.shiftRotate = function (_angle, _distance) {
  const _radians = this.radians(_angle);
  this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
  this.rotate(this.radians(_angle)); 
}

p5.prototype.polarDrawCallback = function(_num, _radius, _distance, drawCallback) {
  const _angle = 360/_num;
  for(let i=1; i<=_num; i++) {
    this.push();
    this.shiftRotate(i*_angle, _distance);
    drawCallback(i, _angle, _radius, _distance);
    this.pop();  
  }
}

p5.prototype.polarTriangle = function (_angle, _radius, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.triangle(
    this.sin(0), this.cos(0)*-_radius,
    this.sin(this.TWO_PI*1/3)*_radius, this.cos(this.TWO_PI*1/3)*-_radius,
    this.sin(this.TWO_PI*2/3)*_radius, this.cos(this.TWO_PI*2/3)*-_radius
  );
  this.pop();
}

p5.prototype.polarTriangles = function (_num, _radius, _distance, callback) {
  const _angle = 360/_num;
  for(let i=1; i<=_num; i++) {
    if(callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarTriangle(_result[0]*_result[1], _result[2], _result[3]);
    }
    else this.polarTriangle(i*_angle, _radius, _distance);
  }
}

p5.prototype.polarEllipse = function (_angle, _radiusW, _radiusH, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.ellipse(0, 0, _radiusW*2, _radiusH*2);
  this.pop();
}

p5.prototype.polarEllipses = function (_num, _radiusW, _radiusH, _distance, callback) {
  const _angle = 360/_num;
  for(let i=1; i<=_num; i++) {
    if(callback) {
      const _result = callback(i, _angle, _radiusW, _radiusH, _distance);
      this.polarEllipse(_result[0]*_result[1], _result[2], _result[3], _result[4]);
    }
    else this.polarEllipse(i*_angle, _radiusW, _radiusH, _distance);
  }
}

p5.prototype.polarLine = function (_angle, _radius, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.line(0, _radius, 0, -_radius);
  this.pop();
}

p5.prototype.polarLines = function (_num, _radius, _distance, callback) {
  const _angle = 360/_num;
  for(let i=1; i<=_num; i++) {
    if(callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarLine(_result[0]*_result[1], _result[2], _result[3]);
    }
    else this.polarLine(i*_angle, _radius, _distance);
  }
}

p5.prototype.polarSquare = function (_angle, _radius, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.square(-_radius, -_radius, _radius*2);
  this.pop();
}

p5.prototype.polarSquares = function (_num, _radius, _distance, callback) {
  const _angle = 360/_num;
  for(let i=1; i<=_num; i++) {
    if(callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarSquare(_result[0]*_result[1], _result[2], _result[3]);
    }
    else this.polarSquare(i*_angle, _radius, _distance);
  }
}

p5.prototype.polarPentagon = function (_angle, _radius, _distance) {
  this.push();
  const _radians = this.radians(_angle);
  this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
  this.rotate(this.radians(_angle)+60);
  this.beginShape();
  for(let i=1; i<=5; i++) {
    this.vertex(this.cos(this.TWO_PI*i/5)*_radius, this.sin(this.TWO_PI*i/5)*_radius);
  }
  this.endShape(this.CLOSE);
  this.pop();
}

p5.prototype.polarPentagons = function (_num, _radius, _distance, callback) {
  const _angle = 360/_num;
  for(let i=1; i<=_num; i++) {
    if(callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarPentagon(_result[0]*_result[1], _result[2], _result[3]);
    }
    else this.polarPentagon(i*_angle, _radius, _distance);
  }
}

p5.prototype.polarHexagon = function (_angle, _radius, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.beginShape();
    for(let i=0; i<6; i++) {
      this.vertex(
        this.cos(this.TWO_PI*i/6)*_radius, this.sin(this.TWO_PI*i/6)*_radius
      );
    }
  this.endShape(this.CLOSE);
  this.pop();
}

p5.prototype.polarHexagons = function (_num, _radius, _distance, callback) {
  const _angle = 360/_num;
  for(let i=1; i<=_num; i++) {
    if(callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarHexagon(_result[0]*_result[1], _result[2], _result[3]);
    }
    else this.polarHexagon(i*_angle, _radius, _distance);
  }
}

p5.prototype.polarHeptagon = function (_angle, _radius, _distance) {
  this.push();
  const _radians = this.radians(_angle);
  this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
  this.rotate(this.radians(_angle)+11);
  this.beginShape();
  for(let i=1; i<=7; i++) {
    this.vertex(this.cos(this.TWO_PI*i/7)*_radius, this.sin(this.TWO_PI*i/7)*_radius);
  }
  this.endShape(this.CLOSE);
  this.pop();
}

p5.prototype.polarHeptagons = function (_num, _radius, _distance, callback) {
  const _angle = 360/_num;
  for(let i=1; i<=_num; i++) {
    if(callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarHeptagon(_result[0]*_result[1], _result[2], _result[3]);
    }
    else this.polarHeptagon(i*_angle, _radius, _distance);
  }
}

p5.prototype.polarOctagon = function (_angle, _radius, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.beginShape();
  for(let i=1; i<=8; i++) {
    this.vertex(this.cos(this.TWO_PI*i/8)*_radius, this.sin(this.TWO_PI*i/8)*_radius);
  }
  this.endShape(this.CLOSE);
  this.pop();
}

p5.prototype.polarOctagons = function (_num, _radius, _distance, callback) {
  const _angle = 360/_num;
  for(let i=1; i<=_num; i++) {
    if(callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarOctagon(_result[0]*_result[1], _result[2], _result[3]);
    }
    else this.polarOctagon(i*_angle, _radius, _distance);
  }
}

p5.prototype.polarPolygon = function (_edge, _angle, _radius, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.beginShape();
  for(let i=1; i<=_edge; i++) {
    this.vertex(this.cos(this.TWO_PI*i/_edge)*_radius, this.sin(this.TWO_PI*i/_edge)*_radius);
  }
  this.endShape(this.CLOSE);
  this.pop();
}

p5.prototype.polarPolygons = function (_num, _edge, _radius, _distance, callback) {
  const _angle = 360/_num;
  for(let i=1; i<=_num; i++) {
    if(callback) {
      const _result = callback(i, _angle, _edge, _radius, _distance);
      this.polarPolygon(_result[2], _result[0]*_result[1], _result[3], _result[4]);
    }
    else this.polarPolygon(_edge, i*_angle, _radius, _distance);
  }
}

export default p5;