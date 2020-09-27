# COMP3120 INDIVIDUAL WEB DEVELOPMENT PROJECT
__SOPHIE SHERMAN: 45407517__
NOTE: This report was is created with a .md file in the application and can be viewed in the GitHub repository ‘REPORT.md’

KEY:
*features* 
`future implementation`
# || ## Headings
### Terminal commands

# This report outlines:
* Details of where my application is hosted and how you can access it
* A description of the main features of the application and any relevant notes on how I implemented them, what files they connect to and what they do
* My reflective comments on what I have learned during this assignment


# GitHub Information
This application is connected to a GitHub repository. The repository can be cloned by using this HTTP link https://github.com/MQCOMP3120-2020/individual-web-development-task-sophiesherman.git


# Committing to GitHub
Using Visual Studio Code (VSC):
* Click third icon in left sidebar
* In 'Changes' section, click the + icon on any files you are wishing to commit
* Ensure the files you want to commit are in the 'Staged' section
* Type a name for the commit in the 'Message' box
* Click the tick icon
* Click the ... icon
* Click Push


# Deployment
This applicaiton is __deployed__ through Heroku and can be accessed via https://safe-falls-24529.herokuapp.com/.
How to update the current application via Heroku: 
* Type the following in the command line:
### git push heroku master

To deploy with Heroku in the future this documentation is appropriate to follow: https://devcenter.heroku.com/articles/git


# Database
The database of this application is stored on MongoDB Atlas using the free tier. More information about this database store can be found via this link: https://www.mongodb.com/cloud/atlas. Feel free to contact the Project Owner of the database to be granted access:
            Sophie - sophie.sherman@students.mq.edu.au


# Local running
To run the application locally using HSC:
* Ensure the build is up to date by typing the following:
### npm run build
    - It correctly bundles React in production mode and optimizes the build for the best performance.
* Open 2 terminals `NOTE: THIS ORDER IS IMPORTANT`
* In the first one, type the following:
### npm run dev
    - Runs the server side of the application on http://localhost:3001
    - Will restart when you make edits due to NodeMon
* After 5 seconds, in the second one, type the following:
### npm start
    - Runs the app in the development mode.
    - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
    - The page will reload if you make edits


# Outline of data and request handling
All of the data is processed through MongoDB Atlas, as stated above. The server/models/posts.js and server/models/users.js define each schema for the data stored in the database and make the connection to MongoDB.

server/ingestdb.js can be run by typing the following in the terminal
### node server/ingestdb.js
This uploads the data to MongoDB initially and once uploaded, does not need to be done again unless there are major changes that cannot be added or deleted through the application.

The server/server.js file runs the server side of the application, running the server on port 3001. The requests and responses are then handled through server/controllers/api.js, which fetches the data from the database. These requests include GET, PUT, POST and DELETE, whilst also handling the login information as a POST request.

src/service/posts.js and src/service/user.js are utimately what is called throughout the code to process any of the server requests, with getAll, create, update, del functions for posts and getAll, create, update, del, login and register functions for users.


## Security 
Security is implemented by using bcrpyt encryption for user passwords that uses a password-hashing function that creates no way to retrieve the original password string. More about bcrypt can be read here: https://www.npmjs.com/package/bcrypt
JSON web token (jwt) is used also to securely transmit information between parties as a JSON object. It is a stateless authentication that can be read more into here: https://jwt.io/


# Styling
The entire application is styled using CSS. The downloadable template Skeleton was used to assist with the styling and repsonsiveness of the application. Skeleton provides a downloadable link and a lot of information on how to use it here: http://getskeleton.com/.

Alongside Skeleton, it was important to add customised CSS. This has been done in file 'public/css/custom.css'.


# MAIN FEATURES OF APPLICATION
I have concluded that the most appropriate way to understand and explain each feature of the application is to list them and discuss how they connect with each of the files.


## User registration
*Users registration* is handled using src/components/RegisterForm.js. The form makes a POST request to src/service/posts.js which is then handled and further passed on to server/controllers/api.js. 

Registration has two different views:
1. User is not logged in to input username and password to register
    `For the future, it would be best to also ask the user for details such as email, first name and last name to be able to send notifications and updates to their email`
    `Another implementation that would be great for the future would be the ability to log in using social media platforms such as Facebook or Twitter to link the account and improve the sign up process for users`
