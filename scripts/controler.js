import Null from "./components/null.js"

export default class controller{
    constructor(simulation){
        this.mousedown = 0;
        this.simulation = simulation
    }
    
    delete = ()=>{
        if(this.simulation.selectedElement != undefined){
            for(let i=0; i<this.simulation.wires.length; i++){
                if(this.simulation.wires[i].lId == this.simulation.selectedElement.id ||
                    this.simulation.wires[i].rId == this.simulation.selectedElement.id){
                        this.simulation.wires[i] = new Null(this.simulation,{x:0,y:0})
                    }
            }
            this.simulation.components[this.simulation.selectedElement.id] = new Null(this.simulation,{x:0,y:0})
        }
        else if(this.simulation.selectedWire != undefined){
            this.simulation.components[this.simulation.wires[this.simulation.selectedWire.id].rId].inputId = undefined
            this.simulation.wires[this.simulation.selectedWire.id] = new Null(this.simulation,{x:0,y:0})
        }
        
    }

    update = ()=>{
        document.onmouseup = (e)=>{
            this.mousedown = 0
            this.simulation.mouseUpHandler({x:e.clientX-8, y:e.clientY-8})
            // add some condition to check and validate which nodes are being connected
            // console.log(this.simulation.mouseUpElement, this.simulation.mouseDownElement)
            // this.simulation.components[this.simulation.mouseUpElement.id].input = this.simulation.components[this.simulation.mouseDownElement.id]
            // console.log(this.simulation.mouseUpElement)
        }
        document.onmousemove = (e)=>{
            if(this.mousedown && this.simulation.selectedElement!=undefined && this.simulation.selectedElement.position === "object"){
                this.simulation.components[this.simulation.selectedElement.id].move({x:e.clientX - this.simulation.selectedElement.icX-7,
                                                                                    y:e.clientY - this.simulation.selectedElement.icY-7})
            }
        }
        document.onmousedown = (e)=>{
            this.mousedown = 1
            this.simulation.mouseDownHandler({x:e.clientX-8, y:e.clientY-8})
        }
        document.onkeydown = (e)=>{
            // this.simulation.components[0].value = 0
            console.log(e.keyCode)
            if(e.keyCode == 88){
                this.delete()
            }
        }
    }
}