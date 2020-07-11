import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import Clock from "./Clock";
const monday = mondaySdk();

class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {},
      name: "",
    };
  }

  componentDidMount() {
    monday.listen("settings", res => {
      this.setState({ settings: res.data });
    });

    monday.listen("context", res => {
      this.setState({context: res.data});
      console.log(res.data);
      monday.api(`query ($boardIds: [Int]) { boards (ids:$boardIds) { name items(limit:1) { name column_values { title text } } } }`,
          { variables: {boardIds: this.state.context.boardIds} }
      )
          .then(res => {
            this.setState({boardData: res.data});
          });
    })
  }

  render() {
    return <div className="App"
      id = "time"
      style={{background: (this.state.settings.background)}}>

      <Clock> </Clock>
      </div>;
  }
}

export default App;
