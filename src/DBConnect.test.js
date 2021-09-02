/**
 * @jest-environment ./test/custom-test-env.js
 * 
 */

import { render, screen } from '@testing-library/react';
import dbconnect from './index';
import CustomTestEnvironment from './test/custom-test-env';
global.TextEncoder = require("util").TextEncoder;

test("connects mongodb", () => {
    expect(dbconnect()).toBeTruthy();
});