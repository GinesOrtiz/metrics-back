# Metrics dashboard - Backend

## Setup steps
0 - Install dependencies
```shell
npm i
```
1 - Fill env variables
```dotenv
MONGO_URL=mongodb://localhost:27017
SECRET=metricsSecret
```
2 - Run mongodb in a docker container
```shell
npm run mongo
```
3 - Run the seed command
```shell
npm run seed
```
4 - Run the project
```shell
npm start
```
