#!/bin/bash
git pull origin dev
cd api
./gradlew clean build -x test
cd ..
docker-compose build
docker-compose up -d devdb
docker-compose up -d api