#!/usr/bin/env node

/**
 * Project Cleanup Script
 *
 * This script removes temporary files, test artifacts, and caches to free up disk space
 * and ensure a clean development environment.
 *
 * Usage:
 *   npm run clean:all
 *   node scripts/cleanup.ts
 */

import { rm, access } from 'fs/promises'
import { join } from 'path'
import { constants } from 'fs'
import Debug from 'debug'

const debug = Debug('framework: cleanup')

interface CleanupTarget {
  path: string
  description: string
  optional?: boolean
}

const CLEANUP_TARGETS: CleanupTarget[] = [
  {
    path: 'test-results',
    description: 'Test results directory',
  },
  {
    path: 'node_modules/.cache',
    description: 'Node modules cache',
  },
  {
    path: 'playwright-report',
    description: 'Playwright HTML report',
    optional: true,
  },
  {
    path: '.playwright',
    description: 'Playwright cache',
    optional: true,
  },
  {
    path: 'coverage',
    description: 'Code coverage reports',
    optional: true,
  },
  {
    path: '.nyc_output',
    description: 'NYC coverage output',
    optional: true,
  },
  {
    path: 'downloads',
    description: 'Downloaded test files',
    optional: true,
  },
]

async function exists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

async function cleanupDirectory(target: CleanupTarget): Promise<void> {
  const fullPath = join(process.cwd(), target.path)

  if (await exists(fullPath)) {
    try {
      await rm(fullPath, { recursive: true, force: true })
      debug(`✓ Cleaned: ${target.description} (${target.path})`)
    } catch (error) {
      if (target.optional) {
        debug(
          `⚠ Skipped: ${target.description} (${target.path}) - ${error instanceof Error ? error.message : 'Unknown error'}`,
        )
      } else {
        debug(
          `✗ Failed: ${target.description} (${target.path}) - ${error instanceof Error ? error.message : 'Unknown error'}`,
        )
        throw error
      }
    }
  } else {
    debug(`○ Not found: ${target.description} (${target.path})`)
  }
}

async function cleanup(): Promise<void> {
  debug('🧹 Starting project cleanup...\n')

  let cleaned = 0
  let skipped = 0
  let notFound = 0

  for (const target of CLEANUP_TARGETS) {
    try {
      const fullPath = join(process.cwd(), target.path)
      const targetExists = await exists(fullPath)

      if (targetExists) {
        await cleanupDirectory(target)
        cleaned++
      } else {
        notFound++
      }
    } catch (error) {
      if (target.optional) {
        skipped++
      } else {
        throw error
      }
    }
  }

  debug('\n📊 Cleanup Summary:')
  debug(`   ✓ Cleaned: ${cleaned}`)
  debug(`   ○ Not Found: ${notFound}`)
  if (skipped > 0) {
    debug(`   ⚠ Skipped: ${skipped}`)
  }
  debug('\n✨ Cleanup complete!')
}

// Run cleanup
cleanup().catch(error => {
  debug('\n❌ Cleanup failed:', error instanceof Error ? error.message : 'Unknown error')
  process.exit(1)
})
