# Developing

For development, you can deploy through Docker. This will install everything you need to get started. 

### For Windows:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- You will also need to install a WSL that Docker can use

### For Linux and Mac:
- [Installing Docker](https://docs.docker.com/engine/install/ubuntu/)

Once that's done, you can just run the following in the root of this directory:

```
docker-compose up
```

Note: This command will reference the `docker-compose.yml` and start up a virtual environment. That will then host the site on a local server

Now your dev environment is ready! The local dev site will be available here:

```
http://localhost:3000
```

If you wish to docker exec into the container, run a command similar to the following:

```
docker exec -it ampwebv2_web_1 sh
```

# Deploying

The Amp Lab maintains a CI/CD pipeline. With every PR, you will see the website build on Github. As of October 2023, there are no formal tests in place to confirm code quality. However, the CI/CD pipeline will give you a decent look at whether or not the website builds. **Please** check the site before merging a pull request
