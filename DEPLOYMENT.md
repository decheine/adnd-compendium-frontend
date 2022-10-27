
# Deployment

## Compendium API

The API

### Steps for Deployment

Want to take myself through the steps taken for each Release Version of each component.

#### Initial Deployment

Draft

Begin with starting the Monster Database EC2 and the Compendium-API EC2

ssh into the API server

```
ssh -i ./keys/monsterdbkey.pem ubuntu@{IPADDRESS}
or
ssh aws-ec2-api
```

git remote set to

```
aws-ec2-api:/home/ubuntu/deploy/completecompendium.com
```

To deploy to production, from local machine, run

```
git push production main
```

#### Future Release Deployment

Walk through the steps from making code changes to deploying.

First check out the devel branch and make changes to it, testing on my own machine. 

When satisfied with the additions/changes, do an important last step: make necessary changes to switch from local to deployment, like the IP address. 

might change this up to be more streamlined. Like when running `npm start ...` locally, the code uses the local code, and when running `npm start <deployment> whatever` remotely, the code uses the proper remote code.




## Compendium Frontend

This repository.

### Deployment

Simple to deploy, once changes are made, GitHub pages is automatically built and served, no further action needed as long as it passes.

### Continuous Deployment


> Key question to answer: If code that is deployed to GitHub pages causes errors in live production, how can I quickly rollback the deployment to a working version?

To deploy, run the command

`npm run deploy`

And github pages will be built. After this, make sure to set the url in the GitHub pages setting back to `completecompendium.com`.


## Data Harvester


## Notes





## On Each Version

- Specify version number in `package.json`
