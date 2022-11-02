
# Deployment

1. [Deployment](#deployment)
	1. [Compendium API](#compendium-api)
		1. [Deployment](#deployment-1)
		2. [Continuous Deployment](#continuous-deployment)
	2. [Compendium Frontend](#compendium-frontend)
		1. [Deployment](#deployment-2)
		2. [Continuous Deployment](#continuous-deployment-1)
	3. [Data Harvester](#data-harvester)
		1. [Deployment](#deployment-3)
	4. [On Each Version](#on-each-version)

## Compendium API

The API

### Deployment

Draft

Begin with starting the Monster Database EC2 and the Compendium-API EC2

ssh into the API server

```
ssh -i ./keys/monsterdbkey.pem ubuntu@{IPADDRESS}
or
ssh aws-ec2-api
```

git remote set to

```bash
aws-ec2-api:/home/ubuntu/deploy/completecompendium.com
```

To deploy to production, from local machine, run

``` bash
git push production main
```

### Continuous Deployment

Walk through the steps from making code changes to deploying.

First check out the devel branch and make changes to it, testing on my own machine. 

When satisfied with the additions/changes, do an important last step: make necessary changes to switch from local to deployment, like the IP address. 

A pull request is made for the new code.

TODO: Then integration tests are run on it. 

After integration tests are passed, the code is merged into the main branch.

Then the code can be deployed to the production server with

``` bash
git push production main
```


## Compendium Frontend

This repository.

### Deployment

Simple to deploy, once changes are made, GitHub pages is automatically built and served, no further action needed as long as it passes.

### Continuous Deployment


> Key question to answer: If code that is deployed to GitHub pages causes errors in live production, how can I quickly rollback the deployment to a working version?

To deploy, run the command

`npm run deploy`

And github pages will be built. After this, make sure to set the url in the GitHub pages setting back to `completecompendium.com`.

TODO: Add integration tests to the deployment process - in between the build and the deploy, run the integration tests.


## Data Harvester


### Deployment
The Action sequence is run on every push to the main branch.

The Harvester serves only to update the database with the latest data. The harvester code is run in a Docker container with GitHub Actions.



## On Each Version

- Specify version number in `package.json`
