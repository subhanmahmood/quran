import React, { Component } from 'react';
import logo from './logo.svg';
import Request from 'react-http-request';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {verseNumber: 1};

    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
    let verseNumber = null;
    if(event.target.value == null){
      verseNumber = 1;
    }else{
      verseNumber = event.target.value;
    }
    this.setState({verseNumber: verseNumber});
  }
  render( ) {
    let verseNumber = this.state.verseNumber;
    let url = 'http://api.alquran.cloud/ayah/' + verseNumber + '/en.asad';

    let url2 = 'http://api.globalquran.com/ayah/' + verseNumber + '/quran-simple?key=333b819785e6b5a778961cb45227341e'
    return (
      <div>
        <Request url={url} method='get' accept='application/json' verbose={true}>
          {({ error, result, loading }) => {
            if ( loading ) {
              return <div>loading...</div>;
            } else {
              return <div>{JSON.stringify( result.body.data.text )}</div>;
            }
          }
  }
        </Request>
        <Request url={url2} method='get' accept='application/json' verbose={true}>
          {({ error, result, loading }) => {
            if ( loading ) {
              return <div>loading...</div>;
            } else {
              return <div>{JSON.stringify( result.body.quran["quran-simple"][verseNumber].verse )}</div>;
            }
          }
  }
        </Request>
        <input type="text" placeholder="Verse" name="verse" onChange={this.handleChange}/>
      </div>

    );
  }
}

export default App;
