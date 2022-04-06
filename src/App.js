import React, { Component } from 'react'
import './App.css'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
       commands: []
    }
    this.addLine = this.addLine.bind(this)
    this.submitInput = this.submitInput.bind(this)
  }
  
  addLine(value){
    ///let firstCommand = prompt('Comment il va ?');
    let element = document.getElementById("section");
    let finalCommand = value.toLowerCase();
    
    if(finalCommand.replace(/^\s+|\s+$/g, "").length != 0 && finalCommand.charAt(0) != '/' ){
      this.setState({commands: [...this.state.commands, finalCommand]}, () => element.scrollTop = element.scrollHeight);
    }
    if(finalCommand.replace(/^\s+|\s+$/g, "").length == 0){
      alert('input vide non autorisé')
    }
    if(finalCommand.charAt(0) == '/' ){
      this.setState({commands: [...this.state.commands, '[!] '+finalCommand+' introuvable | Liste des commandes: { /clear, /who }']}, () => element.scrollTop = element.scrollHeight);
    }
  }

  submitInput(e){
    if(e.keyCode == 13 && e.target.value != '/clear' && e.target.value != '/who'){
      this.addLine(e.target.value)
      document.getElementById('commandInput').value = ""
    }
    
    if(e.keyCode == 13 && e.target.value == '/clear'){
      this.setState({commands: []});
      document.getElementById('commandInput').value = ""
    }

    if(e.keyCode == 13 && e.target.value == '/who'){
      this.setState({commands: [...this.state.commands, 'created by luca blanc']});
      document.getElementById('commandInput').value = ""
    }

    // if(e.keyCode == 9 && e.target.value == 'c'){
    //   document.getElementById('commandInput').value = "clear"
    //   this.setState({commands: []}, () => document.getElementById('commandInput').value = "");
    // }
  }

  render() {
    return (
      <div style={{display:'flex',alignItems:'flex-start',justifyContent: 'center',flexDirection: 'column',padding: 10}}>

        <div className='section' id='section' style={{
          display:'flex',
          flexDirection:'column',
          maxHeight: '93vh',
          overflow: 'auto',
          direction: 'rtl',
          alignItems: 'flex-end',
          width: '70vw'
        }}>
        {this.state.commands.map(command =>
          <span style={{color: 'white',margin: 5}}>
            <span style={{background:'white',color: 'black',padding: '0px 3px 3px 4px',fontWeight: 'bold',borderRadius: 5,marginRight: 5}}>Log:</span> 
            {command}
          </span>
        )}
        </div>

        <span style={{color:'white',position: 'absolute',right: 10,top: 10}}>nombre de ligne: <span>{this.state.commands.length}</span>
        </span>

        <span style={{position: 'absolute',bottom: 9,left: 7,color:'white',zIndex:100,fontWeight: 'bold'}}>Console\Admin&gt;</span>
        <input autocomplete="off" id='commandInput' style={{    
          position: 'absolute',
          bottom: 0,
          left: 125,
          width: '71vw',
          padding: 10,
          background: 'black',
          border: 'none',
          color: 'white',
          outline: 'none',
          fontSize: 15,
          fontWeight: 'bold',
          }} onKeyDown={this.submitInput}/>

      </div>
    )
  }
}

export default App

