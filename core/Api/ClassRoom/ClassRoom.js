/**
*
* This is for interfacing with the classroom api
*
**/


/**
* Outside Mods
**/

//GClass
const {google} = require("googleapis"); // TODO: Understand why {} is needed LOL

//File system
const fs = require("fs");

/**
* Code
**/

class Core{

  //Construct
  constructor(){
    //Construct the basic class wide variables
    this.Scope = "https://www.googleapis.com/auth/classroom.courses.readonly";
    this.TokenPath = "./core/Api/ClassRoom/Creds/Token.json";
    this.CredPath = "./core/Api/ClassRoom/Creds/Credentials.json"

    //Set this up for later
    this.Token = JSON.parse(fs.readFileSync(this.TokenPath));

    //Begin Authorize
    this.AuthorizationFile = JSON.parse(fs.readFileSync(this.CredPath));

    //Take this apart later, but for now easier to copy and modify google's source
    const {client_secret, client_id, redirect_uris} = this.AuthorizationFile.installed;
    const OAuthClient = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    //Set the token
    OAuthClient.setCredentials(this.Token);

    google.classroom({version: 'v1', OAuthClient}).courses.list({
      pageSize: 10,
    }, (err, res) => {
      if (err) return console.error('The API returned an error: ' + err);
      const courses = res.data.courses;
      if (courses && courses.length) {
        console.log('Courses:');
        courses.forEach((course) => {
          console.log(`${course.name} (${course.id})`);
        });
      } else {
        console.log('No courses found.');
      }
    });

  }

  listCourses(auth) {
  this.classroom =  google.classroom({version: 'v1', auth});
  this.classroom.courses.list({
    pageSize: 10,
  }, (err, res) => {
    if (err) return console.error('The API returned an error: ' + err);
    const courses = res.data.courses;
    if (courses && courses.length) {
      console.log('Courses:');
      courses.forEach((course) => {
        console.log(`${course.name} (${course.id})`);
      });
    } else {
      console.log('No courses found.');
    }
  });
  }




}


/**
* Exports
**/

module.exports = {

  CreateNewSession : function(){

    //This will create a new instance of the classroom api, and login for us C:
    const CoreClass = new Core();
    return CoreClass;
    //Do stuff with the core class C:
  }

}
