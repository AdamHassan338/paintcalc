import { add } from "../src/math";


describe('add',()=>{
    it('adds two numbers', ()=>{
        expect(add(1,1)).toBe(2);
        expect(add(1,5)).toBe(6);
    })
});