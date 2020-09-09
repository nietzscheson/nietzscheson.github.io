.PHONY: 

init: down
	docker-compose up --build -d
down:
	docker-compose down --remove-orphans
up:
	docker-compose up -d
rm:
	docker \
	rm \
	$(shell docker ps -aq) \
	-f
ps:
	docker \
	ps -a
