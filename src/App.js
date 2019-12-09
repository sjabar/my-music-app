import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {Row,Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {SearchBar} from './SearchBar';
import {SortBar} from './SortBar';
import axios from 'axios';
class Header extends React.Component {
  render() {
     return (
        <div>
           <nav className="navbar navbar-light bg-light">
            <span style={{width:'100%'}} className="text-center navbar-brand mb-0">Music Online: Classical Music Library</span>
            </nav>
        </div>
     );
  }
}
class Content extends React.Component {

   constructor(props){
      super(props)
      this.state = {
        albums: []
      }
    }
    async componentDidMount() {
      axios({
         url: 'http://localhost:4001/albums',
         method: 'get',
         
      })
      .then(response => {
         console.log(response)
         this.setState({albums:response.data});
      }) 
      .catch(err => {
         console.log(err);
      });
    }
  render() {     
     return (
          <div className="container-fluid">
             <div className="row justify-content-center">
               <div className="col-sm-6" > <Form>
                     <Form.Row>                
                        <Col sm="4">
                           <SearchBar advancesearch="true"/>
                        </Col>
                        <Col sm="5">
                        </Col>
                     </Form.Row>
                     </Form></div>
            </div>
            <div className="row justify-content-center">
                        <div className="card-deck">
                        {this.state.albums.map((album, index) => {
                           return <Card key={index} value={album}/>
                        })}
                        </div>
            </div>           
            </div>
     );
  }
}

class App extends React.Component {
  render() {
     return (
        <div>
           <Header/>
           <Content/>
        </div>
     );
  }
}
class Card extends React.Component{
   
   render(){
      console.log(this.props.value.images);
      return (
            <div className="card mb-3">
                           <img src={this.props.value.images[1].url} className="card-img" alt="..."/>
                        <div className="card-img-overlay" style={{top:'300px'}}>
                           <h4 className="card-title">{this.props.value.label}</h4>
                           <p className="card-text">{this.props.value.name}</p>
                           <a href="#" className="btn btn-primary">See Profile</a>
                        </div>
</div>
      );
   }
}

export default App;
