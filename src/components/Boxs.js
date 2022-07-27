import React from "react";

let box =[
    {icons:"home.svg",name:"home",isopen:false},
    {icons:"basketball.svg",name:"basketball",isopen:false},
    {icons:"car.svg",name:"car",isopen:false},
    {icons:"circle-minus.svg",name:"circle",isopen:false},
    {icons:"codepen.svg",name:"codepen",isopen:false},
    {icons:"home.svg",name:"home",isopen:false},
    {icons:"basketball.svg",name:"basketball",isopen:false},
    {icons:"car.svg",name:"car",isopen:false},
    {icons:"circle-minus.svg",name:"circle",isopen:false},
    {icons:"codepen.svg",name:"codepen",isopen:false},
    {icons:"star.svg",name:"star",isopen:false},
    {icons:"star.svg",name:"star",isopen:false}
]

class Boxs extends React.Component{
    constructor(){
        super();
        this.state ={
            boxs:null,
            matched:0,
        }
        this.val1 = "";
        this.val2 = "";
        this.id1="";
        this.id2="";
        this.timeout = null;
        this.count = 0;
    }

    handleClose = () => {
        let newBox =  this.state.boxs.map((ele,i) => {
            ele.isopen = false;
            return  ele;
        })
        this.setState({matched:0});
        this.val1= "";
        this.val2= "";
        this.setState({boxs:newBox});
    }

    handelcheck = () => {
        if(this.val1 === this.val2){
            this.setState((prevState) => {
                return {
                    matched : prevState.matched + 1,
                }
            }, this.handelWin);
            this.val1= "";
            this.val2= "";
        } else {
            this.timeout = setTimeout(this.handleClose, 1000)
        }
    } 
    handelWin = () => {
        setTimeout( () => {
            if(this.state.matched === 6) {
                alert(`You won!!! Your Steps ${this.count}`);
            }
        },1000)
    }
    handleCheckValues = (name) => {
        if(!this.val1){
            this.val1 = name; 
        } else {
            this.val2 = name;
            this.handelcheck();
        }
        
    }

    handelboxisOpenClose =  (id, name) => {
        let {boxs} = this.state;
        this.count = this.count + 1;
        
        let newBox =  boxs.map((ele,i) => {
            if(i === id){
                ele.isopen = !ele.isopen;
            }
            return ele;
        });
        this.setState({boxs:newBox}, () => this.handleCheckValues(name));
    }
    randomBoxs = () => {
        let sortdata = box.sort(() => Math.random() - 0.5);
        return this.setState({boxs:sortdata});
    }
    restartgame = () => {
        let {boxs} = this.state;
        let newBox =  boxs.map((ele,i) => {
            ele.isopen = false;
            return ele;
        });
        this.setState({boxs:newBox});
        this.randomBoxs();
        this.count = 0;
    }
    componentDidMount() {
        this.randomBoxs();
        this.count = 0
    }
    componentWillUnmount() {
        clearTimeout(this.timeout)
    }
    render(){ 
        if(!this.state.boxs){
            return (
                <div>
                    <h5>Loading....</h5>
                </div>
            )
        }
        return(
            <>
                <div className="d-flex my-auto">
                    <div className="my-auto text-center text-light" style={{width:"450px"}}>
                        <h4>Steps</h4>
                        <h5>{this.count}</h5>
                    </div>
                    <div className=" p-3 d-flex flex-wrap " style={{width:"450px"}}>
                        {
                            this.state.boxs.map((ele,i) => (
                                !ele.isopen ? <div key={i} className="border border-2 p-3 m-2 bg-dark text-light" style={{width:"87px", height:"87px"}} onClick={() => this.handelboxisOpenClose(i,ele.name)}></div> : <img key={i} className="border border-2 p-3 m-2 bg-light text-light" src={ele.icons} alt="home" />
                            ))
                        }
                        <button className="btn btn-light mt-5 fw-bold" onClick={this.restartgame}>Restart</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Boxs;