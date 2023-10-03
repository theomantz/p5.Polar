import p5 from "./p5.PolarExt"; 
let p5Instance: p5;
describe("linearDrawCallback", () => {
  beforeEach(function () { 
    new p5(function(p) {
        p.setup = function () {
            p5Instance = p;
        }});
    });

  afterEach(() => {
    p5Instance.remove();
  });

  it("should call drawCallbackLinear the correct number of times", () => {
    const num = 5;
    const totaldistance = 100;
    const drawCallbackLinear = jest.fn();
    p5Instance.linearDrawCallback(num, totaldistance, drawCallbackLinear);

    expect(drawCallbackLinear).toHaveBeenCalledTimes(num);
  });

  it("should call drawCallbackLinear with the correct arguments", () => {
    const num = 3;
    const totaldistance = 50;
    const drawCallbackLinear = jest.fn();
    p5Instance.linearDrawCallback(num, totaldistance, drawCallbackLinear);

    expect(drawCallbackLinear).toHaveBeenCalledWith(1, totaldistance);
    expect(drawCallbackLinear).toHaveBeenCalledWith(2, totaldistance);
    expect(drawCallbackLinear).toHaveBeenCalledWith(3, totaldistance);
  });

  it("should apply the correct transformations to the canvas", () => {
    const num = 2;
    const totaldistance = 50;
    const drawCallbackLinear = jest.fn();
    const scaleSpy = jest.spyOn(p5Instance, "scale");
    const translateSpy = jest.spyOn(p5Instance, "translate");

    p5Instance.linearDrawCallback(num, totaldistance, drawCallbackLinear);

    expect(scaleSpy).toHaveBeenCalledWith(0);
    expect(scaleSpy).toHaveBeenCalledWith(1);
    expect(scaleSpy).toHaveBeenCalledWith(4);
    expect(translateSpy).toHaveBeenCalledWith(0, 0);
    expect(translateSpy).toHaveBeenCalledWith(0, 50);
    expect(translateSpy).toHaveBeenCalledWith(0, 200);
  });
});

describe("linearDrawCallback", () => {
  let p5Instance: p5;

  beforeEach(() => {
    new p5(function(p) {
        p.setup = () => {
            p5Instance = p;
        }});
  });

  afterEach(() => {
    p5Instance.remove();
  });

  it("should call drawCallbackLinear for each number in the range", () => {
    const drawCallbackLinear = jest.fn();
    p5Instance.linearDrawCallback(5, 100, drawCallbackLinear);

    expect(drawCallbackLinear).toHaveBeenCalledTimes(5);
  });

  it("should pass the correct arguments to drawCallbackLinear", () => {
    const drawCallbackLinear = jest.fn();
    p5Instance.linearDrawCallback(3, 50, drawCallbackLinear);

    expect(drawCallbackLinear).toHaveBeenNthCalledWith(1, 1, 50);
    expect(drawCallbackLinear).toHaveBeenNthCalledWith(2, 2, 50);
    expect(drawCallbackLinear).toHaveBeenNthCalledWith(3, 3, 50);
  });

  it("should apply the correct transformations to the sketch", () => {
    const drawCallbackLinear = jest.fn();
    const scaleSpy = jest.spyOn(p5Instance, "scale");
    const translateSpy = jest.spyOn(p5Instance, "translate");

    p5Instance.linearDrawCallback(2, 50, drawCallbackLinear);

    expect(scaleSpy).toHaveBeenNthCalledWith(1, 0, 1);
    expect(scaleSpy).toHaveBeenNthCalledWith(2, 1, 4);
    expect(translateSpy).toHaveBeenNthCalledWith(1, 0, 0);
    expect(translateSpy).toHaveBeenNthCalledWith(2, 0, 50);
  });
});