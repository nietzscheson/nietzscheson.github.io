.PHONY: 

docker_compose = docker-compose
docker_compose_file = $(docker_compose) -f docker-compose.yaml
docker_compose__up_build_e = up --build -d

up:
	$(docker_compose_file) \
	$(docker_compose__up_build_e) 
rm:
	docker \
	rm \
	$(shell docker ps -aq) \
	-f
ps:
	docker \
	ps -a
