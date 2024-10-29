# bodyBio backend

///////////////////////////////////////
START DATABASE
brew services start mysql
brew services restart mysql
brew services stop mysql
mysql -u root -p

///////////////////////////////////////
START BACKEND APP
npm run start:dev

///////////////////////////////////////
GENERATING NEST MODULES
nest g module users
nest g controller users/controllers/users
nest g service users/services/users

///////////////////////////////////////
DOCKER: DELETE existing network, image, container
docker stop mysql-container body-bio
docker rm mysql-container body-bio
docker rmi mysql:latest body-bio-image
docker network rm body-bio-network

///////////////////////////////////////
DOCKER: create network, image, container

docker network create body-bio-network

docker run --name mysql-container \
 --network body-bio-network \
 -e MYSQL_ROOT_PASSWORD='' \
 -e MYSQL_DATABASE=body_bio \
 -p 3306:3306 \
 -d mysql:latest

docker build -t body-bio-image .

docker run --name body-bio \
 --network body-bio-network \
 -p 3000:3000 \
 -e DATABASE_HOST=mysql-container \
 -e DATABASE_PORT=3306 \
 -e DATABASE_USERNAME=root \
 -e DATABASE_PASSWORD= \
 -e DATABASE_NAME=body_bio \
 -e API_SECRET_KEY='' \
 -e PORT=3000 \
 -d body-bio-image

///////////////////////////////////////
DOCKER: checking
docker logs mysql-container
docker logs body-bio
http://localhost:3000/users

///////////////////////////////////////
DOCKER: update after changes in app (without database)

docker stop body-bio

docker rm body-bio

docker build -t body-bio-image .

docker run --name body-bio \
 --network body-bio-network \
 -p 3000:3000 \
 -e DATABASE_HOST=mysql-container \
 -e DATABASE_PORT=3306 \
 -e DATABASE_USERNAME=root \
 -e DATABASE_PASSWORD= \
 -e DATABASE_NAME=body_bio \
 -e API_SECRET_KEY='' \
 -e PORT=3000 \
 -d body-bio-image

///////////////////////////////////////
DOCKER: update after changes in app with database

docker stop body-bio
docker rm body-bio
docker build -t body-bio-image .
docker run --name body-bio \
 --network body-bio-network \
 -p 3000:3000 \
 -e DATABASE_HOST=mysql-container \
 -e DATABASE_PORT=3306 \
 -e DATABASE_USERNAME=root \
 -e DATABASE_PASSWORD= \
 -e DATABASE_NAME=body_bio \
 -e API_SECRET_KEY='' \
 -e PORT=3000 \
 -d body-bio-image

///////////////////////////////////////
RAILWAY:
https://mbbioprod.up.railway.app/users
