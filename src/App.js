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
        <h1 className="App-title">Welcome</h1>
      </header>

        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
        />

        <Table 
          list = {list}
          pattern = {searchTerm}
          onDismiss = {this.onDismiss}
        >
        <div>
          <div>Title</div>
          <div>Author</div>
          <div>some</div>
          <div>someelse</div>
        </div>
        </Table>

      </div>
    );
  }
}

const Search=({value, onChange})=>
      <form className="searcher">
        <input type="text"
          value={value}
          onChange={onChange}
          placeholder="Search"
        />
      </form>

class Table extends Component{
  render(){
    const {children,list, pattern, onDismiss} = this.props;
    return(
      <div className="table">
      {children}
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectId}>
            <div>
              <a href={item.url}>{item.title}</a>
            </div>
            <div>{item.author}</div>
            <div>{item.pages}</div>
            <div>{"id: "+item.objectId}</div>
            <div>
            <Button 
              onClick={()=>onDismiss(item.objectId)}>
              x
            </Button>
            </div>
          </div>)}
      </div>
    );
  }
}

class Button extends Component{
  render(){
    const {
      onClick,
      className='',
      children
    } = this.props;
    
    return(

      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
  }
}

export default App;