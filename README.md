<h4> A Boilerplate www folder for Salesforce(AngularForce) + Phone Gap + AngularJS + Jquery Mobile app </h4>

<b>Pre-requisits:</b>
1. Clone https://github.com/forcedotcom/SalesforceMobileSDK-iOS & run ./install.sh inside that project.
 - This modifies your XCode and adds 'Hybrid Force.com app' option.
2. Open XCode > create new Project.
3. Select 'Hybrid Force.com app' & click next
4. Enter Some Project name (MySFProject) and Company identifier (com.mycompany.myproject) and create the project


<b>Steps:</b>
1. Git Clone this SFAngularCordova app - this has a 'www' folder inside it.
2. Replace this 'www' folder with your XCode app's 'www' folder (in <XCodeProject>/<XcodeProject>/www)
3. Open XCode editor, and select 'Delete' 
   *important* then select "Remove Reference" (not the directory itself)
4. Right click on the top of the Xcode project name and select 'Add into your project'
   *important* Select radio to add as reference and copy as folders
   - Your 'www' folders should look in 'blue' color.
5. At this point you should have the example project ready to go.

<b> Example app </b>
If everything is working, if you run the app, it will open up an example CRUD JQM app for you to try out.

<b>Modifying your app:</b>
1. www/app.js is the main file to your AngularJS app
2. www/index.html is the main file for you deal with Jquery Mobile stuff.