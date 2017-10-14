# Lorie Pocket
LoriePocket helps you keep count of the calories ingest daily. Lorie Pocket is a sample project implementing below technologies:
 - Spring Boot
 - Spring Security
 - Spring JWT
 - Spring HATEOAS
 - React
 - Docker

# Instalation


## Assets generation
First you need to generate the front and backend files.

### CDN Service
You have to generate the distribution file for front end by running below commands:

```
cd service/cdn
npm install
gulp html
gulp styles
webpack

```

### API
You have to generate the API war file for front end by runnning below commands:

```
cd service/portal
mvn clean install -DskipTests
```

## Docker container
You have to create all conainer images needed to bring up environment
```
docker-compose build
```
then you can bring up your environment with below command:
```
docker-compose up
```


