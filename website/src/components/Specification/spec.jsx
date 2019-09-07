import React from 'react';
import ReactMarkdown from 'react-markdown'
import specURL from '../../specification.md'
import request from 'request-promise'





export default class Specification extends React.Component {

  state = {
    externalData: null
  }

  componentWillMount() {
    this._asyncRequest = request.get(window.origin + specURL)
    .then(
      externalData => {
        this._asyncRequest = null;
        this.setState({externalData});
      }
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      return (<div>
        <h1>Specification</h1>
        <ReactMarkdown source={'Failed to get spec'} />
      </div>) 
    } else {
      return (<div>
        <h1>Specification</h1>
        <ReactMarkdown source={this.state.externalData} />
      </div>)
    }
  }    
}