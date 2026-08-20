/**
 * Lightweight Zero-Dependency Test Framework & Assertion Library for E2E Tests
 * Abhinaya UNY Robotics Platform
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgGreen: '\x1b[42m\x1b[30m',
  bgRed: '\x1b[41m\x1b[37m',
  bgCyan: '\x1b[46m\x1b[30m',
};

class TestReporter {
  constructor() {
    this.totalSuites = 0;
    this.totalTests = 0;
    this.passedTests = 0;
    this.failedTests = 0;
    this.totalAssertions = 0;
    this.passedAssertions = 0;
    this.failedAssertions = 0;
    this.failures = [];
    this.currentSuite = null;
    this.currentTest = null;
    this.startTime = Date.now();
  }

  startSuite(name) {
    this.totalSuites++;
    this.currentSuite = {
      name,
      tests: [],
      passed: 0,
      failed: 0,
      assertions: 0,
      startTime: Date.now(),
    };
    console.log(`\n${colors.cyan}${colors.bright}▶ SUITE:${colors.reset} ${colors.bright}${name}${colors.reset}`);
  }

  endSuite() {
    if (!this.currentSuite) return;
    const duration = Date.now() - this.currentSuite.startTime;
    const statusColor = this.currentSuite.failed === 0 ? colors.green : colors.red;
    const statusBadge = this.currentSuite.failed === 0 ? `${colors.bgGreen} PASS ${colors.reset}` : `${colors.bgRed} FAIL ${colors.reset}`;
    console.log(`  ${statusBadge} ${statusColor}${this.currentSuite.name}${colors.reset} ${colors.dim}(${this.currentSuite.assertions} assertions, ${duration}ms)${colors.reset}`);
    this.currentSuite = null;
  }

  startTest(name) {
    this.totalTests++;
    this.currentTest = {
      name,
      passed: true,
      assertions: 0,
      errors: [],
      startTime: Date.now(),
    };
  }

  endTest() {
    if (!this.currentTest) return;
    const duration = Date.now() - this.currentTest.startTime;
    if (this.currentTest.passed) {
      this.passedTests++;
      if (this.currentSuite) this.currentSuite.passed++;
      console.log(`    ${colors.green}✔${colors.reset} ${colors.dim}${this.currentTest.name}${colors.reset} ${colors.dim}(${this.currentTest.assertions} asserts, ${duration}ms)${colors.reset}`);
    } else {
      this.failedTests++;
      if (this.currentSuite) this.currentSuite.failed++;
      console.log(`    ${colors.red}✖ ${this.currentTest.name}${colors.reset} ${colors.dim}(${duration}ms)${colors.reset}`);
      for (const err of this.currentTest.errors) {
        console.log(`      ${colors.red}Assertion Failure: ${err.message}${colors.reset}`);
        if (err.expected !== undefined && err.actual !== undefined) {
          console.log(`      ${colors.dim}Expected: ${JSON.stringify(err.expected)}${colors.reset}`);
          console.log(`      ${colors.dim}Received: ${JSON.stringify(err.actual)}${colors.reset}`);
        }
      }
    }
    this.currentTest = null;
  }

  recordAssertion(passed, message, expected, actual) {
    this.totalAssertions++;
    if (this.currentSuite) this.currentSuite.assertions++;
    if (this.currentTest) this.currentTest.assertions++;

    if (passed) {
      this.passedAssertions++;
    } else {
      this.failedAssertions++;
      if (this.currentTest) {
        this.currentTest.passed = false;
        this.currentTest.errors.push({ message, expected, actual });
      }
      this.failures.push({
        suite: this.currentSuite ? this.currentSuite.name : 'Unknown Suite',
        test: this.currentTest ? this.currentTest.name : 'Unknown Test',
        message,
        expected,
        actual,
      });
    }
  }

  summary() {
    const duration = Date.now() - this.startTime;
    console.log(`\n${colors.bright}${'='.repeat(70)}${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}         ABHINAYA UNY E2E AUTOMATED TEST RUNNER SUMMARY${colors.reset}`);
    console.log(`${colors.bright}${'='.repeat(70)}${colors.reset}`);
    
    console.log(`  ${colors.bright}Test Suites:${colors.reset}  ${this.totalSuites} total`);
    console.log(`  ${colors.bright}Total Tests:${colors.reset}  ${this.passedTests === this.totalTests ? colors.green : colors.red}${this.passedTests} passed${colors.reset}, ${this.totalTests} total`);
    console.log(`  ${colors.bright}Assertions:${colors.reset}   ${this.failedAssertions === 0 ? colors.green : colors.red}${this.passedAssertions} passed${colors.reset}, ${this.totalAssertions} total`);
    console.log(`  ${colors.bright}Duration:${colors.reset}     ${duration} ms`);
    console.log(`${colors.bright}${'='.repeat(70)}${colors.reset}`);

    if (this.failedTests === 0 && this.failedAssertions === 0) {
      console.log(`\n  ${colors.bgGreen} VERDICT: ALL E2E TESTS PASSED (100% SUCCESS) ${colors.reset}\n`);
      return true;
    } else {
      console.log(`\n  ${colors.bgRed} VERDICT: ${this.failedAssertions} ASSERTIONS FAILED ${colors.reset}\n`);
      console.log(`  ${colors.red}${colors.bright}FAILURE BREAKDOWN:${colors.reset}`);
      for (const f of this.failures) {
        console.log(`  - [${f.suite}] > [${f.test}]: ${f.message}`);
      }
      console.log('');
      return false;
    }
  }
}

const reporter = new TestReporter();

function describe(suiteName, fn) {
  reporter.startSuite(suiteName);
  try {
    fn();
  } catch (err) {
    console.log(`  ${colors.red}Suite Error: ${err.message}${colors.reset}\n${err.stack}`);
  } finally {
    reporter.endSuite();
  }
}

function test(testName, fn) {
  reporter.startTest(testName);
  try {
    fn();
  } catch (err) {
    reporter.recordAssertion(false, `Uncaught Exception: ${err.message}`, undefined, undefined);
  } finally {
    reporter.endTest();
  }
}

const it = test;

class Expectation {
  constructor(actual) {
    this.actual = actual;
  }

  toBe(expected) {
    const passed = Object.is(this.actual, expected);
    reporter.recordAssertion(passed, `Expected ${JSON.stringify(this.actual)} to be ${JSON.stringify(expected)}`, expected, this.actual);
    return this;
  }

  toEqual(expected) {
    const passed = JSON.stringify(this.actual) === JSON.stringify(expected);
    reporter.recordAssertion(passed, `Expected deep equality`, expected, this.actual);
    return this;
  }

  toBeCloseTo(expected, numDigits = 2) {
    const diff = Math.abs(this.actual - expected);
    const tolerance = Math.pow(10, -numDigits) / 2;
    const passed = diff <= tolerance;
    reporter.recordAssertion(passed, `Expected ${this.actual} to be close to ${expected} (tol: ${tolerance})`, expected, this.actual);
    return this;
  }

  toBeGreaterThan(expected) {
    const passed = this.actual > expected;
    reporter.recordAssertion(passed, `Expected ${this.actual} > ${expected}`, `> ${expected}`, this.actual);
    return this;
  }

  toBeGreaterThanOrEqual(expected) {
    const passed = this.actual >= expected;
    reporter.recordAssertion(passed, `Expected ${this.actual} >= ${expected}`, `>= ${expected}`, this.actual);
    return this;
  }

  toBeLessThan(expected) {
    const passed = this.actual < expected;
    reporter.recordAssertion(passed, `Expected ${this.actual} < ${expected}`, `< ${expected}`, this.actual);
    return this;
  }

  toBeLessThanOrEqual(expected) {
    const passed = this.actual <= expected;
    reporter.recordAssertion(passed, `Expected ${this.actual} <= ${expected}`, `<= ${expected}`, this.actual);
    return this;
  }

  toContain(expected) {
    let passed = false;
    if (typeof this.actual === 'string') {
      passed = this.actual.includes(expected);
    } else if (Array.isArray(this.actual)) {
      passed = this.actual.some(item => JSON.stringify(item) === JSON.stringify(expected) || item === expected);
    }
    reporter.recordAssertion(passed, `Expected container to include ${JSON.stringify(expected)}`, expected, this.actual);
    return this;
  }

  toMatch(regex) {
    const passed = regex.test(String(this.actual));
    reporter.recordAssertion(passed, `Expected string to match pattern ${regex}`, regex.toString(), this.actual);
    return this;
  }

  toBeTruthy() {
    const passed = Boolean(this.actual);
    reporter.recordAssertion(passed, `Expected value to be truthy`, 'truthy', this.actual);
    return this;
  }

  toBeFalsy() {
    const passed = !Boolean(this.actual);
    reporter.recordAssertion(passed, `Expected value to be falsy`, 'falsy', this.actual);
    return this;
  }

  toBeDefined() {
    const passed = this.actual !== undefined;
    reporter.recordAssertion(passed, `Expected value to be defined`, 'defined', this.actual);
    return this;
  }

  toBeUndefined() {
    const passed = this.actual === undefined;
    reporter.recordAssertion(passed, `Expected value to be undefined`, undefined, this.actual);
    return this;
  }

  toBeNull() {
    const passed = this.actual === null;
    reporter.recordAssertion(passed, `Expected value to be null`, null, this.actual);
    return this;
  }

  toBeNaN() {
    const passed = Number.isNaN(this.actual);
    reporter.recordAssertion(passed, `Expected value to be NaN`, NaN, this.actual);
    return this;
  }

  toThrow(expectedError) {
    let threw = false;
    let thrownError = null;
    if (typeof this.actual === 'function') {
      try {
        this.actual();
      } catch (err) {
        threw = true;
        thrownError = err;
      }
    }
    let passed = threw;
    if (threw && expectedError) {
      if (typeof expectedError === 'string') {
        passed = thrownError.message.includes(expectedError);
      } else if (expectedError instanceof RegExp) {
        passed = expectedError.test(thrownError.message);
      }
    }
    reporter.recordAssertion(passed, `Expected function to throw`, expectedError || 'Error', thrownError ? thrownError.message : 'No exception thrown');
    return this;
  }
}

function expect(actual) {
  return new Expectation(actual);
}

module.exports = {
  describe,
  test,
  it,
  expect,
  reporter,
  colors,
};
