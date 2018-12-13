/**
*
*  This is the core engine of the program C:
*
**/

/**
* IMPORTS
**/

const ClassRoomApi = require('./Api/ClassRoom/ClassRoom.js');

/**
* CODE
**/

//Core Class
class Core{
  //Constructor
  constructor(){
    this.ClassRoom = null;
  }

  //Start up Process
  Start() {

    //Set up google classroom
    this.ClassRoom = ClassRoomApi.CreateNewSession();
    

  }



}



/**
* EXPORTS
**/

module.exports = {
  Core : Core
}
