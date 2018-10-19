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
    const {list,searchTerm} = this.state;
    return (
      <div className="App">
        
      <header className="App-header">
        <h1 className="App-title">Welcome Hackers</h1>
      </header>

        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
        >
        S
        </Search>

        <Table 
          list = {list}
          pattern = {searchTerm}
          onDismiss = {this.onDismiss}
        />

      </div>
    );
  }
}

class Search extends Component{
  render(){
    const {value, children, onChange} = this.props;
    return(
      <form>
      {children} <input type="text"
          value={value}
          onChange={onChange}
        />
      </form>
    );
  }
}

class Table extends Component{
  render(){
    const {list, pattern, onDismiss} = this.props;
    return(
      <div className="table">
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectId}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.pages}</span>
            <span>{"id: "+item.objectId}</span>
            <button
              onClick={()=>onDismiss(item.objectId)}
              type="button">
              Dismiss
            </button>
          </div>)}
      </div>
    );
  }
}

export default App;