export default class Mux_2_1{
    constructor(simulation, position){
        this.position = position;
        this.value = 0;
        this.simulation = simulation;
        this.selected = 0;
        this.outputs = [0]
        this.inputNodes = [undefined,undefined,undefined]
        this.inputIds = [undefined,undefined,undefined];
        this.selectionNodeStart = 2
        this.outputNodeStart = 3
        this.nodeOffsets = [{x: 0, y: 75/4}, {x: 0, y: 75/4*3}, {x: 94/2, y:91-2}, {x: 95 -2, y: 75/2 }]
    }

    isClicked = (position)=>{
        if(position.x >= this.position.x -3 &&
            position.x <= this.position.x + 94 +3 &&
            position.y >= this.position.y &&
            position.y <= this.position.y + 91 +3)
            {
                this.select(this.simulation.context)
                if(position.x < this.position.x + 7 + 3){
                    if(position.y > this.position.y+75/4-8 && position.y < this.position.y+75/4+8)
                        return {
                            position: "node",
                            nodeId: 1,
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        }
                    else if(position.y > this.position.y+75/4*3-8 && position.y < this.position.y+75/4*3+8)
                        return {
                            position: "node",
                            nodeId: 2,
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        }
                    return {
                        position: "object",
                        x: position.x - this.position.x,
                        y: position.y - this.position.y
                    }
                }
                else if(position.x > this.position.x+94/2-8 && position.x < this.position.x+94/2+8 && position.y > this.position.y+91 -8)
                        return {
                            position: "node",
                            nodeId: 3,
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        }
                else if(position.x > this.position.x +94-7-3 && position.y > this.position.y + 75/2 - 7-3 && position.y < this.position.y + 75/2 + 7+3){
                    return{
                        position: "node",
                        nodeId: 4,
                        x: position.x - this.position.x,
                        y: position.y - this.position.y
                    }
                }
                else return {
                    position:"object", 
                    x: position.x - this.position.x,
                    y: position.y - this.position.y
                };
            }
        else{
            this.unSelect()
            return 0;
        }
    }

    move = (mousePosition)=>{
        this.position.x = mousePosition.x
        this.position.y = mousePosition.y
    }

    select = ()=>{
        this.selected = 1
    }

    unSelect = ()=>{
        this.selected = 0
    }

    draw = ()=>{
        let mux_2_1 = document.getElementById("mux_2_1")
        if(!this.selected){
            mux_2_1 = document.getElementById("mux_2_1")
        }
        else{
            mux_2_1 = document.getElementById("mux_2_11")
        }
        this.simulation.context.drawImage(mux_2_1, this.position.x, this.position.y, 94, 91);
    }

    update = ()=>{
        if(this.inputIds[0]!=undefined && this.inputIds[1]!=undefined && this.inputIds[2]!=undefined){
            let selectedNode = 0
            for(let i=this.selectionNodeStart; i<this.inputIds.length; i++){
                selectedNode += this.simulation.components[this.inputIds[i]].outputs[this.inputNodes[i]]*Math.pow(2,i-this.selectionNodeStart)
            }
            this.outputs[0] = this.simulation.components[this.inputIds[selectedNode]].outputs[this.inputNodes[selectedNode]]
        }
            
        this.draw()
    }
}