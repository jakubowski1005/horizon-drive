#!/bin/bash
git pull
cd api-gateway
./gradlew clean build -x test
cd ..
docker-compose build
docker-compose up -d devdb
docker-compose up -d api