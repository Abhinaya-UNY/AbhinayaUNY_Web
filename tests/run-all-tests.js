#!/usr/bin/env node

/**
 * ══════════════════════════════════════════════════════════════════════════════
 *  ABHINAYA UNY ROBOTICS PLATFORM — E2E 4-TIER AUTOMATED TEST RUNNER
 *  Target: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\tests\
 * ══════════════════════════════════════════════════════════════════════════════
 */

const { reporter, colors } = require('./helpers/test-framework');

// 1. Tier 1: Feature Coverage Suites
const runThemeNavbarTests = require('./tier1-features/test-theme-navbar');
const runMediaSocialTests = require('./tier1-features/test-media-social');
const runArchive2019To2021Tests = require('./tier1-features/test-archive-2019-2021');
const runArchive2022To2026Tests = require('./tier1-features/test-archive-2022-2026');
const runMecanumKinematicsTests = require('./tier1-features/test-kinematics-mecanum');
const runOmniKinematicsTests = require('./tier1-features/test-kinematics-omni');
const runFreeRTOSTests = require('./tier1-features/test-freertos-scheduler');
const runPIDControllerTests = require('./tier1-features/test-pid-controller');
const runYoloCVTests = require('./tier1-features/test-yolo-cv-pipeline');
const runTrophyTeamExportTests = require('./tier1-features/test-trophy-team-export');

// 2. Tier 2: Boundary & Corner Cases Suites
const runKinematicsBoundariesTests = require('./tier2-boundaries/test-kinematics-boundaries');
const runPIDCVBoundariesTests = require('./tier2-boundaries/test-pid-cv-boundaries');
const runFreeRTOSBoundariesTests = require('./tier2-boundaries/test-freertos-boundaries');
const runArchiveScoringBoundariesTests = require('./tier2-boundaries/test-archive-scoring-bounds');

// 3. Tier 3: Cross-Feature Combinations Suites
const runKinematicsPIDCouplingTests = require('./tier3-combinations/test-kinematics-pid-coupling');
const runCVPursuitKinematicsTests = require('./tier3-combinations/test-cv-pursuit-kinematics');
const runArchiveStateCouplingTests = require('./tier3-combinations/test-archive-state-coupling');

// 4. Tier 4: Real-World Scenarios Suites
const runUserJourneyLandingTests = require('./tier4-scenarios/test-user-journey-landing');
const runUserJourneyArchiveTests = require('./tier4-scenarios/test-user-journey-archive');
const runUserJourneyKinematicsTests = require('./tier4-scenarios/test-user-journey-kinematics');
const runUserJourneyIntegrityTests = require('./tier4-scenarios/test-user-journey-integrity');

function printBanner() {
  console.log(`${colors.cyan}${colors.bright}`);
  console.log('╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║               TIM ROBOTIKA ABHINAYA UNY WEB PLATFORM                 ║');
  console.log('║           4-TIER COMPREHENSIVE E2E AUTOMATED TEST SUITE              ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝');
  console.log(`${colors.reset}`);
  console.log(`${colors.dim}Target Workspace:${colors.reset} AbhinayaUNY_Web`);
  console.log(`${colors.dim}Standards:${colors.reset} KRTMI 2019-2024, TC 2026, 4WD Mecanum, Closed-Loop PID, 100% Team Data\n`);
}

function main() {
  printBanner();

  console.log(`${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.yellow}${colors.bright}  TIER 1: FEATURE COVERAGE (16 FEATURES)${colors.reset}`);
  console.log(`${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  runThemeNavbarTests();
  runMediaSocialTests();
  runArchive2019To2021Tests();
  runArchive2022To2026Tests();
  runMecanumKinematicsTests();
  runOmniKinematicsTests();
  runFreeRTOSTests();
  runPIDControllerTests();
  runYoloCVTests();
  runTrophyTeamExportTests();

  console.log(`\n${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.yellow}${colors.bright}  TIER 2: BOUNDARY & CORNER CASES (EXTREME CONDITIONS)${colors.reset}`);
  console.log(`${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  runKinematicsBoundariesTests();
  runPIDCVBoundariesTests();
  runFreeRTOSBoundariesTests();
  runArchiveScoringBoundariesTests();

  console.log(`\n${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.yellow}${colors.bright}  TIER 3: CROSS-FEATURE PAIRWISE COMBINATIONS${colors.reset}`);
  console.log(`${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  runKinematicsPIDCouplingTests();
  runCVPursuitKinematicsTests();
  runArchiveStateCouplingTests();

  console.log(`\n${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.yellow}${colors.bright}  TIER 4: REAL-WORLD END-TO-END USER JOURNEYS${colors.reset}`);
  console.log(`${colors.yellow}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  runUserJourneyLandingTests();
  runUserJourneyArchiveTests();
  runUserJourneyKinematicsTests();
  runUserJourneyIntegrityTests();

  const success = reporter.summary();
  if (success) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main();
