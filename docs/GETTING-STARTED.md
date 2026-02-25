# Getting Started

➤ [Home](../README.md)

Follow these steps to set up PICKL on your local machine and run your first automated test.

---

## 🧘 Don't Panic

Breathe in. Breathe out. Let it all flow.

Setting up a new automation framework can feel overwhelming, but you've got this! These steps are designed to get you up and running smoothly. If this is your second time through, feel free to skip ahead to specific sections. Running into issues? Check the [FAQ](#faq) or [Troubleshooting](#troubleshooting) section - we've got your back.

Ready? Steady? Let's go! 🚀

---

## Prerequisites

Before you begin, make sure you have:

1. **Git** - [Download Git](https://github.com/git-guides/install-git)
2. **Node.js v22.22.0 or higher** - Check `.nvmrc` for the exact version
3. **Visual Studio Code** (recommended) - [Download VS Code](https://code.visualstudio.com/download)

---

## Step 1: Install Node.js

### Option A: Using NVM (Recommended)

NVM lets you manage multiple Node.js versions easily.

**Install NVM:**

- Follow the [NVM Install Guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
- **Windows users:** Restart your machine after installation

**Install and use Node.js:**

```bash
nvm install 22.22.0
nvm use 22.22.0
```

### Option B: Direct Installation

If you already have Node.js v22.22.0+ installed, you're good to go. Skip to Step 2.

---

## Step 2: Fork and Clone the Repository

1. **Fork the repository** on GitHub:
   - Go to https://github.com/jedau/PICKL
   - Click the **Fork** button (top right)

2. **Clone your fork:**

   ```bash
   git clone https://github.com/YOUR-USERNAME/PICKL.git
   cd PICKL
   ```

3. **Configure Git:**
   ```bash
   git config --local user.name "Your Name"
   git config --local user.email "your.email@example.com"
   git config --local pull.rebase false
   git config --local push.autosetupremote true
   ```

---

## Step 3: Install Dependencies

```bash
npm install
```

This command:

- Installs all required packages
- Sets up Git hooks (pre-commit, commit-msg validation)
- Prepares your development environment

---

## Step 4: Install Playwright Browsers

```bash
npx playwright install
```

**⚠️ This step is required!** Skipping it will cause test failures:

- "Executable doesn't exist"
- "Failed to attach video: ENOENT"

---

## Step 5: Configure Environment Variables

**Create your local `.env` file:**

```bash
# For Mac/Linux:
cp .env.example .env

# For Windows:
copy .env.example .env
```

### Why This Matters

**`.env.example`** - Template file committed to Git

- Contains all available configuration options with example values
- Safe to commit (no sensitive data)
- Updated by maintainers when new variables are added

**`.env`** - Your personal configuration (gitignored)

- Created from `.env.example`
- Contains your local settings
- **Never committed to Git** (contains environment-specific values)
- Safe place to customize settings without affecting others

### What's Inside

```dotenv
# Debug logging (commented out by default)
# DEBUG=framework:*,test:*

# Browser display mode
HEADLESS=true

# Browser type (chromium, firefox, webkit)
BROWSER=chromium

# Base URL for your tests
BASE_URL=https://the-internet.herokuapp.com

# Tag filtering
TAGS=not @skip
```

**Default settings work out of the box** - no need to modify unless you want to customize your local environment.

---

## Step 6: Install VS Code Extensions (Recommended)

Open the project in VS Code. You'll be prompted to install recommended extensions:

- **Cucumber (Gherkin) Full Support** - Syntax highlighting and autocomplete
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **EditorConfig** - Consistent editor settings
- **Playwright Test for VSCode** - Debug tests visually

Click **Install All** when prompted, or install them manually from the Extensions tab.

---

## Step 7: Run Your First Test

```bash
npm test
```

You should see tests running with emoji indicators:

- ⏳ Running
- ✅ Passed
- ❌ Failed
- ⊘ Skipped

**If tests fail**, check the [Troubleshooting Guide](TROUBLESHOOTING.md).

---

## Step 8: View the Test Report

```bash
npm run report
```

This generates an HTML report and opens it in your browser automatically.

---

## What's Next?

Choose your path based on your goals:

**📚 New to BDD or Playwright?**

- Read [Why BDD?](WHY-BDD.md) - Understand the benefits and philosophy
- Start with the [Learning Path](LEARNING-PATH.md) - A structured 3-week program
- Review the [Glossary](GLOSSARY.md) for terminology

**✍️ Ready to Write Tests?**

- Read [Writing Tests](WRITING-TESTS.md) for Gherkin syntax
- Check [API Reference](API-REFERENCE.md) for available Page Objects
- See [Running Tests](RUNNING-TESTS.md) for execution options

**🤝 Want to Contribute?**

- Follow the [Contributing Guide](CONTRIBUTING.md)
- Review [Branching Strategy](BRANCHING-STRATEGY.md)
- Learn [Naming Conventions](NAMING-CONVENTION.md)

**⚠️ Having Issues?**

- Check [Common Mistakes](COMMON-MISTAKES.md) (28 common pitfalls)
- See [Troubleshooting](TROUBLESHOOTING.md) for solutions

---

## FAQ

### I already have Node.js installed. Do I need NVM?

Not required if you already have v22.22.0 or higher. However, NVM is useful if:

- You work on multiple projects with different Node.js versions
- You want to easily switch between versions

### Do I have to use VS Code?

No, but it's recommended. The project includes VS Code-specific:

- Extension recommendations
- Workspace settings
- Debug configurations
- Task definitions

You can use any IDE, but you'll need to configure it yourself.

### What if I skip creating the .env file?

Tests will use default values from the framework, which should work fine. However:

- You won't be able to customize your local environment
- Debug logging will be disabled
- Some configuration options won't be available

### Can I modify .env.example directly?

**No!** Always work with `.env` instead:

- `.env.example` is tracked in Git (affects everyone)
- `.env` is gitignored (your personal settings)
- Copy `.env.example` → `.env`, then modify `.env`

### Why is DEBUG commented out in .env.example?

Debug logging can cause process termination issues (EPIPE errors). It's disabled by default for stability. Enable it only when actively debugging:

```dotenv
DEBUG=framework:*,test:*
```

---

## Troubleshooting

### "Command not found: npm"

Node.js not installed or not in PATH. Reinstall Node.js or restart your terminal.

### "ENOENT: no such file or directory"

You likely skipped `npx playwright install`. Run it now.

### "ERROR: Cannot find module"

Dependencies not installed. Run `npm install`.

### ".env file missing" warnings

Create your `.env` file: `cp .env.example .env`

### Tests hanging or not terminating

Check if DEBUG is enabled in your `.env`. Comment it out:

```dotenv
# DEBUG=framework:*,test:*
```

For more issues, see the comprehensive [Troubleshooting Guide](TROUBLESHOOTING.md).

---

## Related Documentation

- [Running Tests](RUNNING-TESTS.md) - Test execution options (tags, browsers, files)
- [Writing Tests](WRITING-TESTS.md) - Gherkin syntax and feature files
- [Contributing Guide](CONTRIBUTING.md) - Contribution workflow and standards
- [Troubleshooting](TROUBLESHOOTING.md) - Solutions for common issues
- [Common Mistakes](COMMON-MISTAKES.md) - Avoid these 28 pitfalls

[⬆️ Back to Top](#getting-started)