2. User is registered or logged in, letting the user know what their registered username is and a *button to delete their profile*
    `When a profile is deleted the posts still remain, however, in the future it would be best moving forward to delete the users posts and likes as well`


## Login
Similar to user registration, *login* is handled using src/components/LoginForm.js. The login form makes a POST request to src/service/posts.js which is then handled and further passed on to server/controllers/api.js. 

Login has two different views:
1. User is not logged in to input their username and password
    `For further security in the future it would be best to implement two factor authentication`

2. User is logged in, letting the user know their username and a *button to logout*


## Profile
*User profiles* are handled using src/components/UserProfile.js. The user profile uses the status of "personal" or "other" to determine if a user is asking for their own profile or someone elses. It also acts accordingly in both scenarios if a user is not logged in. It is passed the current logged in user, list of all posts, list of all users, changeLike function, changeFollow function and setPosts function. These are used to display the specfied user profile's posts and provide options for *liking posts, unliking posts, following users, unfollowing users and deleting personal posts from within each profile*. 

There are four different views for user profiles:
1. Personal Profile and logged in
    This displays the option to *log out, delete their profile*. It also displays their *avatar, @username, who is following them and all of their posts, and the number of and users who like each post*. It gives them the option to *like or unlike their own posts or delete any of their own posts*. It DOES NOT give them the option to follow or unfollow themselves as this is not practical.

2. Personal Profile and NOT logged in
    The personal profile when a user is not logged in displays the option to login or register and simply asks the user to please login or register to view their profile.

3. Other User Profile and logged in
    This displays the option to *log in*. It also displays the selected users *avatar, @username, who is following them, all of the selected user posts, and the number of and users who like each post, provides the option like/unlike the posts and follow/unfollow the user depending on the current status of the logged in user and the selected user*. It asks the user to login to like any of the posts.

4. Other User Profile and NOT logged in
    This displays the option to *log in*. It also displays the selected users *avatar, @username, who is following them and all of the selected user posts, and the number of and users who like each post*. It asks the user to login to like any of the posts


## Create a New Post
*Creating a new post* is handled using src/components/NewPostForm.js. The new post form makes a POST request to the server src/service/posts.js to create the new posts which is then handled and further passed on to server/controllers/api.js to create a new post on the database.

There are two views for creating new posts:
1. User is NOT logged in
    Displays the text "Please login or register if you wish to post on RoboChat" and links to the login/register page for easy navigation

2. User is logged in
    Has an input field where users can *input a post between 2 and 150 characters*. Has a *button to publish the new post*.
        `In the future it will be beneficial to the user experience to accept other forms of data such as images and videos that can be uploaded to RoboChat`


## Posts
*Posts* are the most important feature of the application and are handled in src/components/Post.js. There are many different views for posts depending on the log in status of the user and their connection with the posts. Posts use the logged in user, list of posts, changeLike function and setPosts function to provide the different views. 

Posts as a whole have different filters depending on each page:
1. *All posts / recent posts*
    When a user is not logged in the home page displays all the posts from every user. The all posts page also has the view of all the posts by most recent and is the same when the user is or is not logged in.

2. *Personalised feed* for logged in user
    On the home page when a user is logged in, the application displays only the posts of the users who the logged in user is following as well as their own posts. This is great for customisation.

3. *Specific users posts* for profile
    On each profile, the posts that the selected user has created is listed.

The posts themselves have three different views:
1. NOT logged in
    This shows the *user avatar who created the post, the @Username that links to the users profile, the timestamp of when it was created, the content and how many likes and a like of which users like the post*. Each post has *links to user profiles when their username is @mentioned in the content. It also has links to hashtags*. This view only: tells the user to login to login to like the post.
        `Hashtag pages still need to be developed. In the future it will beneficial to the user experience to add pages for each hashtag that the user can visit and view all the posts that contain the selected hashtag`

2. IS logged in
    Includes all of the above, as well as:
    The *ability to like or unlike each post* depending on whether the logged in user has done liked it already or not
        `For future development, adding the ability for logged in users to comment on posts would be a great feature for user experience`

3. IS logged in and the post is their own
    Includes all of the above, as well as:
    The *ability to delete the post* when it is the logged in users own post. 
        `For future development, adding the ability users to edit their own posts would improve the application`



              <Post loggedInUser={user} posts={posts} changeLike={changeLike} setPosts={setPosts}/>


