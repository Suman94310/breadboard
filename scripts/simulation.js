import Source from "./components/source.js"
import Controler from "./controler.js"
import Led from "./components/led.js";

export default class simulation {
    constructor(context){
        this.context = context
        this.selectedElement = undefined;
        this.mouseUpElement = undefined;
        this.mouseDownElement = undefined;
    }
    start = ()=>{
        this.components = [new Source(this, {x:200,y:200}), new Led(this, {x:400,y:200})];
        this.controler = new Controler(this)
    }
    
    draw = (context)=>{
        for(let i=0; i<this.components.length; i++){
            this.components[i].draw()
        }
    }

    mouseDownHandler = (position)=>{
        for(let i=0; i<this.components.length; i++){
            if( this.components[i].isClicked(position) != 0){
                this.selectedElement = {id:i, 
                                        position: this.components[i].isClicked(position).position,
                                        icX: this.components[i].isClicked(position).x,
                                        icY: this.components[i].isClicked(position).y}
                if(this.components[i].isClicked(position).position=="node"){
                    this.mouseDownElement = {id:i,
                                            position: this.components[i].position}
                    }
                break
            }
            else{
                this.selectedElement = undefined
            } 
        }
        for(let i=0; i<this.components.length; i++){
            if(this.selectedElement !=undefined && i != this.selectedElement.id){
                this.components[i].selected = 0
            }
        }
    }
    
    mouseUpHandler = (position)=>{
        for(let i=0; i<this.components.length; i++){
            if(this.components[i].isClicked(position).position == "node"){
                this.mouseUpElement = {id:i, position: this.components[i].position}
            }
        }
        if(this.mouseDownElement.id !== this.mouseUpElement.id){
            this.components[this.mouseUpElement.id].input = this.components[this.mouseDownElement.id]
        }
    }

    update = (context)=>{
        for(let i=0; i<this.components.length; i++){
            this.components[i].update()
        }
        this.controler.update()
    }
}