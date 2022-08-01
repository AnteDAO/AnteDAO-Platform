# AnteDao project

## Deployment Staging

#### Step 1
Pull latest code:
```
git pull origin develop
```

#### Step 2
Deploy Staging: 

(Default server 206 - Required Access by VPN)

```
make deploy-all
```

#### Step 3
SSH to server 206
```
ssh sotatek@192.168.1.206
```

#### Step 4
Access folder project in:

```
cd /var/www/sotatek_starter
```

#### Step 5
Build Frontend User Project:
```
make build-frontend-user
```

#### Step 6
Build Frontend Admin Project:
```
make build-frontend-admin
```


#### Step 7
Build Backend Project:
```
make build-backend
```









