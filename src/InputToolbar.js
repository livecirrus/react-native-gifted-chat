import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Composer from './Composer';
import Send from './Send';
import Actions from './Actions';

export default class InputToolbar extends React.Component {
  renderActions() {
    conse defaultRender = () => {
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
      <View style={[styles.container, this.props.containerStyle]}>
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
  renderAccessory: React.PropTypes.func,
  renderActions: React.PropTypes.func,
  renderSend: React.PropTypes.func,
  renderComposer: React.PropTypes.func,
  onPressActionButton: React.PropTypes.func,
  containerStyle: View.propTypes.style,
  primaryStyle: View.propTypes.style,
  accessoryStyle: View.propTypes.style,
};
