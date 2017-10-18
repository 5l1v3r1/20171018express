import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import axios from 'axios';

import Login from './Login';
import LoginScreen from './Loginscreen';
import UserPage from './UserPage';

var apiBaseUrl = "http://192.168.44.130:8000/api/";
/*
Module:Dropzone
Dropzone is used for local file selection
*/
import Dropzone from 'react-dropzone';
/*
Module:superagent
superagent is used to handle post/get requests to server
*/
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
var request = require('superagent');
/*
Searchscreen page
*/
class SearchScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      searchItems:[],
      searchPreview:[],
      category:'Model',
      location:'San Francisco,CA',
      price:'100',
      role:'user',
    }
  }
  componentDidMount(){
  this.renderSearchlist(this.state.searchItems);
}
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }

  handleMenuChange(value){
    console.log("menuvalue",value);
    this.setState({role:value});
    //this.setState({menuValue:value,                   loginComponent:localloginComponent,                   loginRole:loginRole})
  }
  handleSearchClick(event) {
    var self = this;

    var payload= {
      "category":this.state.category,
      "price": this.state.price
    }
    axios.get('api/users/search/'+this.state.category+'/'+this.state.price+'/'+this.state.location)
    .then(function (response) {
      if (response.data.code ==200){
        console.log(response.data.user);
        self.renderSearchlist(response.data.user);
      }
      console.log(payload);
      console.log(response);
    })
    .catch(function (error) {
      console.log(payload);
      console.log(error);
    });

  }
  handleCategoryChange(value){
    console.log("category value", value);
    this.setState({category:value});
  }

  handlePriceChange(value){
    console.log("price value", value);
    this.setState({price:value});
  }

  handleLocationChange(value){
    console.log("location value", value);
    this.setState({location :value});
  }
  renderSearchlist(searchItems){
    var self = this;
    var searchPreview=[];

    console.log("Inside renderSearchList!!!");
    self.setState({searchItems:searchItems});
    searchPreview = this.renderSearchTable(searchItems);
    this.setState({searchPreview});

    this.setState({role:this.props.role,user:this.props.user});
  }


  render() {
    // console.log("props",this.props);
    return (
      <div>
      <MuiThemeProvider>
      <div>
      Category:
      <DropDownMenu value={this.state.category} onChange={(event,index,value)=>this.handleCategoryChange(value)}>
      <MenuItem value={"Model"} primaryText="Model" />
      <MenuItem value={"Photographer"} primaryText="Photographer" />
      <MenuItem value={"Designer"} primaryText="Designer" />
      </DropDownMenu>

      Price:
      <DropDownMenu value={this.state.price} onChange={(event,index,value)=>this.handlePriceChange(value)}>
      <MenuItem value={"25"} primaryText="<=25" />
      <MenuItem value={"50"} primaryText="<=50" />
      <MenuItem value={"75"} primaryText="<=75" />
      <MenuItem value={"100"} primaryText="<=100" />
      </DropDownMenu>

      Location:
      <DropDownMenu value={this.state.location} onChange={(event,index,value)=>this.handleLocationChange(value)}>
      <MenuItem value={"San Francisco,CA"} primaryText="San Francisco,CA" />
      <MenuItem value={"San Jose,CA"} primaryText="San Jose,CA" />
      <MenuItem value={"Los Angeles,CA"} primaryText="Los Angeles,CA" />
      <MenuItem value={"San Diego,CA"} primaryText="San Diego,CA" />
      </DropDownMenu>
      <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleSearchClick(event)}/>

      <div className="App">
        <div className="container">
            {this.state.searchPreview}
            </div>
          </div>
      </div>




      </MuiThemeProvider>
      </div>
    );
  }
  /* show table */
  renderSearchTable(data) {

    console.log("Inside renderSearchTable!!");
    console.log(data);

    var self = this;
    return(
      <MuiThemeProvider>
      <div>
      <div className="noteheader">
      <center><h3>Search list</h3></center>
      </div>
      <div className="notecontainer">
      <table className="notetable">
      <tr>
      <th>USERNAME</th>
      <th>CATEGORY</th>
      <th>PRICE</th>
      <th>LOCATION</th>
      </tr>
      <tbody>

       {this.renderResultRows(data)}
        </tbody>
        </table>
        </div>
        </div>
        </MuiThemeProvider>
      );
    }

    renderResultRows(searchItems) {
      console.log("Inside renderResultRow!")
      var self = this;
      return searchItems.map((data,index) =>{
        return (
          <tr key={index} data-item={data} onClick={(event) =>this.fetchDetails(event)}>
          <td data-title="username">{data.username}</td>
          <td data-title="category">{data.category}</td>
          <td data-title="price">{data.price}</td>
          <td data-title="location">{data.location}</td>
          </tr>
        );
      });
    }

  }

  const style = {
    margin: 15,
  };

  export default SearchScreen;
