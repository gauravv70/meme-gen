import {Component} from 'react';
import Controller from '../Controller';
import GetMeme from '../GetMeme';
import './index.css'

class Home extends Component{
    constructor(){
        super();
        this.state={
            topText:"",
            bottomText:"",
            randNum: 0
        }
    }


    setText(topText, bottomText, randNum){
        this.setState({topText: topText, bottomText: bottomText, randNum});
    }

    render(){
        const{topText,
        bottomText,
        randNum
        } = this.state;
        return(
            <div className='home-container'>
                <div className='home-wrapper'>
                    <div className='home-content'>
                    <GetMeme
                    bottomText = {bottomText}
                    topText = {topText}
                    randNum = {randNum}
                    />
                    <Controller
                    genMeme={(topText, bottomText, randNum)=>{this.setText(topText, bottomText, randNum)}}
                    />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;