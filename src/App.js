import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'elon';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const isSearched = searchTerm => item =>
item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    
    this.setSearchTopStories= this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  
  setSearchTopStories(result){
    this.setState({result});
  }
  
  
  onSearchChange(event){
    this.setState({searchTerm: event.target.value});
  }
  
  onDismiss(id){
    const isNotId= item=>item.objectID!==id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    
    this.setState({
      result: {...this.state.result, hits:updatedHits}
    });
  }
  
  componentDidMount() {
    const { searchTerm } = this.state;
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`;
    fetch(url)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }
  
  render() {
    const {searchTerm, result} = this.state;
    if(!result){return null;}
    
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
          list = {result.hits}
          pattern = {searchTerm}
          onDismiss = {this.onDismiss}
        >
        <div className="structtable">
          <div>Title</div>
          <div>Author</div>
          <div>Points</div>
          <div>comments</div>
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
          <div className="tableitems" key={item.objectID}>
            <div>
              <a href={item.url}>{item.title}</a>
            </div>
            <div>{item.author}</div>
            <div>{item.points}</div>
            <div>{item.num_comments}</div>
            <div>
            <Button 
              onClick={()=>onDismiss(item.objectID)}>
              dismiss
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