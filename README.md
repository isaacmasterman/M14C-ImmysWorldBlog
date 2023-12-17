# Immy's World

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description
Immy's World is a personal blog platform designed for sharing life stories and experiences. This CMS-style blog site allows users, especially Immy, to publish articles, blog posts, and their thoughts and opinions in an engaging and interactive way.

- **Motivation**: The project was inspired by the desire to create a space where Immy could share her life stories and connect with others.
- **Problem Solved**: Immy's World offers a personalized blogging experience, making it simple for users to write, manage, and share their posts.
- **Learning Experience**: This project was an opportunity to explore CMS functionality, user authentication, and full-stack web development techniques.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Known Issues](#known-issues)
- [License](#license)
- [Deployment](#deployment)

## Installation
To install Immy's World, follow these steps:
1. Clone the repository from GitHub.
2. Install the necessary dependencies by running `npm install`.

## Usage
1. Visit the deployed application [here](https://aqueous-woodland-66989-529fcace99d9.herokuapp.com/).
2. Sign up or log in to access your dashboard.
3. Create new blog posts or view existing ones.
4. Engage with other users by reading and commenting on posts.

## Known Issues
- **Fix Logout Route Issue**
  - Problem: "Cannot GET /auth/logout" error.
  - Solution: Implemented a POST route for logout; changed logout link to a form.
  - Complexity: Easy

- **Display Titles and Dates on Blog Posts**
  - Problem: Missing titles and dates on blog posts.
  - Solution: Correctly referenced and formatted the title and date in the template.
  - Complexity: Easy

- **Make Blog Posts Clickable for Comments**
  - Problem: Non-clickable blog posts.
  - Solution: Updated template to make posts clickable, leading to a detailed view.
  - Complexity: Moderate

- **Resolve Signup Button Server Crash**
  - Problem: Server crash on signup.
  - Solution: Debugged and fixed the signup route, focusing on session handling and error response.
  - Complexity: Moderate to Hard

## License
This project is licensed under the MIT License. For more information, please see the [LICENSE](LICENSE) file.

## Deployment
The deployed application can be found [here](https://aqueous-woodland-66989-529fcace99d9.herokuapp.com/).

_Note: Further development, including adding comments and debugging, is planned for future updates._
