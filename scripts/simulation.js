import Source from "./components/source.js"
import Controler from "./controler.js"
import Led from "./components/led.js";
import Pulse from "./components/pulse.js"
import Null from "./components/null.js"
import Wire from "./components/wire.js"

export default class simulation {
    constructor(context){
        this.context = context
        this.selectedElement = undefined;
        this.selectedWire = undefined;
        this.mouseUpElement = undefined;
        this.mouseDownElement = undefined;
    }
    start = ()=>{
        this.components = [new Source(this, {x:200,y:200}), new Led(this, {x:400,y:200}), new Pulse(this,{x:400,y:200})];
        this.wires =[]
        this.controler = new Controler(this)
    }
    
    draw = ()=>{
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

        for(let i=0; i<this.wires.length; i++){
            if(this.wires[i].isClicked(position)){
                this.selectedWire = {id:i}
                break
            }
            else{
                this.selectedWire = undefined
            }
        }
        for(let i=0; i<this.wires.length; i++){
            if(this.selectedWire !=undefined && i != this.selectedWire.id){
                this.wires[i].selected = 0
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
            let tempWire = new Wire(this, this.components[this.mouseDownElement.id],
                                    this.components[this.mouseUpElement.id], 
                                    this.mouseDownElement.id, 
                                    this.mouseUpElement.id)
            let wireNeeded = 1
            for(let i=0; i<this.wires.length; i++){
                if(this.wires[i].lId === tempWire.lId && this.wires[i].rId === tempWire.rId){
                    wireNeeded = 0
                    break
                }
            }
            if(wireNeeded){
                this.wires.push(tempWire)
            }
        }
    }

    

    update = ()=>{
        for(let i=0; i<this.components.length; i++){
            this.components[i].update()
        }

        for(let i=0; i<this.wires.length; i++){
            this.wires[i].update()
        }

        this.controler.update()
    }
}