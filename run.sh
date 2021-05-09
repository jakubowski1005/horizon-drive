#!/bin/bash
docker system prune -a
git pull origin dev
cd api
gradle wrapper
./gradlew clean build -x test
cd ..
docker-compose build
docker-compose up -d devdb
docker-compose up -d api
