# Secrets Management Guide 🔐

This document provides best practices for handling secrets, sensitive data, and environment variables in the PICKL project.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [CI/CD Integration](#cicd-integration)
- [Automated Compliance](#automated-compliance)
- [Best Practices](#best-practices)
- [Common Pitfalls](#common-pitfalls)
- [Security Checklist](#security-checklist)
- [Credential Rotation](#credential-rotation)
- [Troubleshooting](#troubleshooting)

---

## Overview

Secrets management is critical for maintaining the security and integrity of your test automation project. This guide covers how to properly handle:

- Environment variables
- API keys and tokens
- Test credentials
- Configuration secrets
- CI/CD secrets

### What Are Secrets?

**Secrets** are sensitive pieces of information that should never be committed to version control, including:

- Passwords and passphrases
- API keys and tokens
- Database connection strings
- Private keys and certificates
- OAuth client secrets
- Test user credentials with real access

### Why Secrets Management Matters

❌ **Don't do this:**

- Hardcode credentials in test files
- Commit `.env` files to Git
- Share secrets via email or chat
- Use production credentials in tests

✅ **Do this instead:**

- Use environment variables
- Store secrets in `.env` (gitignored)
- Use GitHub Secrets for CI/CD
- Rotate credentials regularly
- Use test accounts with minimal privileges

---

## Environment Variables

### Available Environment Variables

PICKL uses the following environment variables:

| Variable   | Description                                      | Default                              | Required |
| ---------- | ------------------------------------------------ | ------------------------------------ | -------- |
| `BASE_URL` | Base URL of the application under test           | `https://the-internet.herokuapp.com` | No       |
| `HEADLESS` | Run browsers in headless mode                    | `true`                               | No       |
| `BROWSER`  | Browser to use (chromium, firefox, webkit)       | `chromium`                           | No       |
| `TAGS`     | Cucumber tag filter                              | `not @skip`                          | No       |
| `DEBUG`    | Enable debug logging (namespace or `*`)          | -                                    | No       |
| `CI`       | CI environment flag (auto-set by CI platforms)   | -                                    | No       |
| `NODE_ENV` | Node environment (development, test, production) | -                                    | No       |

### Custom Environment Variables

You can add custom environment variables for your specific needs:

```dotenv
# .env file
BASE_URL=https://staging.example.com
API_KEY=your-api-key-here
TEST_USERNAME=test.user@example.com
TEST_PASSWORD=SecurePassword123!
```

**Access in tests:**

```typescript
// In step definitions or page objects
const apiKey = process.env.API_KEY
const username = process.env.TEST_USERNAME

if (!apiKey) {
  throw new Error('API_KEY environment variable is required')
}
```

---

## Local Development

### Setting Up .env File

1. **Copy the example file:**

```bash
cp .env.example .env
```

2. **Edit `.env` with your values:**

```dotenv
# .env (gitignored)
DEBUG=*
HEADLESS=false
BROWSER=chromium
BASE_URL=https://the-internet.herokuapp.com
TAGS=not @skip

# Add any custom secrets here
# API_KEY=your-key-here
# TEST_USERNAME=your-username
# TEST_PASSWORD=your-password
```

3. **Verify `.env` is gitignored:**

```bash
git status
# .env should NOT appear in untracked files
```

### .env File Structure

**✅ Good `.env` file:**

```dotenv
# Browser Configuration
HEADLESS=false
BROWSER=chromium

# Application URLs
BASE_URL=https://staging.example.com
API_BASE_URL=https://api.staging.example.com

# Test Credentials (use test accounts only!)
TEST_ADMIN_USERNAME=admin@test.example.com
TEST_ADMIN_PASSWORD=TestPassword123!
TEST_USER_USERNAME=user@test.example.com
TEST_USER_PASSWORD=UserPassword123!

# API Keys (test environment only!)
API_KEY=test_key_12345abcde
API_SECRET=test_secret_67890fghij

# Debug
DEBUG=playwright:api
```

**❌ Bad `.env` file:**

```dotenv
# DON'T DO THIS!
PROD_PASSWORD=realPassword123  # Production credentials
CREDIT_CARD=1234-5678-9012-3456  # Real PII
AWS_SECRET_KEY=AKIA...  # Real AWS credentials
```

### Loading Environment Variables

Environment variables are automatically loaded in several ways:

**1. Via playwright.config.ts:**

```typescript
import * as dotenv from 'dotenv'
dotenv.config()
```

**2. Via test:debug script:**

```json
{
  "scripts": {
    "test:debug": "tsx --import dotenv/config ..."
  }
}
```

**3. Via command line:**

```bash
# Override for single run
HEADLESS=false npm test

# Windows PowerShell
$env:HEADLESS="false"; npm test

# Windows CMD
set HEADLESS=false && npm test
```

---

## CI/CD Integration

### GitHub Actions Secrets

Store sensitive data in GitHub Secrets for use in CI/CD pipelines.

#### Adding Secrets to GitHub

1. Navigate to your repository on GitHub
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add your secret name and value
5. Click **Add secret**

#### Using Secrets in Workflows

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        env:
          BASE_URL: ${{ secrets.BASE_URL }}
          API_KEY: ${{ secrets.API_KEY }}
          TEST_USERNAME: ${{ secrets.TEST_USERNAME }}
          TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
        run: npm test
```

#### Organization vs Repository Secrets

- **Repository Secrets:** Specific to a single repository
- **Organization Secrets:** Shared across all repositories in an organization
- **Environment Secrets:** Specific to deployment environments (staging, production)

**Best Practice:** Use Repository Secrets for most cases, Organization Secrets for shared infrastructure credentials.

### Environment-Specific Configuration

Use different secrets for different environments:

```yaml
# .github/workflows/ci.yml
jobs:
  test-staging:
    environment: staging
    steps:
      - name: Run tests
        env:
          BASE_URL: ${{ secrets.STAGING_BASE_URL }}
          API_KEY: ${{ secrets.STAGING_API_KEY }}
        run: npm test

  test-production:
    environment: production
    steps:
      - name: Run tests
        env:
          BASE_URL: ${{ secrets.PROD_BASE_URL }}
          API_KEY: ${{ secrets.PROD_API_KEY }}
        run: npm test
```

---

## Automated Compliance

PICKL includes automated tools to enforce secrets management best practices and prevent accidental exposure of sensitive data.

### Environment Validation Script

The project automatically validates your environment configuration before running tests.

**What it checks:**

- ✅ `.env` file is properly gitignored
- ✅ `.env.example` exists with placeholder values
- ✅ Environment variables match expected formats (URLs, booleans, etc.)
- ✅ No dangerous patterns detected (PROD_PASSWORD, AWS keys, etc.)

**When it runs:**

```bash
# Automatically runs before tests
npm test

# Run manually
npm run validate:env
```

**Example output:**

```
🔍 Validating environment configuration...

✅ .env is properly gitignored
✅ .env.example exists

✅ BASE_URL="https://the-internet.heroku..."
✅ HEADLESS="false"
✅ BROWSER="chromium"

🔒 Scanning for potentially sensitive data...

────────────────────────────────────────────────────────────

✅ Environment validation passed!
   All checks completed successfully
```

**If validation fails:**

```
❌ ERROR: .env is not in .gitignore!
   Add ".env" to .gitignore immediately to prevent secret leaks

❌ ERROR: Production password detected
   Found in: PROD_API_KEY
   Production credentials should NEVER be used in tests!

────────────────────────────────────────────────────────────

❌ Environment validation FAILED!

📚 See docs/SECRETS-MANAGEMENT.md for guidance on:
   - Setting up .env files correctly
   - Using test credentials only
   - Proper gitignore configuration
```

### CI/CD Secret Scanning

The GitHub Actions workflow includes automated checks on every pull request:

**Checks performed:**

1. **Verify .env not committed**
   - Ensures `.env` file is not in the repository
   - Blocks merge if detected

2. **Verify .env.example exists**
   - Ensures template file is maintained
   - Helps new contributors set up correctly

3. **Run environment validation**
   - Same checks as local validation
   - Catches issues before merge

**Workflow configuration:**

```yaml
# .github/workflows/ci.yml
secrets-check:
  name: Secrets Management Compliance
  runs-on: ubuntu-latest

  steps:
    - name: Check .env not committed
      run: |
        if git ls-files | grep -q "^\.env$"; then
          echo "❌ ERROR: .env file is committed to repository!"
          exit 1
        fi

    - name: Verify .env.example exists
      run: |
        if [ ! -f .env.example ]; then
          echo "❌ ERROR: .env.example is missing!"
          exit 1
        fi

    - name: Run environment validation
      run: npm run validate:env
```

### GitHub Secret Scanning (Built-in)

GitHub automatically scans for known secret patterns:

**Enabled features:**

- ✅ Secret scanning alerts
- ✅ Push protection (recommended to enable)
- ✅ 200+ secret patterns detected

**How to enable push protection:**

1. Navigate to: **Settings → Code security and analysis**
2. Enable **Push protection for yourself**
3. Enable **Push protection** for the repository

**What it detects:**

- AWS access keys and secrets
- GitHub personal access tokens
- API keys from 100+ services
- Private SSH keys
- Database connection strings
- OAuth tokens

### Validation Script Details

The validation script (`scripts/validate-env.ts`) checks for:

**Format validation:**

```typescript
// BASE_URL must be a valid HTTP(S) URL
BASE_URL = 'https://example.com' // ✅ Valid
BASE_URL = 'example.com' // ❌ Invalid

// HEADLESS must be true or false
HEADLESS = 'false' // ✅ Valid
HEADLESS = 'no' // ❌ Invalid

// BROWSER must be chromium, firefox, or webkit
BROWSER = 'chromium' // ✅ Valid
BROWSER = 'chrome' // ❌ Invalid
```

**Dangerous pattern detection:**

```typescript
// These patterns trigger errors:
PROD_PASSWORD="..."             // ❌ Production password
PROD_API_KEY="..."              // ❌ Production key
API_SECRET="..."                // ❌ API secret
AKIA1234567890ABCDEF            // ❌ AWS access key
sk-1234567890abcdef...          // ❌ OpenAI API key
ghp_1234567890abcdef...         // ❌ GitHub token
AIzaSyABC123...                 // ❌ Google API key
```

### Skipping Validation (When Needed)

In rare cases, you may need to skip validation:

```bash
# Skip validation for one test run
npm test --no-validate

# Or set environment variable
SKIP_VALIDATION=true npm test
```

**⚠️ Warning:** Only skip validation if you understand the security implications.

### Adding Custom Validations

You can extend the validation script with custom checks:

**Edit `scripts/validate-env.ts`:**

```typescript
// Add to envVars array
const envVars: EnvValidation[] = [
  // ...existing validations
  {
    name: 'YOUR_CUSTOM_VAR',
    required: true,
    pattern: /^[A-Z0-9_]+$/,
    description: 'Must be uppercase alphanumeric with underscores',
  },
]

// Add to dangerousPatterns array
const dangerousPatterns = [
  // ...existing patterns
  { pattern: /your-pattern/i, message: 'Your custom warning' },
]
```

---

## Best Practices

### 1. Never Commit Secrets to Git

❌ **Bad:**

```typescript
// pages/LoginPage.ts
const USERNAME = 'admin@example.com'
const PASSWORD = 'SecurePassword123!'
```

✅ **Good:**

```typescript
// pages/LoginPage.ts
const USERNAME = process.env.TEST_USERNAME
const PASSWORD = process.env.TEST_PASSWORD

if (!USERNAME || !PASSWORD) {
  throw new Error('TEST_USERNAME and TEST_PASSWORD must be set')
}
```

### 2. Use .env.example as Template

Keep `.env.example` in Git with placeholder values:

```dotenv
# .env.example (committed to Git)
DEBUG=*
HEADLESS=true
BROWSER=chromium
BASE_URL=https://the-internet.herokuapp.com

# Add your secrets here (see SECRETS-MANAGEMENT.md)
# API_KEY=your-api-key
# TEST_USERNAME=your-username
# TEST_PASSWORD=your-password
```

### 3. Validate Required Environment Variables

Add validation at the start of your tests:

```typescript
// test/support/env-validator.ts
export function validateEnvironment(): void {
  const required = ['BASE_URL']
  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
        'Please check your .env file or CI/CD configuration.',
    )
  }
}

// In hooks.ts
import { validateEnvironment } from './env-validator'

Before(function () {
  validateEnvironment()
})
```

### 4. Use Test Accounts Only

- **Never use production accounts** in automated tests
- Create dedicated test accounts with minimal privileges
- Use accounts that can be safely reset or deleted
- Document test accounts in your team's internal wiki

### 5. Separate Secrets by Environment

```dotenv
# Development .env
BASE_URL=http://localhost:3000
API_KEY=dev_key_12345

# Staging .env
BASE_URL=https://staging.example.com
API_KEY=staging_key_67890

# Production .env (if needed)
BASE_URL=https://example.com
API_KEY=prod_key_abcde
```

### 6. Encrypt Sensitive Files

For files that must be versioned (e.g., certificates):

```bash
# Install git-crypt
brew install git-crypt  # macOS
apt-get install git-crypt  # Linux

# Initialize git-crypt
git-crypt init

# Mark files for encryption in .gitattributes
echo "test/fixtures/certificates/*.pem filter=git-crypt diff=git-crypt" >> .gitattributes

# Add the file
git add test/fixtures/certificates/client-cert.pem
git commit -m "Add encrypted certificate"
```

**Alternative:** Use secret management tools like:

- HashiCorp Vault
- AWS Secrets Manager
- Azure Key Vault
- 1Password CLI

### 7. Minimize Secret Scope

Grant secrets the minimum necessary permissions:

- API keys: Read-only when possible
- Test users: Limited to test data only
- Database credentials: Test database only
- Token expiration: Short-lived tokens

### 8. Log Safely

❌ **Bad:**

```typescript
console.log(`Logging in with username: ${username} and password: ${password}`)
// Output: Logging in with username: admin@test.com and password: SecurePassword123!
```

✅ **Good:**

```typescript
console.log(`Logging in with username: ${username}`)
// Output: Logging in with username: admin@test.com

// Or mask sensitive data
console.log(`Password length: ${password?.length} characters`)
// Output: Password length: 17 characters
```

---

## Common Pitfalls

### Pitfall #1: Committing .env to Git

**Problem:** Accidentally committing `.env` file exposes secrets.

**Solution:**

- Verify `.env` is in `.gitignore`
- Use `git status` before committing
- Enable pre-commit hooks (see [CONTRIBUTING.md](CONTRIBUTING.md))
- Use tools like `git-secrets` to scan for secrets

```bash
# Check if .env is gitignored
git check-ignore .env
# Should output: .env

# If not gitignored, add it
echo ".env" >> .gitignore
git add .gitignore
git commit -m "chore: ensure .env is gitignored"
```

### Pitfall #2: Hardcoding Secrets

**Problem:** Secrets embedded in code are visible to anyone with repository access.

**Solution:**

- Always use environment variables
- Use IDE warnings for common secret patterns
- Enable CodeQL scanning (already configured)

### Pitfall #3: Logging Sensitive Data

**Problem:** Secrets appear in console logs, CI logs, or test reports.

**Solution:**

- Mask or redact sensitive data before logging
- Configure CI to hide secret values
- Review test reports for exposed secrets

```typescript
// Utility function to mask secrets
function maskSecret(secret: string | undefined): string {
  if (!secret || secret.length < 4) return '***'
  return secret.slice(0, 2) + '***' + secret.slice(-2)
}

console.log(`API Key: ${maskSecret(process.env.API_KEY)}`)
// Output: API Key: ab***ef
```

### Pitfall #4: Sharing Secrets Insecurely

**Problem:** Sending secrets via email, Slack, or other unencrypted channels.

**Solution:**

- Use password managers (1Password, LastPass, Bitwarden)
- Use encrypted communication (Signal, encrypted email)
- Use secret sharing tools (HashiCorp Vault, AWS Secrets Manager)
- Set expiration dates on shared secrets

### Pitfall #5: Using Production Credentials

**Problem:** Tests running against production systems with real credentials.

**Solution:**

- Use separate test environments
- Create dedicated test accounts
- Implement environment-specific configuration
- Add safeguards in code:

```typescript
// Prevent accidental production runs
if (process.env.BASE_URL?.includes('production.com') && !process.env.CI) {
  throw new Error('Production URL detected! Tests should not run against production locally.')
}
```

---

## Security Checklist

Use this checklist when handling secrets:

### Initial Setup

- [ ] `.env` is listed in `.gitignore`
- [ ] `.env.example` exists with placeholder values
- [ ] No secrets are hardcoded in source files
- [ ] Required environment variables are documented
- [ ] Environment validation is implemented

### Development

- [ ] Using test accounts only (not production)
- [ ] Secrets are loaded from `.env` or environment
- [ ] Sensitive data is not logged or displayed
- [ ] `.env` file is not committed to Git
- [ ] Pre-commit hooks are configured

### CI/CD

- [ ] GitHub Secrets are configured for CI
- [ ] Secrets are passed as environment variables
- [ ] CI logs don't expose sensitive data
- [ ] Different secrets for different environments
- [ ] Secret rotation schedule is documented

### Code Review

- [ ] No hardcoded credentials in PR
- [ ] Environment variables used correctly
- [ ] Logging doesn't expose secrets
- [ ] `.env.example` updated if new vars added
- [ ] Security scanning passes (CodeQL, npm audit)

### Regular Maintenance

- [ ] Rotate credentials quarterly (or per policy)
- [ ] Review and remove unused secrets
- [ ] Audit secret access logs
- [ ] Update documentation for secret changes
- [ ] Test secret rotation process

---

## Credential Rotation

Regular credential rotation is an important security practice.

### Rotation Schedule

| Secret Type         | Recommended Frequency                     |
| ------------------- | ----------------------------------------- |
| API Keys            | Every 90 days                             |
| Test User Passwords | Every 90 days                             |
| CI/CD Tokens        | Every 180 days                            |
| Certificates        | Per certificate policy (typically 1 year) |

### Rotation Process

1. **Generate New Secret:**
   - Create new API key, password, or token
   - Test in non-production environment first

2. **Update .env.example:**

   ```dotenv
   # Update documentation if format changes
   # API_KEY=your-new-api-key-format
   ```

3. **Update GitHub Secrets:**
   - Navigate to Settings → Secrets → Actions
   - Edit the secret with new value
   - Trigger CI to verify

4. **Update Local .env:**

   ```bash
   # Update your local .env file
   nano .env
   # Update the secret value
   ```

5. **Verify:**

   ```bash
   # Test locally
   npm test

   # Verify CI passes
   git push
   ```

6. **Revoke Old Secret:**
   - Disable or delete old API key
   - Change old password
   - Revoke old token

7. **Document:**
   - Update rotation date in documentation
   - Notify team members if needed

### Emergency Rotation

If a secret is compromised:

1. **Immediately revoke** the compromised secret
2. **Generate and deploy** new secret ASAP
3. **Audit** for unauthorized access
4. **Notify** relevant stakeholders
5. **Review** how the compromise occurred
6. **Implement** additional safeguards

---

## Troubleshooting

### Issue: Tests fail with "Environment variable not set"

**Cause:** Required environment variable is missing.

**Solution:**

1. Check if `.env` file exists:

   ```bash
   ls -la .env
   ```

2. If missing, copy from example:

   ```bash
   cp .env.example .env
   ```

3. Add the required variable to `.env`:

   ```dotenv
   BASE_URL=https://the-internet.herokuapp.com
   ```

4. Verify dotenv is loading:
   ```typescript
   // In playwright.config.ts
   import * as dotenv from 'dotenv'
   dotenv.config()
   console.log('BASE_URL:', process.env.BASE_URL) // Debug line
   ```

### Issue: Secrets work locally but fail in CI

**Cause:** GitHub Secrets not configured or named incorrectly.

**Solution:**

1. Verify GitHub Secrets are set:
   - Go to Settings → Secrets → Actions
   - Check secret names match workflow file

2. Check workflow environment configuration:

   ```yaml
   env:
     BASE_URL: ${{ secrets.BASE_URL }} # Must match secret name exactly
   ```

3. Check for typos (case-sensitive):
   ```yaml
   # Wrong: base_url
   # Wrong: BASE_Url
   # Correct: BASE_URL
   ```

### Issue: .env changes not taking effect

**Cause:** Cached environment variables or process not restarted.

**Solution:**

1. Restart your terminal/IDE
2. Clear Node.js cache:
   ```bash
   npm run clean
   # or
   rm -rf node_modules/.cache
   ```
3. Verify file is saved (check file modification time)
4. Check file encoding (should be UTF-8)

### Issue: Accidentally committed secrets to Git

**Cause:** Secrets were committed before `.env` was gitignored.

**Solution:**

1. **Do not panic** - follow these steps carefully
2. **Immediately revoke** the exposed secret
3. **Remove from Git history**:

   ```bash
   # Using BFG Repo-Cleaner (recommended)
   brew install bfg
   bfg --replace-text passwords.txt  # List of secrets to remove
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive

   # Or using git-filter-repo
   git filter-repo --invert-paths --path .env
   ```

4. **Force push** (coordinate with team):
   ```bash
   git push origin main --force
   ```
5. **Notify team members** to re-clone or rebase
6. **Add safeguards** to prevent recurrence:
   ```bash
   # Install git-secrets
   brew install git-secrets
   git secrets --install
   git secrets --register-aws
   ```

### Issue: Different behavior between environments

**Cause:** Environment variables differ between local and CI.

**Solution:**

1. **Compare environment variables:**

   ```bash
   # Local
   env | grep -E "BASE_URL|API_KEY"

   # CI (add to workflow)
   - name: Debug env
     run: env | grep -E "BASE_URL|API_KEY"
   ```

2. **Standardize variables:**
   - Use same variable names everywhere
   - Document expected values in `.env.example`
   - Add validation to catch mismatches early

3. **Use environment-specific files** (if needed):

   ```bash
   # .env.development
   # .env.staging
   # .env.production

   # Load based on NODE_ENV
   dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
   ```

---

## Additional Resources

### Internal Documentation

- [SECURITY.md](../SECURITY.md) - Security policy and vulnerability reporting
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines including security checklist
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - General troubleshooting guide

### External Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Dotenv Documentation](https://github.com/motdotla/dotenv#readme)
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [12-Factor App: Config](https://12factor.net/config)
- [git-secrets](https://github.com/awslabs/git-secrets) - Prevents committing secrets

### Tools

- **Password Managers:** 1Password, LastPass, Bitwarden
- **Secret Scanning:** GitGuardian, TruffleHog, git-secrets
- **Secret Management:** HashiCorp Vault, AWS Secrets Manager, Azure Key Vault
- **Git History Cleaning:** BFG Repo-Cleaner, git-filter-repo

---

## Questions?

If you have questions about secrets management:

1. Check this guide and [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Search existing issues: https://github.com/jedau/PICKL/issues
3. Ask in team communication channels
4. Create a new issue with label `question`

**Remember:** Never share actual secrets when asking for help. Use placeholder values like `your-api-key-here`.

---

**Last Updated:** December 17, 2025
**Maintainer:** PICKL Team
