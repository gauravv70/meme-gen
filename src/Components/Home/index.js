import { Component } from "react";
import Controller from "../Controller";
import GetMeme from "../GetMeme";
import "./index.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randNum: 0,
      download: 0,
    };
  }

  setText(topText, bottomText, randNum) {
    this.setState({ topText: topText, bottomText: bottomText, randNum });
  }

  downloadMeme() {
    this.setState({ download: this.state.download + 1 });
  }

  render() {
    const { topText, bottomText, randNum, download } = this.state;
    return (
      <div className="home-container">
        <div className="home-wrapper">
          <div className="home-content">
            <GetMeme
              bottomText={bottomText}
              topText={topText}
              randNum={randNum}
              downloadmeme={download}
            />
            <Controller
              genMeme={(topText, bottomText, randNum) => {
                this.setText(topText, bottomText, randNum);
              }}
              downloadMeme={() => {
                this.downloadMeme();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
