import {test,expect} from '@jest/globals';
import {isValidLength} from './isValidLength';

test("\"Hello\" word between 5 and 10 characters", () => {
    expect(isValidLength("Hello", 5, 10)).toBeTruthy()
})

test("\"Hello\" word not between 10 and 25 characters", () => {
    expect(isValidLength("Hello", 10, 25)).toBeFalsy()
}) 