## Customised Home Page
*Customised home page* is handled in src/components/Home.js. This customisation takes the status of whether or not a user is logged in as well as the list of users and posts to customise accordingly. The Home.js is also passed a range of functions, however, these are only used to call other components such as Post.js and NewPostForm.js.

The customised home page has two different views:
1. User is NOT logged in
    Provides a *login field for the user, shows all the RoboChat posts by most recent and asks the user to login if they wish to post on RoboChat*.

2. User IS logged in
    *Welcomes the user with their @Username, provides the option to logout, displays a list of who they are following with a link to find more users to follow, the ability to publish a new post and their news feed that is customised to show their own posts and the posts of the users they are following.*


## All Users Display
*All users display* is handled in src/components/Users.js. This gets all the users in the database and provides the same view whether the user is or is not logged in.

'It shows every user with their avatar and @Username that links to their individual profile.
        `For future development it would improve the application by listing who each user is following in this all user view to provide more insight into each profile`


# REFLECTION
# Learning
This process of creating the social media application was slightly daunting when I first read the outline. The process for me was extremely beneficial to improve my confidence with writing code, debugging and understanding my own potential. 

This experience has unquestionably improve my skills and knowledge with VSC, Javascript, CSS, React, tokens, databases and deployment of a web application. Coding is extremely enjoyable for me, I love solving new problems, spending hours on end researching or adding console logs for the data until I reach a solution for an error. 

I have personally never deployed a web application before and I have really appreciated the experience this assignment has given me. I genuinely am looking forward to doing something similar in the future.

# Next steps for the application / what is missing
The future for this application has been listed above using `_`. 

I could honestly keep adding more and more to the application, adding hashtag views, ability to edit user accounts, implementing notifications, ability for users to have different reactions to posts, comment on posts, message users and many more. I look forward to learning about how to implement these things and to do so in the future as my coding skills improve.
# COMP3120 INDIVIDUAL WEB DEVELOPMENT PROJECT
__SOPHIE SHERMAN: 45407517__

KEY:
*features* 
`future implementation`
# || ## Headings
### Terminal commands

# This report outlines:
* Details of where my application is hosted and how you can access it
* A description of the main features of the application and any relevant notes on how I implemented them
* My reflective comments on what I have learned during this assignment


# GitHub Information
This application is connected to a GitHub repository. The repository can be cloned by using this HTTP link https://github.com/MQCOMP3120-2020/individual-web-development-task-sophiesherman.git


# Committing to GitHub
Using Visual Studio Code (VSC):
* Click third icon in left sidebar
* In 'Changes' section, click the + icon on any files you are wishing to commit
* Ensure the files you want to commit are in the 'Staged' section
* Type a name for the commit in the 'Message' box
* Click the tick icon
* Click the ... icon
* Click Push


# Deployment
This application is __deployed__ through Heroku and can be accessed via https://safe-falls-24529.herokuapp.com/.
How to update the current application via Heroku: 
* Type the following in the command line:
### git push heroku master

To deploy with Heroku in the future this documentation is appropriate to follow: https://devcenter.heroku.com/articles/git


# Database
The database of this application is stored on MongoDB Atlas using the free tier. More information about this database store can be found via this link: https://www.mongodb.com/cloud/atlas. Feel free to contact the Project Owner of the database to be granted access:
            Sophie - sophie.sherman@students.mq.edu.au


# Local running
To run the application locally using HSC:
* Ensure the build is up to date by typing the following:
### npm run build
    - It correctly bundles React in production mode and optimizes the build for the best performance.
* Open 2 terminals `NOTE: THIS ORDER IS IMPORTANT`
* In the first one, type the following:
### npm run dev
    - Runs the server side of the application on http://localhost:3001
    - Will restart when you make edits due to NodeMon
* After 5 seconds, in the second one, type the following:
### npm start
    - Runs the app in the development mode.
    - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
    - The page will reload if you make edits


# Outline of data and request handling
All of the data is processed through MongoDB Atlas, as stated above. The server/models/posts.js and server/models/users.js define each schema for the data stored in the database and make the connection to MongoDB.

server/ingestdb.js can be run by typing the following in the terminal
### node server/ingestdb.js
This uploads the data to MongoDB initially and once uploaded, does not need to be done again unless there are major changes that cannot be added or deleted through the application.

The server/server.js file runs the server side of the application, running the server on port 3001. The requests and responses are then handled through server/controllers/api.js, which fetches the data from the database. These requests include GET, PUT, POST and DELETE, whilst also handling the login information as a POST request.

