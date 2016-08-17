import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';

import { addLetterToGuess } from '../actions';
import styles from '../styles';

export const Guess = (props) => {
  // Keep a reference to each TextInput so we can auto-advance to the next one.
  const items = new Array(5);

  // Helper method to automatically advance to the next input by focussing it.
  const autoAdvance = (idx) => {
    if (items[idx + 1]) items[idx + 1].focus();
  };

  // Utility to quickly create a one-letter text input.
  const letterInput = (idx) => (
    <TextInput
      autoCapitalize={ 'characters' }
      autoFocus={ true }
      autoCorrect={ false }
      blurOnSubmit={ false }
      editable={ idx === props.guess.length }
      maxLength={ 1 }
      onChangeText={ props.addLetterToGuess }
      onChange= { () => autoAdvance(idx) }
      ref={ (r) => items[idx] = r }
      returnKeyType={ 'next' }
    />
  );

  return (
    <View style={{ flexDirection: 'row' }}>
      { letterInput(0, () => { autoAdvance(0) }) }
      { letterInput(1, () => autoAdvance(1)) }
      { letterInput(2, () => autoAdvance(2)) }
      { letterInput(3, () => autoAdvance(3)) }
      { letterInput(4) }
    </View>
  )
};

const mapStateToProps = (state) => {
  return {
    guess: state.game.currentGuess
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLetterToGuess: (letter) => dispatch(addLetterToGuess(letter))
  };
};

Guess.propTypes = {
  guess: React.PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Guess);