import { Component } from "react";
import "./index.css";

class GetMeme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topText: this.props.topText || "Add Text",
      bottomText: this.props.bottomText || "Add Text",
      memeArray: [],
      meme: "",
      index: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { topText, bottomText, index } = this.state;
    if (nextProps.topText && nextProps.topText !== topText) {
      this.setState({ topText: nextProps.topText });
    }
    if (nextProps.bottomText && nextProps.bottomText !== bottomText) {
      this.setState({ bottomText: nextProps.bottomText });
    }
    if (!nextProps.bottomText) {
      this.setState({ bottomText: "Add Text" });
    }
    if (!nextProps.topText) {
      this.setState({ topText: "Add Text" });
    }
    if (nextProps.randNum !== index) {
      this.setState({ index: nextProps.randNum }, ()=>{this.getMeme()});
    }
  }

  getMeme() {
    const { index, memeArray } = this.state;
    this.setState({ meme: memeArray[index].url });
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((res) => {
        const { memes } = res.data;
        this.setState({ memeArray: memes });
        this.getMeme();
      })
      .catch((err) => {
        console.log(err || "error fetching meme");
      });
  }

  render() {
    const { topText, bottomText } = this.state;
    return (
      <div className="meme-container">
        <div className="meme-wrapper">
          <div className="meme-content">
            <img src={this.state.meme} className="meme" alt="meme"></img>
            <h1 className="top-text">{topText}</h1>
            <h1 className="bottom-text">{bottomText}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default GetMeme;
