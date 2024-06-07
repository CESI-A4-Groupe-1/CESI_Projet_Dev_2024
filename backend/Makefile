up:
	docker compose up -d

up-prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build

stop:
	docker compose stop

down:
	docker compose down

build:
	docker compose build

install-deps:
	npm --prefix ./services/accounts install
	npm --prefix ./services/notifications install
	npm --prefix ./services/orders_deliveries install
	npm --prefix ./services/menus install
	npm --prefix ./services/referrals install
	npm --prefix ./services/statistics install