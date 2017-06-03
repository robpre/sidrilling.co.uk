# SI Drilling website files

Travis is used to make the site build out, the latest build was: [![Build Status](https://travis-ci.org/RpprRoger/sidrilling.co.uk.svg?branch=develop)](https://travis-ci.org/RpprRoger/sidrilling.co.uk)

This repository is responsible for the data displayed on sidrilling.co.uk

## Instructions

1. Navigate to the contents which you wish to edit [see below](#resources)
1. Open the file (the file will usually end in ".md")
1. Click the small edit icon 
![Edit icon](./doc/github_edit.png?raw=true "Edit icon")
1. make the changes [see the markdown cheatsheet](#markdown-cheatsheet)
    - *Important* Do not edit the meta data between the triple dashes `---` (the yellow section marked at (1)) unless you know what you're doing.  
![Editor screen](./doc/github_markdown_sections.png?raw=true "The area marked with the yellow box (1) should be left alone. Feel free to modify the section at (2)") 
1. You can use the preview section to double check your markdown is correct (we will get to see what it will look like on the website when we save)
![Editor preview](./doc/github_preview.png?raw=true)
1. Once you're happy scroll to the bottom of the page and give a message to summarise the change you've made.
    1. Enter the message
    2. Make sure the option "Commit directly to `develop` branch.
    3. Click Commit changes
![Save Changes](./doc/github_commit_changes.png?raw=true "Commit the changes")
1. Check the travis build at [travis-ci.org](https://travis-ci.org/RpprRoger/sidrilling.co.uk). Wait for the current build to show your message and turn to a green tick (you may need to refresh the page)
![Travis build](./doc/travis_green.png?raw=true "Travis build completed")
1. When the travis build completes you can [check your changes on the staging site](http://draft.sidrilling.co.uk)
1. When draft.sidrilling.co.uk is ready for production (the main [www.sidrilling.co.uk](https://www.sidrilling.co.uk) website) you can trigger the change by making requesting merge the status of draft (the develop branch) with the production branch (master).
1. Whilst on the [github page](/) click the pull request button
![Github Pull Request button](./doc/github_pull_request.png?raw=true)
1. Make sure to change the `base:` dropdown to select the "master" branch
![Github Pull Request base](./doc/github_pr_base.png?raw=true)
1. Give the pull request a title and click the green "Create pull request" button.

### Deploying to [production](http://sidrilling.co.uk)
From here you will usually contact the owner of this repo (RpprRoger) or, as a contributor you _can_ approve and deploy to production by doing the following:

You can now share the pull request with other contributors of the site. You should recieve notifications when a pull request is made. You can work together to review the changes in the pull request and approve it.
Click the Files Changed button
![Github Pull Request view changes](./doc/github_pr_overview.png?raw=true)
Look at the changes and Click Review Changes button
![Github Pull Request button](./doc/github_pr_review_changes.png?raw=true)
If you approve the changes you can select Approve otherwise select Request changes and give a short message about what you think is wrong
![Github Pull Request review](./doc/github_pr_approve_request_changes.png?raw=true)

Once you have submitted the review and the Pull Request has been approved by another contributor you can merge into master.

Once you've merged to master a built will trigger on [travis](https://travis-ci.org/RpprRoger/sidrilling.co.uk) 

It will become immediately available on the production site.

## Resources

- ## [Click here to edit the contents](/app/data)

- ## Changes here will first hit [draft.sidrilling.co.uk](http://draft.sidrilling.co.uk)

- ## [Click here to see the progress of the latest change](https://travis-ci.org/RpprRoger/sidrilling.co.uk)

- ## [Markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
