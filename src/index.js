import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchKeyword: 'reactjs',
      vedios: [],
      loadingTime: null ,
      runningVideoUrl: '',
      coment: '',
      listOfcoments: [],
      likeCondition: 'Like',
      isErrorInLoading: false
    };
  }
setSearchValue = (event) => {

this.setState({
  searchKeyword: event.target.value
})
console.log(this.state.searchKeyword)
}
searchVideo = async () => {
    this.setState({
    loadingTime: "LOADING",
    isErrorInLoading: false
  })
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.searchKeyword}&type=video&videoDefinition=high&key=AIzaSyD6INfkUdm90mY4RL_WU5OGN9BrtHlDnOc`);
const myJson = await response.json();
console.log("myJson " , myJson);
if(myJson.items.length == 0) {
  this.setState({
    isErrorInLoading: true
  })
}
this.setState({
  vedios: myJson.items
})
console.log(this.state.vedios)
  this.setState({
    loadingTime: "LOADED"
  })
}
showMostPopularVideos = async () => {
  this.setState({
    loadingTime: 'LOADING'
  })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=15&regionCode=IN&key=AIzaSyD6INfkUdm90mY4RL_WU5OGN9BrtHlDnOc`);
const myJson = await response.json();
console.log("myJson " , myJson);
this.setState({
  vedios: myJson.items,
  loadingTime: "LOADED"
})
console.log(this.state.vedios)
this.setState({
  runningVideoUrl: this.state.vedios[0].id.videoId
})
console.log("runningVideoUrl" , this.state.runningVideoUrl)
}
componentDidMount() {
  this.showMostPopularVideos()
  console.log("vedios" , this.state.vedios)
}
setCurrentUrl = (id) => {

  this.setState({
    runningVideoUrl: id
  })
}
setcoment = (event) => {
  this.setState({
    coment: event.target.value
  })
}
addcoment = () => {
  this.setState({
    listOfcoments: [...this.state.listOfcoments, this.state.coment],
    coment: ''
  })
}
likeButton = () => {
  if(this.state.likeCondition == "Like"){
  this.setState({
    likeCondition: 'Liked'
  })
  } else {
      this.setState({
    likeCondition: 'Like'
  })
  }

}
  render() {
    let videos = this.state.vedios.map(eachVideo => (
<img src={eachVideo.snippet.thumbnails.high.url} style={{ height: '300px', cursor:'pointer'}} onClick={()=> this.setCurrentUrl(eachVideo.id.videoId)} />
        ))
    return (
    
      <div >
        <input  style={{ marginLeft:"450px",width:"430px"}} placeholder="Search here..." onChange={this.setSearchValue} />
        <button  onClick={this.searchVideo}>Search</button>
        <br/>
      <div>
      <hr/>
      
{this.state.isErrorInLoading ? (<h1>No search found</h1>): (
  <iframe src={`https://www.youtube.com/embed/${this.state.runningVideoUrl}`} style={{height: '350px', width: '850px', float : 'left'}}/>
)}


      </div>
      <br/>
     
        <br/>
        <br/>
        <br/>
        <div style={{ width: '455px', float : 'right'}}>
        {this.state.loadingTime == "LOADING" ? (<h1>Loading...</h1>) : (videos) }
        </div>
         <div style={{display: 'block', float: 'left'}}>
    <button  style={ {
  marginLeft: "790px" ,backgroundColor:" red",padding:'12px'}}onClick={this.likeButton}>{this.state.likeCondition}</button>
{this.state.listOfcoments.map(eachcoment => (
  <li>{eachcoment}</li>
))}
         <h3> coments</h3>
    <input style ={{outline: 0 ,border: '0',
    borderBottom: '2px solid #484a56',width:'300px'}} onChange={this.setcoment} placeholder= "Upgrad" value={this.state.coment}/>

    <input  style ={{outline: 0,
    border: '0',
    borderBottom: '2px solid #484a56',
    marginLeft:"45px", width:'300px'}}onChange={this.setcoment} placeholder="Your coment" value={this.state.coment}/> 
    <br/><br/>
    <button  style={{marginLeft:'580px', width:'120px'}}onClick={this.addcoment}> coment</button>
    <button onClick={this.addcoment} style={{marginLeft:"20px" ,width:'120px'}}> cancel</button>
    
    


      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));