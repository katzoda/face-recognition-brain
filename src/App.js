import React, { Component } from 'react';
import Navigation from './components/navigation/navigation.component';
import Home from './components/home/home.component';
import SignIn from './components/sign-in/sign-in.component';
import Register from './register/register.component';
import ParticlesBg from 'particles-bg';
import './App.css';

// CLARIFAI API INFORMATION
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '9de263d01d764699a9c35b5c7c7cf5fc';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'danny-stelio89';
const APP_ID = 'face-recognition-brain';
const MODEL_ID = 'face-detection';


class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  // REST API Clarifai how to predict images via URL
  returnClarifaiRequestOptions = (imageURL) => {

    const IMAGE_URL = imageURL;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    return requestOptions;
  }

  calculateFaceLocation = (data) => {
    const faceLocation = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log("calculate face location", faceLocation);
    const faceImage = document.getElementById("inputimage");
    const width = Number(faceImage.width);
    const height = Number(faceImage.height);
    console.log(width, height)

    const faceBox = {
      leftCol: faceLocation.left_col * width,
      topRow: faceLocation.top_row * height,
      rightCol: width - (faceLocation.right_col * width),
      bottomRow: height - (faceLocation.bottom_row * height)
    }

    this.setState(() => { return { box: faceBox } })

  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState(() => { return { input: event.target.value } })
  }

  onButtonSubmit = () => {
    this.setState(() => { return { imageUrl: this.state.input } })
    console.log("imageUrl state", this.state.imageUrl)
    console.log("clik submit");
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", this.returnClarifaiRequestOptions(this.state.input))
      .then(response => response.json())
      .then(result => this.calculateFaceLocation(result))
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    this.setState(() => { return { route: route } })
  }


  render() {

    if (this.state.route === 'home') {
      return (
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} />
          <Home onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} imageURL={this.state.imageUrl} faceBox={this.state.box} />
          <ParticlesBg color="#F9F9E0" num={200} type="cobweb" bg={true} />
        </div>
      );
    }
    else {
      if (this.state.route === 'signin') {
        return (
          <div className='App'>
            {/* <Navigation onRouteChange={this.onRouteChange} /> */}
            <SignIn onRouteChange={this.onRouteChange} />
            <ParticlesBg color="#F9F9E0" num={200} type="cobweb" bg={true} />
          </div>
        );
      }
      else {
        return (
          <div className='App'>
            {/* <Navigation onRouteChange={this.onRouteChange} /> */}
            <Register onRouteChange={this.onRouteChange} />
            <ParticlesBg color="#F9F9E0" num={200} type="cobweb" bg={true} />
          </div>
        );
      }

    }
  }
}
export default App;
