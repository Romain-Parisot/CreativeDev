import Scene from "../canvas/Scene";
import * as dat from "dat.gui";

export default class Scenario extends Scene {
  constructor(id) {
    super(id);

    // debug
    this.params = {
      "is-update": true,
      MainColor: "#00693C",
      SecondaryColor: "#FFEECA",
      frameThickness: 2,
      notchLength: 10,
      notchWidth: 2,
      centerSize: 10,
      rolexLetterWidth: 20,
      rolexLetterHeight: 20,
      rolexLetterSpacing: 20,
      rolexLetterBoldness: 2,
      romainLetterWidth: 20,
      romainLetterHeight: 30,
      romainLetterBoldness: 2,
      secondsNeedleSize: 0.6,
      secondsNeedleWidth: 2,
      minutesNeedleSize: 0.55,
      minutesNeedleWidth: 8,
      hoursNeedleSize: 0.5,
      hoursNeedleWidth: 12,
    };
    this.debug = this.globalContext.debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder(this.id);
      this.debugFolder.add(this.params, "is-update");
    }
    this.setUpGUI();

    // canvas
    this.domElement = new DomElement(id);
    this.canvas = this.domElement.instance;
    this.context = this.canvas.getContext("2d");
    this.resize();
  }

  setUpGUI() {
    // Create GUI
    const gui = new dat.GUI();

    // variables
    gui.addColor(this.params, "MainColor");
    gui.addColor(this.params, "SecondaryColor");
    gui.add(this.params, "frameThickness", 0, 10);
    gui.add(this.params, "notchLength", 0, 20);
    gui.add(this.params, "notchWidth", 0, 10);
    gui.add(this.params, "centerSize", 0, 20);
    gui.add(this.params, "rolexLetterWidth", 0, 50);
    gui.add(this.params, "rolexLetterHeight", 0, 50);
    gui.add(this.params, "rolexLetterSpacing", 0, 50);
    gui.add(this.params, "rolexLetterBoldness", 0, 10);
    gui.add(this.params, "romainLetterWidth", 0, 50);
    gui.add(this.params, "romainLetterHeight", 0, 50);
    gui.add(this.params, "romainLetterBoldness", 0, 10);
    gui.add(this.params, "secondsNeedleSize", 0, 1);
    gui.add(this.params, "secondsNeedleWidth", 0, 20);
    gui.add(this.params, "minutesNeedleSize", 0, 1);
    gui.add(this.params, "minutesNeedleWidth", 0, 20);
    gui.add(this.params, "hoursNeedleSize", 0, 1);
    gui.add(this.params, "hoursNeedleWidth", 0, 20);

    gui.open();
  }

  update() {
    if (!super.update()) return;
    this.drawUpdate();
  }

  // Function to draw romain letter I V and X
  drawI(x, y, height) {
    this.context.beginPath();
    this.context.lineWidth = this.params.romainLetterBoldness;
    this.context.moveTo(x, y - height / 2);
    this.context.lineTo(x, y + height / 2);
    this.context.stroke();
  }

  drawV(x, y, height, width) {
    this.context.beginPath();
    this.context.moveTo(x - width / 2, y - height / 2);
    this.context.lineTo(x, y + height / 2);
    this.context.lineTo(x + width / 2, y - height / 2);
    this.context.stroke();
  }

  drawX(x, y, height, width) {
    this.context.beginPath();
    this.context.moveTo(x - width / 2, y - height / 2);
    this.context.lineTo(x + width / 2, y + height / 2);
    this.context.moveTo(x + width / 2, y - height / 2);
    this.context.lineTo(x - width / 2, y + height / 2);
    this.context.stroke();
  }

  // Function to draw letters R O L E and X
  drawR(x, y, height, width) {
    let halfWidth = width / 2;
    let halfHeight = height / 2;
    this.context.beginPath();
    // ligne verticale
    this.context.moveTo(x - halfWidth, y - halfHeight);
    this.context.lineTo(x - halfWidth, y + halfHeight);
    // cercle en hat a gauche
    this.context.arc(x, y - halfHeight, halfWidth, Math.PI, 1.8, false);
    // ligne en bas a droite
    this.context.moveTo(x - halfWidth, y - 6);
    this.context.lineTo(x + halfWidth, y + halfHeight);
    this.context.stroke();
  }

  drawO(x, y, height, width) {
    this.context.beginPath();
    this.context.arc(x, y, width / 2, 0, 2 * Math.PI);
    this.context.stroke();
  }

  drawL(x, y, height, width) {
    this.context.beginPath();
    this.context.moveTo(x - width / 2, y - height / 2);
    this.context.lineTo(x - width / 2, y + height / 2);
    this.context.lineTo(x + width / 2, y + height / 2);
    this.context.stroke();
  }

  drawE(x, y, height, width) {
    this.context.beginPath();
    this.context.moveTo(x - width / 2, y - height / 2);
    this.context.lineTo(x + width / 2, y - height / 2);
    this.context.moveTo(x - width / 2, y);
    this.context.lineTo(x + width / 2, y);
    this.context.moveTo(x - width / 2, y + height / 2);
    this.context.lineTo(x + width / 2, y + height / 2);
    this.context.moveTo(x - width / 2, y - height / 2);
    this.context.lineTo(x - width / 2, y + height / 2);
    this.context.stroke();
  }

  drawX(x, y, height, width) {
    this.context.beginPath();
    this.context.moveTo(x - width / 2, y - height / 2);
    this.context.lineTo(x + width / 2, y + height / 2);
    this.context.moveTo(x + width / 2, y - height / 2);
    this.context.lineTo(x - width / 2, y + height / 2);
    this.context.stroke();
  }

  drawUpdate() {
    this.clear();

    // Draw background
    this.context.beginPath();
    this.context.arc(
      this.width / 2,
      this.height / 2,
      this.width / 2,
      0,
      2 * Math.PI
    );
    this.context.fillStyle = this.params.MainColor;
    this.context.fill();
    // Draw frame of the rolex
    this.context.strokeStyle = this.params.SecondaryColor;
    this.context.lineWidth = this.params.frameThickness;
    this.context.stroke();
    // Draw notches on the frame
    let notchLength = this.params.notchLength;
    let notchWidth = this.params.notchWidth;
    this.context.lineWidth = notchWidth;
    for (let i = 0; i < 60; i++) {
      let angle = (i / 60) * (2 * Math.PI);
      let innerRadius = this.width / 2 - notchLength;
      let outerRadius = this.width / 2;
      let innerX = this.width / 2 + innerRadius * Math.cos(angle);
      let innerY = this.height / 2 + innerRadius * Math.sin(angle);
      let outerX = this.width / 2 + outerRadius * Math.cos(angle);
      let outerY = this.height / 2 + outerRadius * Math.sin(angle);
      this.context.beginPath();
      this.context.moveTo(innerX, innerY);
      this.context.lineTo(outerX, outerY);
      this.context.stroke();
    }
    // Draw the center of the frame
    this.context.beginPath();
    this.context.arc(
      this.width / 2,
      this.height / 2,
      this.params.centerSize,
      0,
      2 * Math.PI
    );
    this.context.fillStyle = this.params.SecondaryColor;
    this.context.fill();
    this.context.stroke();

    // Get the current time
    let now = new Date();
    let second = now.getSeconds();
    let minute = now.getMinutes();
    let hour = now.getHours();

    // Convert hour from 24h to 12h
    hour = hour % 12;

    let secondAngle = (second / 60) * (2 * Math.PI);
    let minuteAngle = ((minute + second / 60) / 60) * (2 * Math.PI);
    let hourAngle = ((hour + minute / 60) / 12) * (2 * Math.PI);

    // Draw needles
    this.drawHand(
      secondAngle,
      this.params.secondsNeedleSize,
      this.params.secondsNeedleWidth,
      this.params.SecondaryColor
    );
    this.drawHand(
      minuteAngle,
      this.params.minutesNeedleSize,
      this.params.minutesNeedleWidth,
      this.params.SecondaryColor
    );
    this.drawHand(
      hourAngle,
      this.params.hoursNeedleSize,
      this.params.hoursNeedleWidth,
      this.params.SecondaryColor
    );

    // Draw the numeral Romain letters
    let romainLetters = [
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
      "I",
      "II",
    ];
    this.context.strokeStyle = this.params.SecondaryColor;
    let numeralHeight = this.params.romainLetterHeight;
    let numeralWidth = this.params.romainLetterWidth;
    for (let i = 0; i < 12; i++) {
      let angle = (i / 12) * (2 * Math.PI);
      let radius = (0.8 * Math.min(this.width, this.height)) / 2;
      let x = this.width / 2 + radius * Math.cos(angle);
      let y = this.height / 2 + radius * Math.sin(angle);
      let numeral = romainLetters[i];
      for (let j = 0; j < numeral.length; j++) {
        switch (numeral[j]) {
          case "I":
            this.drawI(x + j * numeralWidth, y, numeralHeight);
            break;
          case "V":
            this.drawV(x + j * numeralWidth, y, numeralHeight, numeralWidth);
            break;
          case "X":
            this.drawX(x + j * numeralWidth, y, numeralHeight, numeralWidth);
            break;
        }
      }
    }

    // Draw the word "ROLEX"
    let letters = ["R", "O", "L", "E", "X"];
    let letterWidth = this.params.rolexLetterWidth;
    let letterSpacing = this.params.rolexLetterSpacing;
    let letterHeight = this.params.rolexLetterHeight;
    let startX =
      this.width / 2 -
      (letters.length * (letterWidth + letterSpacing)) / 2 +
      letterWidth;
    let y = this.height / 2 - letterHeight - 100;
    this.context.strokeStyle = this.params.SecondaryColor;
    this.context.lineWidth = this.params.rolexLetterBoldness;
    for (let i = 0; i < letters.length; i++) {
      let x = startX + i * (letterWidth + letterSpacing);
      switch (letters[i]) {
        case "R":
          this.drawR(x, y, letterHeight, letterWidth);
          break;
        case "O":
          this.drawO(x, y, letterHeight, letterWidth);
          break;
        case "L":
          this.drawL(x, y, letterHeight, letterWidth);
          break;
        case "E":
          this.drawE(x, y, letterHeight, letterWidth);
          break;
        case "X":
          this.drawX(x, y, letterHeight, letterWidth);
          break;
      }
    }
  }

  drawHand(angle, length, width, color) {
    let x = this.width / 2;
    let y = this.height / 2;
    let endX = x + ((length * this.width) / 2) * Math.cos(angle - Math.PI / 2);
    let endY = y + ((length * this.height) / 2) * Math.sin(angle - Math.PI / 2);

    this.context.beginPath();
    this.context.lineWidth = width;
    this.context.strokeStyle = color;
    this.context.moveTo(x, y);
    this.context.lineTo(endX, endY);
    this.context.stroke();
  }
}
