cd D:\Work\menus\menus-front
rmdir /Q /S D:\Work\menus\menus-front\node_modules
D:
call npm install
call npm run build

cd D:\Work\menus\menus-back
call mvn clean install

C:\apache-tomcat-9.0.14\bin\tomcat9.exe stop
rmdir /Q /S C:\apache-tomcat-9.0.14\webapps\menus
rmdir /Q /S C:\apache-tomcat-9.0.14\webapps\ROOT
rmdir /Q /S C:\apache-tomcat-9.0.14\webapps\back
mkdir C:\apache-tomcat-9.0.14\webapps\menus
del /F /Q C:\apache-tomcat-9.0.14\webapps\back.war

xcopy /E D:\Work\menus\menus-front\dist\menus-front-app C:\apache-tomcat-9.0.14\webapps\menus
copy D:\Work\menus\menus-back\target\back.war C:\apache-tomcat-9.0.14\webapps\back.war

C:\apache-tomcat-9.0.14\bin\tomcat9.exe start