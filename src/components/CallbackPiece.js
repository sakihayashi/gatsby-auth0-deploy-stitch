// import { UserPasswordAuthProviderClient } from "mongodb-stitch-browser-sdk";
// import React, { Component } from 'react'
// import app from '../stitch/app'

// class CallbackPiece extends Component {
  
//     componentDidMount() {
//       const url = window.location.search;
//       const params = new URLSearchParams(url);
//       const token = params.get('token');
//       const tokenId = params.get('tokenId');
  
//       const emailPassClient = app.auth
//         .getProviderClient(UserPasswordAuthProviderClient.factory);
  
//       emailPassClient.confirmUser(token, tokenId);
//     }
  
//   }
//   export default CallbackPiece;