#!/usr/bin/env node

/**
 * ══════════════════════════════════════════════════════════════════════════════
 *  ABHINAYA UNY ROBOTICS PLATFORM — TEAM ROSTER E2E MULTI-TIER TEST RUNNER
 *  Framework: Pure Node.js Zero-Dependency Test Suite
 *  Requirements: ORIGINAL_REQUEST.md (§R1, §R2, §R3, §R4, §R5) & PROJECT.md
 * ══════════════════════════════════════════════════════════════════════════════
 */

const { reporter, colors } = require('../tests/helpers/test-framework');

// Tier 1: Feature Coverage Suites
const runR1PhotoPipelineTests = require('../tests/e2e/test_r1_photo_pipeline');
const runR2LeadersTests = require('../tests/e2e/test_r2_leaders');
const runR2ManagersTests = require('../tests/e2e/test_r2_managers');
const runR3TechnicalSquadTests = require('../tests/e2e/test_r3_technical_squad');
const runR4AlumniExplorerTests = require('../tests/e2e/test_r4_alumni_explorer');
const runR5CrossfadeEngineTests = require('../tests/e2e/test_r5_crossfade_engine');

// Tier 2: Boundary & Corner Cases Suite
const runTier2BoundaryTests = require('../tests/e2e/test_tier2_boundaries');

// Tier 3: Cross-Feature Combinations Suite
const runTier3CombinationTests = require('../tests/e2e/test_tier3_combinations');

// Tier 4: Real-World Scenarios Suite
const runTier4ScenarioTests = require('../tests/e2e/test_tier4_scenarios');

// Tier 5: Adversarial & Code Integrity Suite
const runTier5IntegrityTests = require('../tests/e2e/test_tier5_integrity');

function printBanner() {
  console.log(`${colors.cyan}${colors.bright}`);
  console.log('╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║        TIM ROBOTIKA ABHINAYA UNY — TEAM ROSTER E2E TEST SUITE        ║');
  console.log('║      Multi-Tier Requirement-Driven Automated Verification Harness    ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝');
  console.log(`${colors.reset}`);
  console.log(`${colors.dim}Target Workspace:${colors.reset} AbhinayaUNY_Web`);
  console.log(`${colors.dim}Coverage:${colors.reset} R1 Renaming, R2 Leaders 2020-2025, R2 Managers 2020-2025, R3 Active Squad, R4 Alumni Explorer, R5 Crossfade Engine\n`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  let tierFilter = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--tier' && args[i + 1]) {
      tierFilter = parseInt(args[i + 1], 10);
    }
  }
  return { tierFilter };
}

function main() {
  printBanner();
  const { tierFilter } = parseArgs();

  if (!tierFilter || tierFilter === 1) {
    console.log(`${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.yellow}${colors.bright}  TIER 1: FEATURE COVERAGE (6 FEATURES, >=5 TESTS EACH)${colors.reset}`);
    console.log(`${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    runR1PhotoPipelineTests();
    runR2LeadersTests();
    runR2ManagersTests();
    runR3TechnicalSquadTests();
    runR4AlumniExplorerTests();
    runR5CrossfadeEngineTests();
  }

  if (!tierFilter || tierFilter === 2) {
    console.log(`\n${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.yellow}${colors.bright}  TIER 2: BOUNDARY & CORNER CASES${colors.reset}`);
    console.log(`${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    runTier2BoundaryTests();
  }

  if (!tierFilter || tierFilter === 3) {
    console.log(`\n${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.yellow}${colors.bright}  TIER 3: CROSS-FEATURE COMBINATIONS${colors.reset}`);
    console.log(`${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    runTier3CombinationTests();
  }

  if (!tierFilter || tierFilter === 4) {
    console.log(`\n${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.yellow}${colors.bright}  TIER 4: REAL-WORLD APPLICATION SCENARIOS${colors.reset}`);
    console.log(`${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    runTier4ScenarioTests();
  }

  if (!tierFilter || tierFilter === 5) {
    console.log(`\n${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.yellow}${colors.bright}  TIER 5: ADVERSARIAL & CODE INTEGRITY${colors.reset}`);
    console.log(`${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    runTier5IntegrityTests();
  }

  const success = reporter.summary();
  if (success) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main();
