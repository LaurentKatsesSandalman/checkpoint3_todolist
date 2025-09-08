# TodoList Project - Instructions

Basic instructions to launch the project
Project is split between client and server
It includes basic Docker and CI (no CD)

## Launch App with Docker
create the proper .env from .env.sample
then run:
docker-compose up --build

## CI
CI uses github actions
Todolist is supposed to be a "one machine" project
Considering this, CI is on push only, not on PR
CI is on each push and will trigger lint & test on front & back
Jobs are executed on Ubuntu, Windows and macOS at the same time (matrix strategy)
