up:
	docker compose up -d

up-prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build

down:
	docker compose down

build:
	docker compose build

install-deps:
	npm --prefix ./accounts install
	npm --prefix ./notifications install
	npm --prefix ./orders_deliveries install
	npm --prefix ./menus install
	npm --prefix ./referrals install
	npm --prefix ./statistics install