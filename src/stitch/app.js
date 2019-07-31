import { Stitch } from "mongodb-stitch-browser-sdk";
import { Component } from "react";

class StitchApp extends Component{

  componentDidMount() {
    // Initialize the App Client
    this.APP_ID = "forumtopic-wuzgl";

    // this.app = Stitch.initializeDefaultAppClient(this.APP_ID);
    // Get a MongoDB Service Client
    // This is used for logging in and communicating with Stitch
    const appDefault = Stitch.hasAppClient(this.APP_ID)
  ? Stitch.getAppClient(this.APP_ID)
  : Stitch.initializeAppClient(this.APP_ID);
  
  console.log('app from stitch folder: ', appDefault);
  

  return appDefault
  }

}


export default StitchApp