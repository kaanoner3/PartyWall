# PartyWall


Project setup

1) Run docker-compose up to create a local postgresql
2) Run "npm run dev"
3) Copy and paste the url below to create Food category
"http://localhost:8080/graphql?query=mutation%7B%0A%20%20createCategoryMutation(input%3A%7Bname%3A%22Food%22%7D)%7B%0A%20%20%20%20category%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"
4) Copy and paste the url below to create Drink category 
"http://localhost:8080/graphql?query=mutation%7B%0A%20%20createCategoryMutation(input%3A%7Bname%3A%22Drink%22%7D)%7B%0A%20%20%20%20category%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"
(it is important to create Food category first because in the frontend side I implemented the code like Food categoryId = 0 and Drink categoryId = 1)

Things that I would implement if I have more time;

1) There is no ci/cd pipeline. I would create monorepo which contains mobile and backend parts of project using nx and github actions. 
I haven't got too much experiences about ci/cd. I usually use PaaS (Digital ocean) or FaaS(aws lambda) on my own but I definetely want to improve my docker and devops skills.

2) Jwt authentication looks like it is working good but I am pretty sure, it is not the best practise. 
I would think about how I can implement authentication logic better. It will also good implementing refreshToken logic with expiring token

3) Because of poor documentation of graphql-relay, I am not sure the node interface implementation is correct. 
But I am using refetch mechanism and it is working fine. I would do research and more test to know if my implementation is the right way.

4) I would add unit tests for mutations and queries
