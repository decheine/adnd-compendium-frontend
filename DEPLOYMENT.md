
# Deployment

## Steps for Deployment

Want to take myself through the steps taken for each Release Version of each component.

### Initial Deployment

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



## On Each Version

- Specify version number in `package.json`
