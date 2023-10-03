import p5 from './p5.PolarExt';
let p5Instance: p5;
// Tests for setCenter function
describe("setCenter", () => {
  beforeEach(() => {
    // Mock p5.js functions
    new p5(function(p) {
      p.setup = function () {
        p5Instance = p;
      }});
    p5Instance.translate = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    p5Instance.remove();
  });

  test("should set center to (0, 0) if center is undefined", () => {
    p5Instance.setCenter(0, 0);
    expect(p5Instance.center).toEqual({ x: 0, y: 0 });
  });

  test("should set center to (10, 20) if center is undefined", () => {
    p5Instance.setCenter(10, 20);
    expect(p5Instance.center).toEqual({ x: 10, y: 20 });
  });

  test("should call translate function with center coordinates", () => {
    p5Instance.setCenter(10, 20);
    expect(p5Instance.translate).toHaveBeenCalledWith(10, 20);
  });

  test("should update center coordinates if center is already defined", () => {
    p5Instance.center = { x: 5, y: 5 };
    p5Instance.setCenter(10, 20);
    expect(p5Instance.center).toEqual({ x: 10, y: 20 });
  });

  test("should call translate function with updated center coordinates", () => {
    p5Instance.center = { x: 5, y: 5 };
    p5Instance.setCenter(10, 20);
    expect(p5Instance.translate).toHaveBeenCalledWith(10, 20);
  });
});