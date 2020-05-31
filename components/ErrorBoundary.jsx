import * as React from 'react';
import { Text } from 'react-native';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log('asdsdddadd');
  }

  render() {
    if (this.state.hasError) {
      return <Text>Oops!!! Something went wrong</Text>;
    }
    return this.props.children;
  }
}
