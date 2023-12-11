import { timeConvert } from "../funcs";

describe("#timeConvert", () => {
    test('it is a function', () => {
        expect(typeof timeConvert).toBe('function');
    });

    test('works with static times', () => {
        expect(timeConvert("12:00")).toBe("12:00 pm");
        expect(timeConvert("06:57")).toBe("06:57 am");
        expect(timeConvert("6:57")).toBe("06:57 am");
    });

    test('works with non-static times', () => {
        expect(timeConvert("00:00")).toBe("12:00 am");
        expect(timeConvert("15:13")).toBe("03:13 pm");
    });
});