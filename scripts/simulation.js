import Source from "./components/source.js"
import Ground from "./components/ground.js"
import Controler from "./controler.js"
import Led from "./components/led.js";
import Pulse from "./components/pulse.js"
import And from "./components/and.js"
import And3 from "./components/3and.js" 
import Not from "./components/not.js"
import Null from "./components/null.js"
import Wire from "./components/wire.js"

export default class simulation {
    constructor(context){
        this.context = context
        this.selectedElement = undefined;
        this.selectedWire = undefined;
        this.mouseUpElement = undefined;
        this.mouseDownElement = undefined;
        this.availableComponents = [()=> {return new Source(this, {x:300,y:300})},()=> {return new And(this, {x:300,y:300})},()=> {return new And3(this, {x:300,y:300})},()=> {return new Not(this, {x:300,y:300})},()=> {return new Led(this, {x:300,y:300})},()=> {return new Pulse(this, {x:300,y:300})}]
    }
    start = ()=>{
        this.components = [];
        this.wires =[]
        this.controler = new Controler(this)
        this.controler.update()
    }
    
    draw = ()=>{
        for(let i=0; i<this.components.length; i++){
            this.components[i].draw()
        }
    }

    mouseDownHandler = (position)=>{
        for(let i=0; i<this.components.length; i++){
            if( this.components[i].isClicked(position) != 0){
                console.log(this.components[i].isClicked(position))
                this.selectedElement = {
                    id:i, 
                    position: this.components[i].isClicked(position).position,
                    icX: this.components[i].isClicked(position).x,
                    icY: this.components[i].isClicked(position).y
                }
                if(this.components[i].isClicked(position).position=="node"){
                        this.mouseDownElement = {
                            id:i,
                            nodeId:this.components[i].isClicked(position).nodeId,
                            position: this.components[i].position
                        }
                    }
                else this.mouseDownElement = undefined 
                break
            }
            else{
                this.selectedElement = undefined
                this.mouseDownElement = undefined 
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
        console.log(position)
        console.log(this.selectedElement)
    }
    
    mouseUpHandler = (position)=>{this.controler.update()
        for(let i=0; i<this.components.length; i++){
            if(this.components[i].isClicked(position).position == "node"){
                this.mouseUpElement = {
                    id:i, 
                    position: this.components[i].position,
                    nodeId: this.components[i].isClicked(position).nodeId
                }
                break
            }
            else this.mouseUpElement = undefined
        }
        console.log(this.mouseDownElement, this.mouseUpElement)
        if(this.mouseDownElement !=undefined && this.mouseDownElement.id !== this.mouseUpElement.id){
            this.components[this.mouseUpElement.id].inputIds[this.mouseUpElement.nodeId-1] = this.mouseDownElement.id
            let tempWire = new Wire(this, this.components[this.mouseDownElement.id],
                                    this.components[this.mouseUpElement.id], 
                                    this.mouseDownElement.id, 
                                    this.mouseUpElement.id,
                                    this.mouseDownElement.nodeId,
                                    this.mouseUpElement.nodeId
                                    )
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
    }
}