import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Component } from "react";
import "./index.css";

class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomText: "",
      topText: "",
      randNum: 0,
    };
    this.handleInput = this.handleInput.bind(this);
    this.generate = this.generate.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  generate() {
    const randNum = Math.floor(Math.random() * 100);
    this.setState({ randNum: randNum }, () => {
      this.updateText();
    });
  }

  handleInput(e) {
    const val = e.target.value;
    const position = e.target.name;
    this.setState({ [position]: val });
  }

  clearTexts() {
    this.setState({ topText: "", bottomText: "" }, () => {
      this.updateText();
    });
  }

  updateText() {
    const { topText, bottomText, randNum } = this.state;
    this.props.genMeme(topText, bottomText, randNum);
  }

  changeColor(event){
    var color = event.target.value
    this.props.changeColor(color);
  }


  render() {
    const { topText, bottomText } = this.state;
    return (
      <div className="controller-container">
        <div className="controller-wrapper">
          <div style={{ width: "100%" }}>
            <div className="controller-content">
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Text Color
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  row
                  defaultValue="0"
                  name="radio-buttons-group"
                  onChange={(e)=>{this.changeColor(e)}}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Black"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="White"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="controller-content">
              <Button
                variant="contained"
                color="success"
                className="btn"
                onClick={() => this.generate()}
              >
                Generate new
              </Button>
            </div>
            <div className="controller-content">
              <Button
                variant="contained"
                color="warning"
                className="btn"
                onClick={() => this.updateText()}
              >
                Update Text
              </Button>
            </div>
            <div className="controller-content">
              <TextField
                value={topText}
                label="Top Text"
                name="topText"
                variant="outlined"
                placeholder="Enter top text for the meme"
                className="input"
                onChange={(e) => this.handleInput(e)}
                color="warning"
              />
            </div>
            <div className="controller-content">
              <TextField
                value={bottomText}
                label="Bottom Text"
                name="bottomText"
                variant="outlined"
                placeholder="Enter bottom text for the meme"
                className="input"
                onChange={(e) => this.handleInput(e)}
                color="warning"
              />
            </div>

            <div className="controller-content">
              <Button
                variant="contained"
                color="error"
                className="btn"
                onClick={() => this.clearTexts()}
              >
                Clear Text
              </Button>
            </div>
            <div className="controller-content">
              <Button
                variant="contained"
                className="download"
                onClick={() => {
                  this.props.downloadMeme();
                }}
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Controller;
