import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  pickOption = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({ selectedOption: option }));
  };

  clearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  }

  removeOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => {
        return optionToRemove !== option;
      })
    }));
  };

  removeAllOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  addOption = (option) => {
    if(!option) {
      return 'Enter valid value to add item';
    } else if(this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }));
  };

  componentDidMount() {
    try{
      const optionsJson = localStorage.getItem('options');
      const options = JSON.parse(optionsJson);
      if(options) {
        this.setState(() => ({ options }));
      }
    } catch (err) {
      // Do nothing
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const optionsJson = JSON.stringify(this.state.options);
      localStorage.setItem('options', optionsJson);
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header subtitle={subtitle}/>
        <div className="container">
          <Action hasOptions={this.state.options.length > 0}
                  pickOption={this.pickOption}/>
          <div className="widget">
            <Options options={this.state.options}
                    removeAllOptions={this.removeAllOptions} 
                    removeOption={this.removeOption}/>
            <AddOption addOption={this.addOption}/>
          </div>
          <OptionModal selectedOption={this.state.selectedOption}
                      clearSelectedOption={this.clearSelectedOption}/>
        </div>
      </div>
    );
  }
}