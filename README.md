# Lorie Pocket
LoriePocket helps you keep count of the calories ingest daily.

Lorie Pocket is a sample project implementing below technologies:
 - Spring Boot
 - Spring Security
 - Spring JWT
 - Spring HATEOAS
 - React
 - Webpack
 - Docker

## Projects

Project is build using docker in order to provide an environment for each architecture component. Back end(service/portal) is an API developed using Spring Boot 1.5.7 and Spring Security. Front end(service/cdn) is a series of react components served by nginx server.

## Installation

In order to run the project you need to [install docker](https://docs.docker.com/engine/installation/), then download the repository and generate the components for back and front end.

### Components generation

#### Front End Service
You have to generate the distribution file for front end by running below commands:

```
cd service/cdn
npm install
gulp build
webpack
```
These commands will generate a dist folder with needed javascript, stylesheets and templates to render front end.


#### API
You have to generate the API war file for front end by running below commands:

```
cd service/portal
mvn clean install -DskipTests
```
This command will generate the jar tomcat need to serve backend.

### Docker container
You have to create all container images needed to bring up environment
```
docker-compose build
```
then you can bring up your environment with below command:
```
docker-compose up
```

## MIT License

Copyright (c) 2017 Cristian Colorado

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
