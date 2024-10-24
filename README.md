
# Back End Lottery Smart Contract

## Project Overview

This project serves educational purposes, offering a web application that allows users to place bets on randomly generated numbers using Ether. A smart contract manages the bets, receives Ether, and determines the winning number randomly. The participant with the correct number receives the accumulated Ether sum.

The project is divided into 3 projects:

 - [Lottery Smart Contract](https://github.com/JeanRiffel/lottery-smart-contract): This handle the bets and decided the winner of the bets. Also reward the winner with all money available;
- Back-end Lottery Smart Contract*:  This handle the requests from the user and send it to the smart contract.
- [Front-end Lottery Smart Contract](https://github.com/JeanRiffel/front-end-lottery-smart-contract): This is the user interface that the use perform actions.


## For this project I used

[Nest](https://github.com/nestjs/nest): A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.



## Execution Instructions

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Run Swagger

http://localhost:3001/api-docs#/