src/service/posts.js and src/service/user.js are ultimately what is called throughout the code to process any of the server requests, with getAll, create, update, del functions for posts and getAll, create, update, del, login and register functions for users.


## Security 
Security is implemented by using bcrpyt encryption for user passwords that uses a password-hashing function that creates no way to retrieve the original password string. More about bcrypt can be read here: https://www.npmjs.com/package/bcrypt
JSON web token (jwt) is used also to securely transmit information between parties as a JSON object. It is a stateless authentication that can be read more into here: https://jwt.io/


# Styling
The entire application is styled using CSS. The downloadable template Skeleton was used to assist with the styling and responsiveness of the application. Skeleton provides a downloadable link and a lot of information on how to use it here: http://getskeleton.com/.

Alongside Skeleton, it was important to add customised CSS. This has been done in file 'public/css/custom.css'.


# MAIN FEATURES OF APPLICATION
I have concluded that the most appropriate way to understand and explain each feature of the application is to list them and discuss how they connect with each of the files.


## User registration
*Users registration* is handled using src/components/RegisterForm.js. The form makes a POST request to src/service/posts.js which is then handled and further passed on to server/controllers/api.js. 

Registration has two different views:
1. User is not logged in to input username and password to register
    `For the future, it would be best to also ask the user for details such as email, first name and last name to be able to send notifications and updates to their email`
    `Another implementation that would be great for the future would be the ability to log in using social media platforms such as Facebook or Twitter to link the account and improve the sign up process for users`
2. User is registered or logged in, letting the user know what their registered username is and a *button to delete their profile*
    `When a profile is deleted the posts still remain, however, in the future it would be best moving forward to delete the users posts and likes as well`


## Login
Similar to user registration, *login* is handled using src/components/LoginForm.js. The login form makes a POST request to src/service/posts.js which is then handled and further passed on to server/controllers/api.js. 

Login has two different views:
1. User is not logged in to input their username and password
    `For further security in the future it would be best to implement two factor authentication`

2. User is logged in, letting the user know their username and a *button to logout*


## Profile
*User profiles* are handled using src/components/UserProfile.js. The user profile uses the status of "personal" or "other" to determine if a user is asking for their own profile or someone else’s. It also acts accordingly in both scenarios if a user is not logged in. It is passed the current logged in user, list of all posts, list of all users, changeLike function, changeFollow function and setPosts function. These are used to display the specfied user profile's posts and provide options for *liking posts, unliking posts, following users, unfollowing users and deleting personal posts from within each profile*. 

There are four different views for user profiles:
1. Personal Profile and logged in
    This displays the option to *log out, delete their profile*. It also displays their *avatar, @username, who is following them and all of their posts, and the number of and users who like each post*. It gives them the option to *like or unlike their own posts or delete any of their own posts*. It DOES NOT give them the option to follow or unfollow themselves as this is not practical.

2. Personal Profile and NOT logged in
    The personal profile when a user is not logged in displays the option to login or register and simply asks the user to please login or register to view their profile.

3. Other User Profile and logged in
    This displays the option to *log in*. It also displays the selected users *avatar, @username, who is following them, all of the selected user posts, and the number of and users who like each post, provides the option like/unlike the posts and follow/unfollow the user depending on the current status of the logged in user and the selected user*. It asks the user to login to like any of the posts.

4. Other User Profile and NOT logged in
    This displays the option to *log in*. It also displays the selected users *avatar, @username, who is following them and all of the selected user posts, and the number of and users who like each post*. It asks the user to login to like any of the posts


## Create a New Post
*Creating a new post* is handled using src/components/NewPostForm.js. The new post form makes a POST request to the server src/service/posts.js to create the new posts which is then handled and further passed on to server/controllers/api.js to create a new post on the database.

There are two views for creating new posts:
1. User is NOT logged in
    Displays the text "Please login or register if you wish to post on RoboChat" and links to the login/register page for easy navigation

2. User is logged in
    Has an input field where users can *input a post between 2 and 150 characters*. Has a *button to publish the new post*.
        `In the future it will be beneficial to the user experience to accept other forms of data such as images and videos that can be uploaded to RoboChat`


## Posts
*Posts* are the most important feature of the application and are handled in src/components/Post.js. There are many different views for posts depending on the log in status of the user and their connection with the posts. Posts use the logged in user, list of posts, changeLike function and setPosts function to provide the different views. 

