import React, { Component } from 'react';
import Navigation from './components/navigation/navigation.component';
import Logo from './components/logo/logo.component';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm.component';
import Rank from './components/rank/rank.component';
import FaceRecognition from './components/faceRecognition/faceRecognition.component';
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
      imageUrl: ''
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
      .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageURL={this.state.imageUrl} />
        <ParticlesBg color="#F9F9E0" num={200} type="cobweb" bg={true} />
      </div>
    );
  }
}

export default App;
