import React from 'react';

class MemeGenerator extends React.Component{
    constructor() {
        super()
        this.state = {
            topText : "",
            bottomText : "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                this.setState({
                    allMemeImgs : memes
                })
            })
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name] : value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const rndIndex = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const rndMeme = this.state.allMemeImgs[rndIndex].url
        this.setState({randomImage : rndMeme})
    }

    render() {
        return (
            <div>
                <form className = "meme-form" onSubmit = {this.handleSubmit}>
                    <input
                        type = "text"
                        name = "topText"
                        placeholder = "Top Text"
                        value = {this.state.topText}
                        onChange = {this.handleChange}
                    />
                    <input
                        type = "text"
                        name = "bottomText"
                        placeholder = "Bottom Text"
                        value = {this.state.bottomText}
                        onChange = {this.handleChange}
                    />
                    <button>Gen</button>
                </form>
                <div className = "meme">
                    <img src = {this.state.randomImage} alt = "Meme" />
                    <h2 className = "top">{this.state.topText}</h2>
                    <h2 className = "bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;
