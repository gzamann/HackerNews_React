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

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      list,
      searchTerm: ""
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  
  onSearchChange(event){
    this.setState({searchTerm: event.target.value});
  }

  onDismiss(id){
    const updatedList = this.state.list.filter(item => item.objectId !== id);
    this.setState({list: updatedList});
  }

  render() {
    return (
      <div className="App">
        
        <form>
          <input type="text"
            onChange={this.onSearchChange}/>
        </form>

        <header className="App-header">
          <h1 className="App-title">Welcome Hackers</h1>
        </header>
        <div className="App-intro">
        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item=>{
         return(
         <div>{item.title}
         <p>{item.author}</p>
         <p>{item.pages}</p>
         <p>{"id "+item.objectId}</p>
         <span>
           <button onClick={() => this.onDismiss(item.objectId)}
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