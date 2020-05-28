# Menus

This project's goal is to manage our family menus.
Currently, it work around recipe, sidedishes and one week display.

## Project
The current state of the project are listed in the _project_ pages on github.


## Front end
Angular 7 with Angular Material

To build : ```npm run build```. It changes to base to "/menus"

##Back end
Java 8 with spring boot

To build : ```mvn clean install```. Generates a war to be deploy.

##DevOps

Backend is hosted by tomcat 9

Frontend is hosted by nginx

Nginx set reverse-proxy on /menus-back

SSL is defined using cerbot 
