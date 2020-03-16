export default class controller{
    constructor(simulation){
        this.mousedown = 0;
        this.simulation = simulation
    }
    
    update = ()=>{
        document.onmouseup = (e)=>{
            this.mousedown = 0
            this.simulation.mouseUpHandler({x:e.clientX-8, y:e.clientY-8})
            // add some condition to check and validate which nodes are being connected
            // console.log(this.simulation.mouseUpElement, this.simulation.mouseDownElement)
            this.simulation.components[this.simulation.mouseUpElement.id].input = this.simulation.components[this.simulation.mouseDownElement.id]
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
    }
}