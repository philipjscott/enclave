import React from 'react'
import { Card, H4 } from '@blueprintjs/core'
import './add-face.css'

export class AddFace extends React.Component {

  render () {return (
  <div>
    <Card className="add-face-container">
      <div className="add-face-img-container"/>
      <button onClick={this.showModal}>Add Face</button>
    </Card>
    <AddFaceModal/>
  </div>
  )}
}

function AddFaceModal (props) {
    return (
        <div id="myModal" class="modal" style={}>
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>Some text in the Modal..</p>
            </div>
        </div>
    ) 
}