# Branching Strategy

➤ [Home](../README.md)

So, you've already set up your local. That's great! Now, it's time to get to work. Follow along so we can all work harmoniously.

## Principle

The main branching strategy we're going to be using is called [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow). You can read more about it in the link if you're interested. It's a lightweight strategy that takes advantage of the smaller size of the team.

Basically, there is only one `main` branch, which should always be the most stable version of PICKL. Then, all of the developmental work would be done on feature branches. This foregoes the usual `develop` branch paradigm, removing staging branch between the feature branches and `main`.

We won't get into those details here, instead we're going to focus on how the chosen branching strategy would apply to us. So, let's get to it!

---

### 1. Identify your task

- Pick a feature or fix you want to work on from the project's issue tracker or backlog
- If working on an existing issue, make note of the issue number for reference in your branch name

### 2. Create a feature branch based on the task

- Create a descriptive branch name that includes the issue/task identifier if applicable
- You can create a branch using the GitHub web interface or via command line:
  - **Via command line**: In a terminal pointing to the `PICKL` repository, run:
    ```
    git checkout -b <BRANCH_NAME>
    ```
  - **Via GitHub**: Navigate to the repository, click the branch dropdown, type your new branch name, and create it
- Branch naming convention: Use a descriptive name that reflects what you're working on. Examples:
  - `feature/issue-123-add-login-test`
  - `fix/issue-456-flaky-timeout`
  - `docs/update-readme`
- If working with an issue number, include it in the branch name to link your work to the issue

### 3. Checkout your branch

- In a terminal pointing to your repository (or on your preferred Git client GUI), checkout the branch you just created
- If you created the branch via command line with `git checkout -b`, you should automatically be on that branch
- If you created the branch via GitHub or need to switch to an existing branch, use the command:
  ```
  git checkout <BRANCH_NAME>
  ```
- No matter the method of creation, as long as the branch name is descriptive, it will help track your work

### 4. Hack away responsibly

- As much as possible, only include changes that are relevant to your task on your branch
- Keep PRs as specific as possible. It's tempting to include multiple things in the same branch, but this would make identifying the root cause of issues harder (in case changes you've made cause PICKL to break :sweat_smile:)
- If you need to make different changes to multiple aspects of PICKL, please try to keep the commits separate
- Test your changes on your local. Make sure to test only the specific cases you created if you're still running through it and revising so that you don't consume too much resources.
- You can run it non-Headless just so you can see it executing

### 5. Commit to it

- Commit your changes to staging by running this command:

```
  git add . (if you want to add all the files on which you've made changes)
  OR
  git add <SPECIFIC_FILES>  (if you want to add only select files)
```

- Using the GUI is quite advantageous for this one because it would be easy to just pick which files you want to include in case you're not committing everything
- While we're still not introducing branch prefixes for branch names yet, we're going to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for commit messages. You can read more about it in the link included. The commit message should follow this format _(note: remove the <> when you're replacing with the correct value)_:

```
  <type>(<issue-number>): <summary in lower case>
```

- The type can be any one of the following depending on the context:
  - `feat` - for new features; rarely used in our case
  - `fix` - for bug fixes to existing code
  - `docs` - for changes to the documentation (e.g. comments, etc)
  - `style` - for formatting changes (e.g. missing semi colons, forgot to prettify code); no change in functionality
  - `refactor` - for refactoring code (e.g. renaming a variable); no change in functionality, just simple refactors
  - `test` - for adding missing tests, refactoring tests and changing any functionality to the steps; this is the most common type we're going to use
  - `chore` - for updating tasks, resolving conflicts and other behind-the-scenes functionality
- You can make a commit using the GUI or running this command in the CLI:

```
  git commit -m "<your commit message here>"
```

- As mentioned earlier, you can make several commits in one PR, especially if you're dealing with multiple aspects. Some people even make separate commits just for resolving conflicts, which is especially helpful if you're not confident with how you resolve conflicts
- No need to add a body and a footer unless needed for additional context. You can include detailed information in the PR description when you create one

### 6. Stay up-to-date with the latest code and resolve any conflicts

- Now, _this_ is where we get to GitHub flow's weak spot. Since we're branching off of only one main branch, it's easy to have conflicts, especially since other people might be working on the same files as you
- Once you've committed your changes (and before you push it to the remote branch), make sure to pull from the latest `main` branch and merge it to your branch:

  ```
    git checkout main
    git pull
    git checkout -
    git merge main
  ```

  - What that sequence does is you switch to the `main` branch, pull from the latest code so that your local `main` branch is up-to-date with the remote, switch back to your previous/feature branch, and then merge main to your branch

  - If there are any conflicts, you will be prompted to resolve them at this point. Pulling from main makes sure that you're dealing with conflicts earlier so you wouldn't need to deal with them after you've created a Pull Request (PR)

- Conflicts will arise if there is new code pushed to main that makes overlaps with changes you've made. This is normal, but it's also an incentive for you to keep your code very specific to your task so that it has less chance of overlapping with other people's changes

### 7. Push it!

- After you've finalized your commits, all there is left is to push your code. If you've set up your repository remote correctly, it would be as easy as running this command:

```
  git push
```

- You should be able to receive a confirmation message that says everything was pushed correctly
- However, if you weren't able to set it up correctly, you can run this command to set up your remote repository:

```
  git remote add origin https://github.com/jedau/PICKL.git
```

- Check if it's set up correctly by running:

```
  git remote -v
```

- Then run `git push` again
- If you're still not able to push, one alternative method is to indicate your branch explicitly:

```
  git push origin <YOUR-BRANCH-NAME>
```

After pushing your changes, now comes the fun part. Head on over to [Creating/Reviewing a Pull Request](PULL-REQUEST.md) for more details
