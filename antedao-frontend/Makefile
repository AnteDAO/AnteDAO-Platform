# All:

# For Client:
deploy-all:
	make deploy-frontend-user && make deploy-frontend-admin

deploy-frontend-user:
	cd ./frontend-user && make deploy-dev

deploy-frontend-admin:
	cd ./frontend-admin && make deploy-dev

# # For Server:
# cd-server-sotatek-starter:
# 	cd /var/www/sotatek_starter

# build-all:
# 	make build-frontend-user && make build-frontend-admin && make build-backend && make build-crawler

# build-frontend-user:
# 	make cd-server-sotatek-starter && cd ./frontend-user && cp .env.local.example .env && yarn && npx patch-package && yarn build && pm2 restart SotatekStarterUserSite

# build-frontend-admin:
# 	make cd-server-sotatek-starter && cd ./frontend-admin && cp .env.sotatek.example .env && yarn && yarn build && pm2 restart SotatekStarterFrontEndAdmin

# build-backend:
# 	make cd-server-sotatek-starter && cd ./backend && cp .env.sotatek.example .env && npm i && pm2 restart app.json && pm2 restart SotatekStarterBackend && adonis migration:run

# build-crawler:
# 	make cd-server-sotatek-starter && cd ./crawler && cp .env.sotatek.example .env && npm i && make build && pm2 restart app.json






# # For Server: Create pm2 Processes
# create-pm2-kue-listen:
# 	make cd-server-sotatek-starter && cd ./backend && pm2 start "adonis kue:listen" --name=SotatekStarterQueueListen

# create-pm2-backend:
# 	make cd-server-sotatek-starter && cd ./backend && pm2 start "node server.js" --name=SotatekStarterBackend

# create-pm2-frontend-user:
# 	pm2 start "serve -s build -l 2108" --name=SotatekStarterUserSite

# create-pm2-frontend-admin:
# 	pm2 start "serve -s build -l 1503" --name=SotatekStarterAdminSite

# create-pm2-crawler:
# 	make cd-server-sotatek-starter && cd ./crawler && pm2 start app.json

# remove-pm2-backend:
# 	pm2 delete SotatekStarterBackend

# remove-pm2-frontend-user:
# 	pm2 delete SotatekStarter

# remove-pm2-frontend-admin:
# 	pm2 delete SotatekStarterFrontEndAdmin






