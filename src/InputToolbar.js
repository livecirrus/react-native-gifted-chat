import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  ViewPropTypes,
  Dimensions
} from 'react-native';

import Composer from './Composer';
import Send from './Send';
import Actions from './Actions';

export default class InputToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 'absolute'
    };
  }

  componentWillMount () {
    this.keyboardWillShowListener =
      Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardWillHideListener =
      Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount () {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  _keyboardWillShow = () => {
    this.setState({
      position: 'relative'
    });
  }

  _keyboardWillHide = () => {
    this.setState({
      position: 'absolute'
    });
  }
  
  renderActions() {
    const defaultRender = () => {
      if (this.props.onPressActionButton) {
        return <Actions {...this.props} />;
      }
      return null;
    }
    if (this.props.renderActions) {
      return this.props.renderActions({defaultRender, ...this.props});
    }
    return defaultRender();
  }

  renderSend() {
    const defaultRender = () => {
      return <Send {...this.props}/>;
    }
    if (this.props.renderSend) {
      return this.props.renderSend({defaultRender, ...this.props});
    }
    return defaultRender();
  }

  renderComposer() {
    const defaultRender = () => {
      return (
        <Composer
          {...this.props}
        />
      );
    }
    if (this.props.renderComposer) {
      return this.props.renderComposer({defaultRender, ...this.props});
    }
    return defaultRender();
  }

  renderAccessory() {
    if (this.props.renderAccessory) {
      return (
        <View style={[styles.accessory, this.props.accessoryStyle]}>
          {this.props.renderAccessory(this.props)}
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View
        style={[styles.container, this.props.containerStyle, { position: this.state.position }]}>
        <View style={[styles.primary, this.props.primaryStyle]}>
          {this.renderActions()}
          {this.renderComposer()}
          {this.renderSend()}
        </View>
        {this.renderAccessory()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#b2b2b2',
    backgroundColor: '#FFFFFF',
    bottom: 0,
    width: Dimensions.get('window').width
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  accessory: {
    height: 44,
  },
});

InputToolbar.defaultProps = {
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  renderComposer: null,
  containerStyle: {},
  primaryStyle: {},
  accessoryStyle: {},
};

InputToolbar.propTypes = {
  renderAccessory: PropTypes.func,
  renderActions: PropTypes.func,
  renderSend: PropTypes.func,
  renderComposer: PropTypes.func,
  onPressActionButton: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  primaryStyle: ViewPropTypes.style,
  accessoryStyle: ViewPropTypes.style,
};
