# notes-app
Create and organize your notes using the power of Markdown!

## Demo link
Access my site at [https://meek-malabi-f59af4.netlify.app/](https://meek-malabi-f59af4.netlify.app/)

## Overview
The Notes App is a web application built using React. It aims to provide users with a convenient and feature-rich markdown editor for creating and organizing their notes. The app allows users to write and format their notes using markdown syntax and provides a live preview of the rendered content.

This app has been designed to provide a simple yet powerful experience, with a focus on feature parity with the Github Markdown editor.

## Demo Video

## Features:
- **Markdown Formatting**: The app supports a wide range of Markdown syntax, allowing you to format your notes exactly the way you want. You can easily create headings, emphasize text, create lists, insert links, images, and code snippets, and even add tables to organize your information effectively.

- **Preview Mode**: Want to see how your notes will look once rendered? Simply switch to the preview mode, and the app will display a live preview of your Markdown-formatted text. This feature enables you to ensure your notes are well-structured and visually appealing before finalizing them.

- **Firebase Integration**: The project utilizes Firestore from Firebase for data storage and synchronization. The app uses the `onSnapshot` method to listen for real-time changes in the database. This ensures that any updates made to the notes by different users or devices are synchronized and reflected in real-time.

- **Sorted Notes Array**: Each note object in the Firestore database is assigned a `createdAt` and `updatedAt` property. During rendering, the app sorts the notes array according to the Least Recently Used (LRU) algorithm. This helps maintain an organized and easily accessible collection of notes.

- **Debouncing and TempNoteText**: To optimize performance and reduce unnecessary queries to the database, the app implements debouncing. Debouncing delays the request for a specified amount of time, canceling the previous request if a new one occurs within that time frame. The app employs a `tempNoteText` string to hold the body text of the notes temporarily. This allows for batch updates instead of writing to the database with every keystroke, resulting in improved performance and cost efficiency.

### Built with:
- HTML
- CSS
- React.js
- Firebase

### Dependencies

The project utilizes the following dependencies:

- `react-mde`: This library provides a markdown editor with a live preview. It enables users to write markdown content and offers toolbar features for formatting. It serves as the core component for creating and editing notes in the app.

- `react-showdown`: This library is used to parse and convert markdown content received from the `react-mde` package. It allows the app to render markdown content as React components, providing a seamless and interactive user experience.

- `react-split`: This dependency is a React component that enables resizable split views or panels. It allows users to resize sections of the app or implement draggable panels for enhanced flexibility and customization.

- `nanoid`: This is a small utility library used for generating unique IDs. It helps in generating unique identifiers for each note created in the app, ensuring proper identification and management of notes. (Note, firestore by default gives us an id.)

## Setup
- download or clone the repository
```
npm install
npm run dev
```
- visit the site [Demo link](#demo-link)

## Implementation Details

- The app establishes a websocket connection between the client and the Firestore database using the `onSnapshot` method. This connection enables real-time listening for changes and updates in the notes data. It is essential to clean up and close this listener when the component unmounts to avoid potential memory leaks or unnecessary data synchronization.

- The project utilizes various techniques to optimize performance and user experience. This includes sorting notes based on LRU, implementing debouncing to minimize queries, and utilizing temporary note text for batch updates.

## Start Creating Your Notes!
Now that you're familiar with the features and functionality of the app, it's time to unleash your creativity and start creating your own set of notes. Feel free to experiment, organize, and explore the power of Markdown within the app. We hope this tool becomes an invaluable asset in capturing your ideas and enhancing your productivity.

## Connect

Thank you for reading about this project. If you'd like to connect with me for mentoring, collaboration, or employment opportunities, you can do so via the following links:

- Email [Youkwhan@gmail.com](**Youkwhan@gmail.com**)
- LinkedIn [https://www.linkedin.com/in/youkwhan/](https://www.linkedin.com/in/youkwhan/)
- Portfolio [https://devyouk.netlify.app](https://devyouk.netlify.app)

### License
This project is licensed under the [MIT License](LICENSE.md).
