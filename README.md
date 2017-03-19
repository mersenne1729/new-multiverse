## Synopsis

This site presents a platform for the multiverse theory, the mind-bending idea that there are many if not innumerable other universes beyond our own, featuring a *CORE* API, a leading open journal. 

## Motivation
 
This site is made to help those who have an interest in learning more about the possibilities of multiple universes and the different hypotheses. 

## User Case

The site’s layout and information is based on the cosmologist Max Tegmark’s classification scheme and enables users to easily navigate through the various classifications. It has straightforward summaries for those who just want the basics, and for those who want to delve deeper the site provides access to some of the key relevant academic papers written by the theory’s strongest proponents and critics. 

## Initial UX

The initial mobile and desktop wireframes can be seen below:

![screenshot 14](https://cloud.githubusercontent.com/assets/22433378/24071469/65cffe6c-0bca-11e7-8ba9-5a073fed8ad5.png)

![screenshot 13](https://cloud.githubusercontent.com/assets/22433378/24071472/91bacf20-0bca-11e7-83b6-469b7199c2b5.png)

## Working Prototype

You can find a working prototype of the site here: https://mersenne1729.github.io/new-multiverse/

## Functionality

The site's functionality includes:
* A simple one-page site that enables easy navigation to the various sections.
* An API call to *CORE* with detailed results including author, title, description and a pdf link.
* A dropdown box populated with all the relevant scientists and concepts.

## Technical

The site is built with HTML, CSS, JavaScript, jQuery with the backend made with Node.js. It makes use of a JSON call to the *CORE* Open Platform API to return the data. Webpack is used to take any modules with dependencies to generate static assets that represent those modules. It has been built to be fully responsive across mobile, tablet and desktop screen resolutions.

## Development Roadmap

This is v1.0 of the site, future enhancements will include:
* A degree of data sanitisation so the search returns even more accurate results. 
* Extending the site to include other relevant content such as videos and books links.
* Redesigning the user interface to better reflect the nature of the theory.