Posts as a whole have different filters depending on each page:
1. *All posts / recent posts*
    When a user is not logged in the home page displays all the posts from every user. The all posts page also has the view of all the posts by most recent and is the same when the user is or is not logged in.

2. *Personalised feed* for logged in user
    On the home page when a user is logged in, the application displays only the posts of the users who the logged in user is following as well as their own posts. This is great for customisation.

3. *Specific users posts* for profile
    On each profile, the posts that the selected user has created is listed.

The posts themselves have three different views:
1. NOT logged in
    This shows the *user avatar who created the post, the @Username that links to the users profile, the timestamp of when it was created, the content and how many likes and a like of which users like the post*. Each post has *links to user profiles when their username is @mentioned in the content. It also has links to hashtags*. This view only: tells the user to login to login to like the post.
        `Hashtag pages still need to be developed. In the future it will beneficial to the user experience to add pages for each hashtag that the user can visit and view all the posts that contain the selected hashtag`

2. IS logged in
    Includes all of the above, as well as:
    The *ability to like or unlike each post* depending on whether the logged in user has done liked it already or not
        `For future development, adding the ability for logged in users to comment on posts would be a great feature for user experience`

3. IS logged in and the post is their own
    Includes all of the above, as well as:
    The *ability to delete the post* when it is the logged in users own post. 
        `For future development, adding the ability users to edit their own posts would improve the application`



              <Post loggedInUser={user} posts={posts} changeLike={changeLike} setPosts={setPosts}/>


## Customised Home Page
*Customised home page* is handled in src/components/Home.js. This customisation takes the status of whether or not a user is logged in as well as the list of users and posts to customise accordingly. The Home.js is also passed a range of functions, however, these are only used to call other components such as Post.js and NewPostForm.js.

The customised home page has two different views:
1. User is NOT logged in
    Provides a *login field for the user, shows all the RoboChat posts by most recent and asks the user to login if they wish to post on RoboChat*.

2. User IS logged in
    *Welcomes the user with their @Username, provides the option to logout, displays a list of who they are following with a link to find more users to follow, the ability to publish a new post and their news feed that is customised to show their own posts and the posts of the users they are following.*


## All Users Display
*All users display* is handled in src/components/Users.js. This gets all the users in the database and provides the same view whether the user is or is not logged in.

'It shows every user with their avatar and @Username that links to their individual profile.
        `For future development it would improve the application by listing who each user is following in this all user view to provide more insight into each profile`


# REFLECTION
# Learning
This process of creating the social media application was slightly daunting when I first read the outline. The process for me was extremely beneficial to improve my confidence with writing code, debugging and understanding my own potential. 

This experience has unquestionably improve my skills and knowledge with VSC, Javascript, CSS, React, tokens, databases and deployment of a web application. Coding is extremely enjoyable for me, I love solving new problems, spending hours on end researching or adding console logs for the data until I reach a solution for an error. 

I have personally never deployed a web application before and I have really appreciated the experience this assignment has given me. I genuinely am looking forward to doing something similar in the future.

# Next steps for the application / what is missing
The future for this application has been listed above using `_`. 

I could honestly keep adding more and more to the application, adding hashtag views, ability to edit user accounts, implementing notifications, ability for users to have different reactions to posts, comment on posts, message users and many more. I look forward to learning about how to implement these things and to do so in the future as my coding skills improve.

The application could most definitely implement more security features and while this is not my forte, I look forward to learning more about security. 

The future development of the application would be beneficial to switch to a paid version of a database store to hold more data.

# How this might be applied in future projects
For future project I now understand the basics of a social media applications, which I was curious about before, however, did not have the knowledge I do today.

I would love to use these skills to create my own form of social media platform, of which I plan on creating in the form of an mobile App and this assignment has pushed my one step closer to that goal. I greatly appreciate what this assignment has taught me and I cannot wait to create my very own application someday.

The application could most definitely implement more security features and while this is not my forte, I look forward to learning more about security. 

The future development of the application would be beneficial to switch to a paid version of a database store to hold more data.

# How this might be applied in future projects
For future project I now understand the basics of a social media applications, which I was curious about before, however, did not have the knowledge I do today.

I would love to use these skills to create my own form of social media platform, of which I plan on creating in the form of an mobile App and this assignment has pushed my one step closer to that goal. I greatly appreciate what this assignment has taught me and I cannot wait to create my very own application someday.