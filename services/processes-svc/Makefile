clean:
	docker exec -it postgres-mozare3 psql -U postgres -d postgres -c "DROP DATABASE \"processes-db\";"
migrate: 
	yarn prisma migrate dev

.PHONY: clean migrate
