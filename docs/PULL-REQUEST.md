# Creating/Reviewing a Pull Request

➤ [Home](../README.md)

So, you've branched out, did your thing, and now it's time to pull it back in. Read on below to help you navigate what you need to do.

---

Once you've pushed your changes to your branch, you're halfway through. Pull Requests (PR) are an essential part of the development process because this is where your peers get to review and scrutinize your work.

## Importance of the Review Process

We learn from each other, and what better way to learn than by showcasing your approach for everyone to review? This is where code quality is maintained and knowledge is shared across the team.

When you are at the receiving end of a review, always remember to be open to criticism and consider suggestions as aid to improving your approach. We are all in this together, working towards the same goal. So, consistency, collaboration and efficiency are paramount to our undertaking.

When you have been assigned as an approver, be mindful of how you leave reviews. Review the way you want to be reviewed. Whenever you can, try to practice [radical candor](https://www.radicalcandor.com/blog/what-is-radical-candor/). Scrutinize, but be kind. Make sure to point out any errors and try the code out on your local to see if it performs correctly.

With all that being said, let's get to the steps.

## Creating a Pull Request

### 1. Initiate a Pull Request

- Go to the [Pull Request](https://github.com/jedau/PICKL/pulls) page of the repository and click on the New Pull Request button on the upper-right
  ![create-pull-request](https://t9004120740.p.clickup-attachments.com/t9004120740/5e01dcdb-fa27-4de8-8aef-f7f5d624e126/image.png)

### 2. Choose a Source and Destination branch

- Choose your branch as the source branch and `main` as the destination branch (base branch)
- Technically speaking, this is the venue to choose what you're merging and where you're merging it.
- Ideally, we will always merge to `main` but in rare instances where we have to fix conflicts, we might designate a staging branch so that we can keep the stability of the `main` branch

### 3. Input a title

- Strictly speaking, you can write whatever title you want as long as it's descriptive to what the PR contains
- For the purpose of uniformity, prefix your title with the TaskID in between square brackets i.e. `[TASK-ID] YOUR DESCRIPTIVE TITLE`

### 4. Write a killer description

- Most people just disregard the Description (it's even optional!) but for me, I think the Description is one of the most integral parts of the PR
- Use this space as a place to explain your thought process, and what went in to the fix. Talk about caveats and what to look out for in case your test is flaky. Describe what your test should do and how you're able to achieve it through your PR
- Normally, this is a place where checklists are matched with acceptance criteria. There are even automations that restrict merging if not all tasks have been completed. However, that might be something we could iterate on down the line. For sure, there would be a template for this as we progress but for now, feel free to write in whatever format you want

### 5. Add reviewers

- Add relevant reviewers who are familiar with the codebase to review your changes
- When everyone is more familiar with the project, feel free to request reviews from multiple team members

### 6. Delete your remote branch

- Tick the checkbox that says `Delete YOUR-BRANCH-NAME after the pull request is merged` so that the branches won't pile up
  If you feel that you have some unfinished code you want to revisit, you're free to not delete your branch in the meantime, but make sure to delete it in the [Branches](https://github.com/jedau/PICKL/branches) page when you're done. Keep the repository clean and organized!

### 7. Click the Create pull request button

- That's all there is to it!

### 8. Ask for a review

- Let your reviewers know that they have a pending review so that you can get the ball rolling!
- In an ideal scenario, there would be no comments and you're free to merge your PR as is. However, in case there are comments, do your best to address them, change the necessary things on your local and then push your changes to your remote branch.
- In case you're already coding a different feature, be sure to switch over to the correct branch when you're making changes. We don't want to combine different changes from different features into one PR
- If you receive comments, treat them as feedback for your code. You can address them accordingly or if you feel that your approach is correct you can ~~argue~~ discuss peacefully and justify your thought process
- Once you've settled the comment, either by addressing it or discussing, mark the conversation as resolved. GitHub allows both the author and reviewer to resolve conversations.

### 9. Stick the landing

- Once all comments have been settled and you've received all of the necessary approvals, all there is left is to merge the code
- Sometimes, the review took too long and newer code that conflicts with your code have been merged ahead. It's frustrating, but it happens sometimes. `git pull` the latest `main` code to your branch, resolve the conflicts, make sure that everything still runs as expected and then merge your code. Since you're the one responsible for resolving the conflicts, make sure that the newer code that conflicted with yours still runs as expected as well. We don't want a situation where your resolution broke other people's code
- And... you're done! Great work! I'm sure that your contribution to PICKL pushes the whole codebase forward. When you're ready, pick up a new task and start a whole new round

## Reviewing a Pull Request

When you are assigned as a reviewer/approver, you are given a huge responsibility of maintaining the proper flow of the development process. Feel free to review PRs even when not explicitly assigned to help maintain code quality across the project.

Here are a couple of things that you need to be aware of:

### 1. Review the code

- Check if good coding standards are observed and that the code doesn't use any faulty logic. This is a form of Static Testing.
- Feel free to comment on coding style, how variables are named, anything.
- This review is not limited to criticism. Use this opportunity to praise impressive solutions as well!
- Part of the review is that you run the code on your local to see that it is performing as expected. Any deviations or anomalies can be brought up as a comment to the PR.
  - To pull the branch to your local, copy the PR's branch name and execute the command `git checkout <INSERT-PR-BRANCH-HERE>` (note: without the angle brackets)
  - The PR's branch name can be found on the PR itself right below the title
  - Once you've switched over to the PR branch, run `git pull` to pull in the changes to your local
- Consider your comment as feedback for the code. The owner of the PR can discuss with you regarding the validity of the comment or address them
- On GitHub, you can mark conversations as requiring resolution or submit your review with "Request changes" to block merging until issues are addressed

### 2. Approve the code

- Once you've completed your review, and you're satisfied with the resolution of your comments, send a compliment towards the reviewee's way along with an approval to the PR
- There's really nothing else left for you to do except to review once more in case there are conflicts with the PR and you need to review all over again
