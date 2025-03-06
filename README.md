GDSC-HUB - A Responsive Social Media Website
=============================================

GDSC-HUB is a fully responsive social media platform developed for the GDSC VIT recruitment task. This project utilizes the DummyJSON API to fetch and display posts while providing users with an interactive and seamless browsing experience.

Demo
----

https://github.com/user-attachments/assets/87022876-d702-4888-aa12-9442b18d85dd

https://gdsc-hub.vercel.app


Features
--------

### Core Features

-   **User Authentication**: Implements JWT-based authentication with a login screen and protected routes.
-   **Post Feed**: Fetches and displays all posts from the DummyJSON API, showing post content, likes, dislikes, and tags.
-   **Search, Sort, and Pagination**:
    -   Search functionality to find posts by keywords.
    -   Sorting options by likes, dates, or popularity.
    -   Pagination for optimized post-loading.
-   **Post Details & Comments**:
    -   Clicking a post navigates to a detailed post view.
    -   Displays comments and relevant details.
-   **Tag Filtering**: Allows users to filter posts by tags for better content discovery.
-   **User Profile Page**:
    -   Clicking on a user's post or comment navigates to their profile page.
    -   Displays the user's details and a list of posts made by them.

### Extra Features 🧁

-   **Infinite Scrolling**: Implements an infinite scrolling mechanism for a smoother user experience.
-   **Page Skeleton on Loading**: Provides a better UI experience by displaying skeleton loaders while fetching data.
-   **Dynamic Theme Switching**: Inspired by [MonkeyType](https://monkeytype.com/), allowing users to switch between light and dark modes for enhanced usability.

Technologies Used
-----------------

-   **Frontend**: Next.js with Tailwind CSS for a modern and responsive UI.
-   **API**: DummyJSON API for fetching and managing posts.

How to Use
----------

1.  Log in using valid credentials.
2.  Browse through posts on the feed.
3.  Filter posts using tags or search for specific posts.
4.  Click on posts to view detailed information and comments.
5.  Navigate to user profiles by clicking on their names.
6.  Switch between light and dark modes using the theme toggle.


* * * * *

This project was developed as part of the GDSC VIT recruitment task to demonstrate frontend development skills and API integration.
