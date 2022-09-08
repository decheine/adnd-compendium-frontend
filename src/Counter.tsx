import React from "react";

type CounterProps = {
    count: number;
}

type MyState = {
    count: number; // like this
  };

class Counter extends React.Component<any, MyState> {
    state: MyState = {
        count: 0
    };
    constructor(props: CounterProps) {
      super(props);
      this.state = {count: 0};
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
      document.title = `You clicked ${this.state.count} times`;
    }
    componentDidUpdate() {
      document.title = `You clicked ${this.state.count} times`;
    }
    handleClick() {
      this.setState(state => ({
        count: state.count + 1,
      }));
    }
    render() {
      return (
        <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>
          Click me
        </button>
      </div>
      );
    }
    increment = (amt: number) => {
      // like this
      this.setState((state) => ({
        count: state.count + amt,
      }));
    };
  }

  export default Counter;