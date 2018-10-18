import React, { Component } from 'react';
import './App.css';

const list = [
  {
  title: 'Road To React',
  author: 'Jake',
  pages: 200,
  objectId:0
  },
  {
  title: 'Sherlock Holmes',
  author: 'Conan Doyle',
  pages: 400,
  objectId: 1
  }
]
class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      list
    };

    this.onDismiss = this.onDismiss.bind(this);
  }
  
  onDismiss(id){
    const updatedList = this.state.list.filter(item => item.objectId !== id);
    this.setState({list: updatedList});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome Hackers</h1>
        </header>
        <div className="App-intro">
        {this.state.list.map(item=>{
         return(
         <div>{item.title}
         <p>{item.author}</p>
         <p>{item.pages}</p>
         <p>{"id "+item.objectId}</p>
         <span>
           <button onClick={()=>this.onDismiss(item.objectId)}
            type="button">
           Dismiss
           </button>
         </span>
         </div>
         );}
        )}
        </div>
      </div>
    );
  }
}
export default App;