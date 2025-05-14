# Developing the Amp Lab website

Hello student of faculty! Welcome to the Amp Lab website repository. This is a simple static website built NextJS. It is hosted through Github Pages, making it easy to deploy and maintain. This document will guide you through the process of setting up your local development environment, making changes to the website, and deploying those changes.

You have two options for working on this locally: Docker, or Node. The following will describe both methods

# Using Docker

1. **Install Docker**: If you don't have Docker installed, download and install it from the [Docker website](https://www.docker.com/get-started).
2. **Clone the repository**: Open a terminal and run the following command to clone the repository
3. **Build and Run the Docker container**: Navigate to the cloned repository and run the following command to build and run the Docker container:
   ```bash
   docker-compose up
   ```

   And that's it!

# Using Node

1. **Install NVM**: If you don't have NVM installed, download and install it from the [NVM for Windows website](https://github.com/coreybutler/nvm-windows)
2.**Restart your computer to apply the changes**: After installing NVM, restart your computer to ensure that the changes take effect.
2. **Install Node**: Open a terminal and run the following command to install Node:
   ```bash
   nvm install 22
   nvm use 22
   ```

# Installing Dependencies
1. **Clone the repository**: Open a terminal and run the following command to clone the repository
   ```bash
   npm install
   ```

# Branch Before You Start Working
1. **Create a new branch**: Before making any changes, create a new branch for your work. This will help keep the main branch clean and allow for easier collaboration. Run the following command to create a new branch:
   ```bash
   git checkout -b your-branch-name
   ```

# Start the development server: Run the following command to start the development server:
   ```bash
   npm run dev
   ```

   This will start the development server and open the website in your default web browser. You can now make changes to the code and see them reflected in real-time.

# Pushing and PR Process
1. **Commit your changes**: After making changes, commit them to your branch with a descriptive message. Run the following command to commit your changes:
   ```bash
   git add .
   git commit -m "Your commit message"
   ```
2. Push your changes: Push your changes to the remote repository with the following command:
   ```bash
   git push origin your-branch-name
   ```
3. **Create a pull request**: Go to the GitHub repository and create a pull request from your branch to the main branch. This will allow others to review your changes before merging them into the main branch.
4. **Review and merge**: Once your pull request is approved, you can merge it into the main branch. This will update the main branch with your changes.