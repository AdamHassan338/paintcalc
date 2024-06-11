import { isValidColour } from "../src/index";
import { area } from "../src/index";
import { calculatePaintForWall } from "../src/index";
import { calculateCost } from "../src/index";
import { Brand } from "../src/index";


describe('isValidColour',()=>{
    it('returns true if colour is in shop and false if not, input must be uppercase', ()=>{
        expect(isValidColour("OLIVE")).toBe(true);
        expect(isValidColour("PEACH")).toBe(true);
        expect(isValidColour("CREAM")).toBe(true);
        expect(isValidColour("CLAY")).toBe(true);
        expect(isValidColour("WHITE")).toBe(true);
        expect(isValidColour("INDIGO")).toBe(true);
        expect(isValidColour("INDIGO")).toBe(true);
        expect(isValidColour("INDIGO")).toBe(true);
        expect(isValidColour("SAGE")).toBe(true);
        expect(isValidColour("olive")).toBe(false);
        expect(isValidColour("GREEN")).toBe(false);
        expect(isValidColour("YELLOW")).toBe(false);
        
    });
});


describe('area',()=>{
    it('returns area of quad', ()=>{
        expect(area(6,6)).toBe(36);
        expect(area(5,8)).toBe(40);
        expect(area(3,3)).toBe(9);
        expect(area(12,8)).toBe(96);
        expect(area(5,5)).toBe(25);
    });

    it('returns area of circle', () => {
        expect(area(3)).toBeCloseTo(28.2743338823);
        expect(area(5)).toBeCloseTo(78.5398163397);
        expect(area(86)).toBeCloseTo(23235.2192660);
        expect(area(8)).toBeCloseTo(201.061929830);
        expect(area(12)).toBeCloseTo(452.389342117);
      });

});


describe('calculatePaintForWall',()=>{
    it('returns liters of paint needed to cover a surface', ()=>{
        expect(calculatePaintForWall(34)).toBeCloseTo(3.4);
        expect(calculatePaintForWall(40)).toBeCloseTo(4);
        expect(calculatePaintForWall(73.6)).toBeCloseTo(7.36);
        expect(calculatePaintForWall(43)).toBeCloseTo(4.3);
        expect(calculatePaintForWall(392)).toBeCloseTo(39.2);

    });

});

describe('calculateCost', () => {
    it('returns the total cost for a brand with multiple colours', () => {
      let dulux: Brand =  new Brand("Dulux", [3.00, 3.70, 5.30, 6.00]);
      dulux.colours[0][1] = 10; // set PEACH to 10 liters
      dulux.colours[1][1] = 5; // set CREAM to 5 liters
      dulux.colours[2][1] = 2.5; // set CLAY to 2.5 liters
      
      let result : number = calculateCost(dulux);
      expect(result).toBeCloseTo(61.75);
    });


    it('returns the total cost for a brand with multiple colours', () => {
        let goodHome: Brand = new Brand("GoodHome", [2.80, 3.30, 5.00, 5.70]);
        goodHome.colours[0][1] = 10; // set PEACH to 10 liters
        goodHome.colours[4][1] = 11; // set INDIGO to 11 liters
        goodHome.colours[6][1] = 7.5; // set SAGE to 7.5 liters
        
        let result : number = calculateCost(goodHome);
        expect(result).toBeCloseTo(90.7);
      });
});