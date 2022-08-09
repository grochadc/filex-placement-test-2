import { tableReducer } from "../index";

describe("enhancedReducer", () => {
    it('inserts a string item', async () => {
        expect(tableReducer([], {type: "insert", payload: "a string"})).toEqual(["a string"]);
    })
   });