import html2canvas from "html2canvas";
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
      download: 0,
      color: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const { topText, bottomText, index, download, color } = this.state;
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
      this.setState({ index: nextProps.randNum }, () => {
        this.getMeme();
      });
    }
    if (nextProps.download !== download) {
      this.downloadMeme();
    }
    if(nextProps.color !== color){
      this.setColor(nextProps.color);
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

  downloadMeme() {
    html2canvas(document.querySelector("#meme"), {
      letterRendering: 1,
      allowTaint: true,
      useCORS: true,
    })
      .then((canvas) => {
        this.saveAs(canvas.toDataURL(), "Meme By Gaurav.png");
        this.setState({ download: this.props.download });
      })
      .catch((err) => {
        alert(err | "Error in processing image. Please contact Gaurav");
      });
  }

  saveAs(uri, filename) {
    var link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }

  setColor(newColor){
    this.setState({color: newColor});
    console.log(newColor);
  }

  render() {
    const { topText, bottomText, color } = this.state;
    return (
      <div className="meme-container">
        <div className="meme-wrapper">
          <div className="meme-content" id="meme">
            <img
              src={this.state.meme}
              className="meme"
              alt="meme"
              crossOrigin="anonymous"
            ></img>
            <h2 className={`top-text ${color == 1 ? 'white' : 'black'} `} id = "top">{topText}</h2>
            <h2 className={`bottom-text ${color == 1? 'white' : 'black'}`} id ="bottom">{bottomText}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default GetMeme;
