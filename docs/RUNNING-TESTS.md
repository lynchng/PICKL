# Running Tests

This guide covers various ways to run tests in PICKL.

## Table of Contents

- [Basic Test Execution](#basic-test-execution)
- [Running Specific Browsers](#running-specific-browsers)
- [Tag-Based Filtering](#tag-based-filtering)
- [Running Specific Files](#running-specific-files)
- [Running Specific Scenarios](#running-specific-scenarios)
- [Environment Variables](#environment-variables)
- [Viewing Reports](#viewing-reports)

## Basic Test Execution

### Run all tests

```bash
npm test
```

This executes all feature files in `test/features/` using the default browser (Chromium). The custom verbose formatter shows real-time test execution progress with step-by-step feedback.

### Run with headed browser (see the browser)

```bash
HEADLESS=false npm test
```

By default, tests run in headless mode (browser runs in background). Set `HEADLESS=false` to see the browser window during test execution. The browser automatically closes after tests complete in both modes.

To persist this setting for local development, modify `.env`:

```properties
HEADLESS=false
```

## Running Specific Browsers

PICKL supports three browser engines: Chromium, Firefox, and WebKit.

```bash
# Run on Chromium (default)
npm run test:chromium

# Run on Firefox
npm run test:firefox

# Run on WebKit (Safari engine)
npm run test:webkit
```

### Browser scripts with additional options

The browser-specific scripts now support all test options. However, due to npm script chaining, you need double `--` or use environment variables directly.

```bash
# Recommended: Use environment variable directly
BROWSER=firefox npm test -- --tags @smoke
BROWSER=webkit npm test -- test/features/login.feature
BROWSER=firefox npm test -- --tags @positive test/features/checkboxes.feature

# Alternative: Use predefined scripts with double --
npm run test:firefox -- -- --tags @smoke
npm run test:webkit -- -- test/features/login.feature

# Combine with headed mode
HEADLESS=false BROWSER=firefox npm test -- --tags @smoke
```

## Tag-Based Filtering

Tests are organized using Cucumber tags for flexible execution. Tags can be combined using boolean logic (`and`, `or`, `not`) for precise test filtering.

### Available Tags

- `@smoke` - Quick smoke tests
- `@regression` - Full regression suite
- `@positive` - Happy path scenarios
- `@negative` - Error handling tests
- `@test` - General test scenarios
- Custom tags can be added to any scenario

### Run tests by tag

```bash
# Run predefined tag suites
npm run test:smoke
npm run test:regression

# Run tests with custom tag using --tags flag
npm test -- --tags @positive
npm test -- --tags @test

# Combine tags with AND logic
npm test -- --tags "@smoke and @positive"
npm test -- --tags "@positive and @test"

# Exclude tags with NOT logic
npm test -- --tags "not @test"
npm test -- --tags "@smoke and not @test"

# Multiple conditions with OR logic
npm test -- --tags "@smoke or @regression"
npm test -- --tags "@positive or @negative"

# Complex expressions with parentheses
npm test -- --tags "(@smoke or @regression) and not @wip"
npm test -- --tags "@positive and @test and not @skip"
```

### Tag Priority and Override

When tags are specified in multiple ways, the priority order is:

1. **CLI `--tags` flag** (highest priority) - overrides all other tag settings
2. **`TAGS` environment variable** - used if no CLI tags provided
3. **No tags** (default) - runs all tests

```bash
# CLI tags override environment variable
TAGS=@smoke npm test -- --tags @positive  # Runs @positive, not @smoke
```

## Running Specific Files

### Run a single feature file

```bash
npm test -- test/features/login.feature
npm test -- test/features/checkboxes.feature
```

### Run multiple feature files

```bash
npm test -- test/features/login.feature test/features/checkboxes.feature
```

### Run specific file with browser

```bash
BROWSER=firefox npm test -- test/features/login.feature
```

### Run specific file with tags

```bash
npm test -- --tags @positive test/features/login.feature
npm test -- --tags "@smoke and not @test" test/features/checkboxes.feature
```

### Flexible argument order

The test script accepts arguments in any order:

```bash
# Feature file first, then tags
npm test -- test/features/login.feature --tags @positive

# Tags first, then feature file
npm test -- --tags @positive test/features/login.feature
```

## Running Specific Scenarios

### Filter by scenario name

```bash
# Run scenarios matching "login"
npm test -- --name="login"

# Run specific scenario
npm test -- --name="Successful login with valid credentials"

# Partial match (case-insensitive)
npm test -- --name="checkbox"
```

### Combine name and tag filters

```bash
npm test -- --name="login" --tag="@positive"
```

## Environment Variables

PICKL uses environment variables for configuration. Set them in `.env` or override at runtime.

### Available Variables

```bash
# Browser display mode (default: true for headless)
HEADLESS=false

# Select browser (chromium, firefox, webkit)
BROWSER=firefox

# Enable debug logging
DEBUG=*

# Set base URL
BASE_URL=https://the-internet.herokuapp.com

# Set tag filter (CLI --tags flag takes precedence over this)
TAGS="@smoke"

# CI mode (affects retries and screenshots)
CI=true
```

**Note:** The `TAGS` environment variable in `.env` should generally be commented out to avoid conflicts with CLI `--tags` flags. CLI tags always take precedence.

### Override at runtime

Runtime environment variables override `.env` settings, allowing flexible test configuration without modifying files.

```bash
# Run with different URL
BASE_URL=https://staging.example.com npm test

# Run with debug logging
DEBUG=pw:api npm test

# Run in CI mode
CI=true npm test

# Run with specific browser
BROWSER=webkit npm test

# See browser window during test execution
HEADLESS=false npm test

# Combine multiple overrides (recommended approach)
HEADLESS=false BROWSER=firefox npm test -- --tags @smoke
BROWSER=webkit npm test -- test/features/login.feature
```

### Cross-platform environment variables

```bash
# Works on Windows, macOS, and Linux
cross-env HEADLESS=false npm test
```

## Viewing Reports

After test execution, PICKL automatically generates and opens an HTML report in your browser.

### Generate and open report

```bash
# Generate report from latest test results and open in browser
npm run report

# Generate report only (without opening)
# Note: Report generation is automatic after npm test completes
```

### HTML Report Features

The report is generated at: `test-results/html-report/index.html`

**Report Features:**

- 🥒 Custom pickle emoji favicon
- 🌙 Dark/Light mode toggle (remembers your preference)
- 📊 Detailed scenario results with step breakdowns
- ⏱️ Execution times and timestamps
- 📋 Test metadata (browser, platform, environment)

### Dark Mode Toggle

Click the **🌙 Dark** / **☀️ Light** button in the report header to toggle between themes. Your preference is saved automatically.

### Manual Access

You can also manually open the report:

```bash
# On Windows
start test-results/html-report/index.html

# On macOS
open test-results/html-report/index.html

# On Linux
xdg-open test-results/html-report/index.html
```

### JSON Report

Raw test results are available in JSON format at `test-results/cucumber-report.json` for CI/CD integration or custom reporting.

### Real-time Test Output

During test execution, the custom verbose formatter displays real-time progress with emoji indicators:

- **▶️** Scenario name when it starts
- **⏳** Step text while executing
- **✅** Success - step passed
- **❌** Failure - step failed
- **⊘** Skipped - step was skipped
- **⚠️** Warning - step has other status

The step indicators update in real-time: each step starts with ⏳ and instantly updates to the final status (✅, ❌, or ⊘) when complete.

Example output:

```
▶️  Running: Successful login with valid credentials
  ✅ I am on the login page
  ✅ I enter username "tomsmith"
  ✅ I enter password "SuperSecretPassword!"
  ✅ I click the login button
  ✅ I should see the secure area page
  ✅ I should see a success message "You logged into a secure area!"

Test Execution Summary:
5 scenarios (5 passed)
22 steps (22 passed)
68.842s
```

The summary at the end shows:

- Total scenarios with pass/fail/skip counts
- Total steps with pass/fail/skip counts
- Total execution time in seconds

## VS Code Integration

PICKL includes VS Code configurations for seamless development experience.

### Running Tests via Command Palette

Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac), then type "Run Task" and select:

- **Run Current Feature File** - Runs the currently open `.feature` file
- **Run All Tests** - Executes all tests
- **Run Smoke Tests** - Runs tests tagged with `@smoke`
- **Generate Report** - Creates and opens the HTML report

### Quick Keyboard Shortcuts

You can bind tasks to keyboard shortcuts by editing `.vscode/keybindings.json`:

```json
[
  {
    "key": "ctrl+shift+t",
    "command": "workbench.action.tasks.runTask",
    "args": "Run Current Feature File"
  }
]
```

### Cucumber Language Support

The official Cucumber extension provides:

- ✅ **Syntax highlighting** for `.feature` files
- ✅ **Go to Definition** - Ctrl+Click on steps to jump to definitions
- ✅ **Autocomplete** - IntelliSense for step definitions
- ✅ **Formatting** - Auto-format Gherkin syntax

**Note:** The Cucumber extension provides language features but not test explorer integration. Use the command palette tasks or terminal commands to run tests.

### Step Definition Navigation

To navigate from a feature file step to its implementation:

1. Open a `.feature` file
2. Hold `Ctrl` (or `Cmd` on Mac) and click on any step
3. VS Code will jump to the step definition in the TypeScript file

### Integrated Terminal

Run tests directly in VS Code's integrated terminal:

1. Press `` Ctrl+` `` (backtick) to open terminal
2. Run any npm test command
3. See real-time execution output with color formatting

## Advanced Examples

### Parallel Execution

Currently set to `parallel: 1`. To run tests in parallel:

1. Update `cucumber.js` profile:

```javascript
parallel: 2 // Run 2 scenarios in parallel
```

2. Run tests:

```bash
npm test
```

### Dry Run (validate scenarios without execution)

```bash
npx cucumber-js --dry-run
```

### List all scenarios

```bash
npx cucumber-js --dry-run --format summary
```

### Debug Mode

```bash
# Run with Node.js debugger
node --inspect-brk ./node_modules/.bin/cucumber-js

# Run with Playwright Inspector
PWDEBUG=1 npm test
```

## Troubleshooting

### Tests fail to start

- Ensure dependencies are installed: `npm install`
- Check Node.js version matches `.nvmrc`: `node --version`
- Verify `.env` file exists with `BASE_URL` configured
- Check that no other processes are using required ports

### Browser not launching or not closing

**Browser not launching:**

- Set `HEADLESS=false` to see browser window and identify issues
- Check if ports are blocked by firewall
- Try different browser: `BROWSER=firefox npm test`
- Ensure Playwright browsers are installed: `npx playwright install`

**Browser not closing after tests:**

- Browsers should close automatically after tests complete in both headless and headed modes
- If browsers remain open, check for:
  - Tests hanging or not completing (check for infinite loops or timeouts)
  - Errors in After hooks preventing cleanup
  - Orphaned browser processes from previous failed runs: Kill them manually via Task Manager/Activity Monitor
- Verify the After hook in `test/support/hooks.ts` is executing properly

### Cannot find feature files

- Ensure feature files are in `test/features/` directory
- Check file extension is `.feature`
- Verify `cucumber.js` paths configuration

### Step definitions not found

- Check step files are in `test/steps/` directory
- Verify TypeScript compilation: `npx tsc --noEmit`
- Ensure imports are configured correctly in test scripts

### Tags not working as expected

- Remember CLI `--tags` overrides `TAGS` environment variable
- Comment out `TAGS` in `.env` to avoid conflicts: `# TAGS=@smoke`
- Use quotes for complex expressions: `"@smoke and not @test"`
- Verify tags exist in feature files with `@` prefix

## Quick Reference

````bash
# Most common commands
npm test                                                    # Run all tests (headless)
npm test -- --tags @smoke                                   # Run smoke tests
npm test -- --tags "@positive and @test"                    # Run with AND logic
npm test -- --tags "@smoke or @regression"                  # Run with OR logic
npm test -- --tags "not @test"                              # Exclude specific tag
npm test -- test/features/login.feature                     # Run specific file
npm test -- --tags @positive test/features/login.feature    # Combine tags and file

# Browser selection (recommended approach)
BROWSER=firefox npm test -- --tags @smoke                   # Firefox with tags
BROWSER=webkit npm test -- test/features/login.feature      # WebKit with file

# See browser during execution
HEADLESS=false npm test                                     # See browser window
HEADLESS=false BROWSER=firefox npm test -- --tags @smoke    # Firefox headed mode

# Generate and view report
npm run report                                              # Generate and auto-open HTML report
```---

For more information, see the main [README.md](./README.md) or check the [Cucumber documentation](https://cucumber.io/docs/cucumber/).
````
