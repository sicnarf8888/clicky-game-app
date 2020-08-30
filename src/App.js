import React, { Component } from 'react';

import character from './character.json';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import CardList from './components/CardList';

class App extends Component {
  state = {
    character,
    clickedcharacter: [],
    score: 0,
    highScore: 0,
    isGuessed: false
  };

  randomGenerator = (a, b) => (Math.random() > 0.5 ? -1 : 1);

  imageClick = id => {
    const currentcharacter = id;
    const characterAlreadyClicked =
      this.state.clickedcharacter.indexOf(currentcharacter) > -1;

    if (characterAlreadyClicked) {
      this.setState({
        character: this.state.character.sort(this.randomGenerator),
        clickedcharacter: [],
        score: 0,
        highScore: 0,
        isGuessed: false
      });
      alert('You lose. Play again?');
    } else {
      let score = this.state.score;
      let character = this.state.character;

      this.setState(
        {
          character: this.state.character.sort(this.randomGenerator),
          clickedcharacter: this.state.clickedcharacter.concat(currentcharacter),
          score: score + 1,
          highScore: Math.max(this.state.highScore, score),
          isGuessed: true
        },
        () => {
          if (this.state.score === character.length) {
            alert('Yay! You Win!');
            this.setState({
              character: this.state.character.sort(this.randomGenerator),
              clickedcharacter: [],
              score: 0,
              highScore: 0
            });
          }
        }
      );
    }
  };

  render() {
    const { character, score, highScore, isGuessed } = this.state;

    return (
      <div className='application'>
        <Header score={score} highScore={highScore} isGuessed={isGuessed} />
        <div className='wrapper'>
          <CardList character={character} imageClick={this.imageClick} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
