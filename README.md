# PartyWall


Project setup
1) create an .env file, here is an example of env file:
   >JWT_SECRET="supersecretkey"<br/>
   POSTGRES_USER="test123"<br/>
   POSTGRES_PASSWORD="test123"<br/>
   POSTGRES_PORT=5432<br/>
   POSTGRES_DB="party-wall"<br/>
   POSTGRES_HOST="localhost"

2) Run docker-compose up to create a local postgresql in the root directory
3) Run "npm install & npm run dev"
4) Copy and paste the url below to create Food category
"http://localhost:8080/graphql?query=mutation%7B%0A%20%20createCategoryMutation(input%3A%7Bname%3A%22Food%22%7D)%7B%0A%20%20%20%20category%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"
5) Copy and paste the url below to create Drink category 
"http://localhost:8080/graphql?query=mutation%7B%0A%20%20createCategoryMutation(input%3A%7Bname%3A%22Drink%22%7D)%7B%0A%20%20%20%20category%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"
(it is important to create Food category first because  I've used static values in the frontend)

Things that I would implement if I have more time;

1) There is no ci/cd pipeline. I would create monorepo which contains mobile and backend projects using nx and github actions. 

2) I would add unit tests for mutations and queries
