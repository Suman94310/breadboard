import DigitalSource from "./components/basics/digitalSource.js"
import Ground from "./components/ground.js"
import Controler from "./controler.js"
import DigitalInput from "./components/basics/digitalInput.js";
import Pulse from "./components/pulse.js"
import And from "./components/logicGates/doubleInput/and.js"
import Or from "./components/logicGates/doubleInput/or.js"
import Nand from "./components/logicGates/doubleInput/nand.js"
import Nor from "./components/logicGates/doubleInput/nor.js"
import Xor from "./components/logicGates/doubleInput/xor.js"
import Xnor from "./components/logicGates/doubleInput/xnor.js"
import And_3 from "./components/logicGates/tripleInput/and_3.js"
import Or_3 from "./components/logicGates/tripleInput/or_3.js"
import Nand_3 from "./components/logicGates/tripleInput/nand_3.js"
import Xor_3 from "./components/logicGates/tripleInput/xor_3.js"
import Nor_3 from "./components/logicGates/tripleInput/nor_3.js"
import Xnor_3 from "./components/logicGates/tripleInput/xnor_3.js"
import Jk from "./components/logicGates/tripleInput/jk.js"
import Mux_2_1 from "./components/multiplexers/mux_2_1.js"
import Mux_4_2 from "./components/multiplexers/mux_4_2.js"
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
        this.availableComponents = [
            ()=> {return new DigitalSource(this, {x:300,y:300})},
            ()=> {return new Pulse(this,{x:300,y:300})},
            ()=> {return new Mux_2_1(this,{x:300,y:300})},
            ()=> {return new Mux_4_2(this,{x:300,y:300})},
            ()=> {return new And(this,{x:300,y:300})},
            ()=> {return new And_3(this,{x:300,y:300})},
            ()=> {return new Or(this,{x:300,y:300})},
            ()=> {return new Or_3(this,{x:300,y:300})},
            ()=> {return new Xor(this,{x:300,y:300})},
            ()=> {return new Xor_3(this,{x:300,y:300})},
            ()=> {return new Xnor(this,{x:300,y:300})},
            ()=> {return new Xnor_3(this,{x:300,y:300})},
            ()=> {return new Nor(this,{x:300,y:300})},
            ()=> {return new Nor_3(this,{x:300,y:300})},
            ()=> {return new Nand(this,{x:300,y:300})},
            ()=> {return new Nand_3(this,{x:300,y:300})},
            ()=> {return new Jk(this,{x:300,y:300})},
            Null,
            ()=> {return new DigitalInput(this,{x:300,y:300})},

        ]
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
                            position: this.components[i].position,
                            outputNodeStart: this.components[i].outputNodeStart
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
                    nodeId: this.components[i].isClicked(position).nodeId,
                    outputNodeStart: this.components[i].outputNodeStart
                }
                break
            }
            else this.mouseUpElement = undefined
        }
        console.log(this.mouseDownElement, this.mouseUpElement,this.wires)
        
        if(this.mouseDownElement != undefined){
            let tempWire = undefined
            if (this.mouseDownElement.nodeId -1 >= this.mouseDownElement.outputNodeStart && this.mouseUpElement.nodeId -1 < this.mouseUpElement.outputNodeStart){
                this.components[this.mouseUpElement.id].inputNodes[this.mouseUpElement.nodeId -1] = this.mouseDownElement.nodeId -1 - this.mouseDownElement.outputNodeStart
                this.components[this.mouseUpElement.id].inputIds[this.mouseUpElement.nodeId-1] = this.mouseDownElement.id
                tempWire = new Wire(this, this.components[this.mouseDownElement.id],
                    this.components[this.mouseUpElement.id], 
                    this.mouseDownElement.id, 
                    this.mouseUpElement.id,
                    this.mouseDownElement.nodeId,
                    this.mouseUpElement.nodeId
                )
            }
            else{
                this.components[this.mouseDownElement.id].inputNodes[this.mouseDownElement.nodeId -1] = this.mouseUpElement.nodeId -1 - this.mouseUpElement.outputNodeStart
                this.components[this.mouseDownElement.id].inputIds[this.mouseDownElement.nodeId-1] = this.mouseUpElement.id
                tempWire = new Wire(this, 
                    this.components[this.mouseUpElement.id], 
                    this.components[this.mouseDownElement.id],
                    this.mouseUpElement.id,
                    this.mouseDownElement.id, 
                    this.mouseUpElement.nodeId,
                    this.mouseDownElement.nodeId
                )
            }
                
            
            
            let wireNeeded = 1
            for(let i=0; i<this.wires.length; i++){
                // console.log(this.wires[i].lId , tempWire.lId , this.wires[i].rId , tempWire.rId , this.wire[i].rNodeId , tempWire.rNodeId , this.wire[i].lNodeId , tempWire.lNodeId)
                // console.log(tempWire)
                if(this.wires[i].lId === tempWire.lId && this.wires[i].rId === tempWire.rId && this.wires[i].rNodeId === tempWire.rNodeId && this.wires[i].lNodeId === tempWire.lNodeId){
                    wireNeeded = 0
                    break
                }
            }
            if(wireNeeded){
                this.wires.push(tempWire)
            }
        }
        // if(this.mouseDownElement !=undefined && this.mouseDownElement.id !== this.mouseUpElement.id){
        //     this.components[this.mouseUpElement.id].inputIds[this.mouseUpElement.nodeId-1] = this.mouseDownElement.id
        //     let tempWire = new Wire(this, this.components[this.mouseDownElement.id],
        //                             this.components[this.mouseUpElement.id], 
        //                             this.mouseDownElement.id, 
        //                             this.mouseUpElement.id,
        //                             this.mouseDownElement.nodeId,
        //                             this.mouseUpElement.nodeId
        //                             )
        //     let wireNeeded = 1
        //     for(let i=0; i<this.wires.length; i++){
        //         if(this.wires[i].lId === tempWire.lId && this.wires[i].rId === tempWire.rId){
        //             wireNeeded = 0
        //             break
        //         }
        //     }
        //     if(wireNeeded){
        //         this.wires.push(tempWire)
        //     }
        // }
    }

    

    update = ()=>{
        for(let i=0; i<this.wires.length; i++){
            this.wires[i].update()
        }

        for(let i=0; i<this.components.length; i++){
            this.components[i].update()
        }
    }
}