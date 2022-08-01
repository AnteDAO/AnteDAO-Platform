ifndef u
u:=sotatek
endif

deploy:
	rsync -avhzL --delete \
				--no-perms --no-owner --no-group \
				--exclude .git \
				--exclude .env \
				--exclude dist \
				--exclude node_modules \
				--exclude workers \
				--filter=":- .gitignore" \
				. $(u)@$(h):$(dir)/
	ssh $(u)@$(h) "cd $(dir); cp .env.local.original .env"
	ssh $(u)@$(h) "cd $(dir); pm2 restart 30"

deploy-dev:
	make deploy h=172.16.1.217 dir=/var/www/ante_dao/frontend-admin
