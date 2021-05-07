import React,{Component} from 'react';
import {BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";
import CovidApi from './api/CovidApi';

import './App.css';
import './components/Dashboard.css';

import Dashboard from './components/Dashboard';
import Status from './components/Status';
import News from './components/News';
import Support from './components/Support';
import About from './components/About';
import WhatToDo from './components/Whattodo';
import Footer from './components/Footer';

import home from './components/images/home.png';
import news from './components/images/news.png';
import status from './components/images/status.png';
import about from './components/images/about.png';
import support from './components/images/support.png';
import logoImg from './components/images/healthcare.png';

class App extends Component{

  state={
    isFetching:true,
    data2:{},
    countryData:[],
    country:'',
  }

  async componentDidMount(){
      const fetchCountryData = await CovidApi.fetchCountryData();
      const fetchedData2 = await CovidApi.fetchCovidData2(this.state.country);
      this.setState({isFetching:false,countryData:fetchCountryData,data2:fetchedData2});
  }

  onButtonClick = async(item) => {
     const fetchedData = await CovidApi.fetchCovidData2(item);
     this.setState({isFetching:false,country:item,data2:fetchedData});
   }
  render(){
    return(
      <Router>
            <div className="box">
                <div className="box_l">
                    <p className="logo"><img src={logoImg} alt="logoImg" />Covid<span className="digit">19</span><span className="board">Board</span></p>
                    <div className="navBar">
                        <NavLink exact to="/" activeclassname="active abc"><img src={home} alt="home_logo" /><span>Home</span></NavLink>
                        <NavLink to="/status" activeclassname="bctive"><img src={status} alt="home_logo" /><span>Status</span></NavLink>
                        <NavLink to="/news" activeclassname="active"><img src={news} alt="news"/><span className="ee">News</span></NavLink>
                        <NavLink to="/support" activeclassname="active"><img src={support} alt="support"/><span className="dd">Support</span></NavLink>
                        <NavLink to="/about" activeclassname="active"><img src={about} alt="about"/><span className="cc">Symptoms</span></NavLink>
                    </div>
                </div>

                <Switch>
                  <Route path="/" exact>
                    {
                      (!this.state.isFetching) ?
                        <Dashboard country={this.state.country} onButtonClick={this.onButtonClick} isFetching={this.state.isFetching} data2={this.state.data2} />
                      : ''
                    }
                  </Route>
                  <Route path="/status">
                  {
                      (!this.state.isFetching) ?
                        <Status isFetching={this.state.isFetching} data2={this.state.data2} countryData={this.state.countryData} />
                      : ''
                    }
                  </Route>
                  <Route path="/news" component={News}></Route>
                  <Route path="/about" component={About}></Route>
                  <Route path="/support" component={Support}></Route>
                  <Route path="/whattodo" component={WhatToDo}></Route>
                </Switch>
            </div>
            <div className="footer_box">
            { (!this.state.isFetching) ? <Footer /> : ''}
            </div>
      </Router>
    )
  }
}

export default App;
