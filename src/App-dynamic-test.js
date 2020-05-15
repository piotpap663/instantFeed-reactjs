import './App.scss';

import React, { Component } from 'react';

import generateName from './utils/generateName';
import HTML_ELEMENTS from './utils/htmlElements';

let targetNode;
const AMOUNT = 10000;
const didupdateResults = [];
const mutationResults = [];
const TESTED_HTML_TAG = HTML_ELEMENTS.div;
const INTERVAL = 5;
const AMOUNT_TO_REMOVE = 10000;
const suffix = 'every10th';
let callbackAfterTest;

class App extends Component {
  constructor() {
    super();
    this.state = {
      content: new Array(AMOUNT_TO_REMOVE).fill().map((item, index) => this.generateOneHTMLElement(TESTED_HTML_TAG, index))
    }

    this.generateOneCycle(3, TESTED_HTML_TAG);
    // this.generateOneCycle(6);
    // this.generateOneCycle(9);

    // this.generateAddCycle(INTERVAL, TESTED_HTML_TAG);
    // this.generateRemoveCycle(INTERVAL, TESTED_HTML_TAG);
    // this.generateUpdateCycle(INTERVAL, TESTED_HTML_TAG);
    // this.generateUpdateEvery10thCycle(6, TESTED_HTML_TAG);

  }

  markStartTimestamp() {
    window.counterstart = performance.now();
  }

  generateOneCycle(time = 3, HTMLElem = 'span') {
    const intervalTime = time * 1000;
    setTimeout(() => {
      const data = this.generateArrayOfHTMLElements(HTMLElem);
      this.markStartTimestamp();
      this.setState({ content: data });
    }, intervalTime);

    this.clearContentWithTimeout(intervalTime)

  }

  generateUpdateEvery10thCycle(time = 3, HTMLElem = 'span') {
    const intervalTime = time * 1000;
    setInterval(() => {
      const data = this.state.content.map((item, index) => index % 10 === 0 ? this.generateOneHTMLElement(HTMLElem, index) : item);
      this.markStartTimestamp();
      this.setState({ content: data });
    }, intervalTime);

  }

  generateUpdateCycle(time = 3, HTMLElem = 'span') {
    const intervalTime = time * 1000;
    setInterval(() => {
      const data = this.generateArrayOfHTMLElements(HTMLElem);
      this.markStartTimestamp();
      this.setState({ content: data });
    }, intervalTime);

  }

  generateAddCycle(time = 3, HTMLElem = 'span') {
    const intervalTime = time * 1000;
    setInterval(() => {
      const data = this.generateArrayOfHTMLElements(HTMLElem);
      this.markStartTimestamp();
      this.setState({ content: data });
      callbackAfterTest = this.clearContentWithTimeout;
    }, intervalTime);

  }

  generateRemoveCycle(time = 3) {
    const intervalTime = time * 1000;
    setInterval(() => {
      this.markStartTimestamp();
      this.setState({ content: null });
      callbackAfterTest = this.addContentWithTimeout;
    }, intervalTime);

  }

  saveResultsToLocalStorage() {
    localStorage.setItem(`${TESTED_HTML_TAG}-${AMOUNT}-${INTERVAL}-${suffix}`, didupdateResults);
  }

  clearContentWithTimeout(intervalTime = 500) {
    setTimeout(() => {
      this.setState({ content: null })
    }, intervalTime)
  }

  addContentWithTimeout(intervalTime = 500) {
    setTimeout(() => {
      this.setState({ content: new Array(AMOUNT_TO_REMOVE).fill().map((item, index) => this.generateOneHTMLElement(TESTED_HTML_TAG, index)) })
    }, intervalTime)
  }

  initMutationObserver() {
    targetNode = document.getElementById('App');
    const config = { attributes: true, childList: true, subtree: true };

    const callback = () => {
      if (targetNode.children.length === AMOUNT) {
        window.counterstop = performance.now();
        window.counterresult = window.counterstop - window.counterstart;
        mutationResults.push(window.counterresult.toFixed());
      }

    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }


  generateOneHTMLElement(HTMLElem = 'span', index = 0) {
    // var dateSpan = document.createElement('span')
    // dateSpan.innerText = 'fdsa';
    // const jsxspan = React.createElement("span", { key: index }, this.generateName());
    const jsxspan = <HTMLElem key={index} >{generateName()}</HTMLElem>;
    return jsxspan;
  }

  generateArrayOfHTMLElements(HTMLElem = 'span') {
    // var dateSpan = document.createElement('span')
    // dateSpan.innerText = 'fdsa';
    return new Array(AMOUNT).fill().map((item, index) => this.generateOneHTMLElement(HTMLElem, index));
  }


  checkIfAddedElements(timestamp) {
    if (targetNode.children.length === AMOUNT) {
      window.counterstop2 = timestamp;
      window.counterresult2 = window.counterstop2 - window.counterstart;
      didupdateResults.push(window.counterresult2.toFixed());
      return true;
    }
    return false;
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.initMutationObserver();
  }

  componentDidUpdate() {
    const timestamp = performance.now();
    if (this.checkIfAddedElements(timestamp)) {
      this.saveResultsToLocalStorage();
    }
    if (callbackAfterTest) {
      callbackAfterTest(500);
    }

  }

  render() {

    return (
      <div className="App" id="App">
        {this.state.content}
      </div>
    );
  }
}

export default App;
