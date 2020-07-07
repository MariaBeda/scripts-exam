import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';
import 'antd/dist/antd.css';
import Layout from './components/HOC/Layout';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Layout />
      </div>
    )
  }
}
