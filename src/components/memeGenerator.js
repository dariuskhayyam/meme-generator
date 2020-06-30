import React from "react"

class MemeGenerator extends React.Component{

    constructor(){
        super()
        this.state = {
            topText:"",
            bottomText:"",
            randomImage:"http://i.imgflip.com/1bij.jpg",
            allMemeImages: []
        }
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response =>{
                const {memes} = response.data
                this.setState({allMemeImages: memes})
            }
            )
    }

    handleChange = (event) =>{
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleGen = (event) =>{
        event.preventDefault()
        let max = this.state.allMemeImages.length - 1
        let min = 0
        let img = Math.floor(Math.random() * (max - min + 1) + min)
        this.setState({
            randomImage: this.state.allMemeImages[img].url
        })
    }

    render(){

        const formStyles = {
            display:"flex",
            justifyContent:"space-between",
            margin: "5rem",
        }
        const buttonStyles = {
            display:"flex",
            justifySelf:"center"
        }
        const imgStyle = {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "50%"
        }
        const container = {
            position: "relative",
            textAlign: "center",
            color: "white",
        }
        const top = {
            position: "absolute",
            top: 8,
            right: "25%",
            left: "25%",
            fontFamily:"Impact, Charcoal, sans-serif",
            color: "white",
            textShadow: "2px 2px 4px #000000"
        }
        const bottom = {
            position: "absolute",
            bottom: 8,
            right: "25%",
            left: "25%",
            textAlign:"center",
            fontFamily:"Impact, Charcoal, sans-serif", 
            color: "white",
            textShadow: "2px 2px 4px #000000"
        }
        

        return(
            <div style={{display: "flexbox"}}>
                <form>

                    <div style={formStyles}>
                        <span>
                            <label>Top Text:</label> <br />
                            <input type="text" name="topText" value={this.state.topText} onChange={this.handleChange}/>
                        </span>

                        <button style={buttonStyles} onClick={this.handleGen}>Genarate!</button>
                        
                        <span>
                            <label>Bottom Text:</label> <br />
                            <input type="text" name="bottomText" value={this.state.bottomText} onChange={this.handleChange}/>
                        </span>
                    </div>

                    

                </form>
                
                <div style={container}>
                    <img src={this.state.randomImage} alt="meme" style={imgStyle}></img>
                    <h2 style={top}>{this.state.topText}</h2>
                    <h2 style={bottom}>{this.state.bottomText}</h2>
                </div>

            </div>
        )
    }
}

export default MemeGenerator