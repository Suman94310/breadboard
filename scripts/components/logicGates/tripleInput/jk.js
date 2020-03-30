export default class Jk{
    constructor(simulation, position){
        this.position = position;
        this.values = [undefined,undefined];
        this.simulation = simulation;
        this.selected = 0;
        this.outputs = [0,0]
        this.inputNodes = [undefined,undefined,undefined]
        this.inputIds = [undefined,undefined,undefined];
        this.outputNodeStart = 3
        this.nodeOffsets = [{x: 0, y: 75/4}, {x: 0, y:75/2}, {x: 0, y: 75/4*3}, {x: 95 -2, y: 75/4 }, {x: 95 -2, y: 75/4*3 }]
        this.previousClk = undefined
        this.currentClk = undefined
    }

    isClicked = (position)=>{
        if(position.x >= this.position.x -3 &&
            position.x <= this.position.x + 94 +3 &&
            position.y >= this.position.y &&
            position.y <= this.position.y + 75)
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
                    else if(position.y > this.position.y+75/2-8 && position.y < this.position.y+75/2+8)
                        return {
                            position: "node",
                            nodeId: 2,
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        }
                    else if(position.y > this.position.y+75/4*3-8 && position.y < this.position.y+75/4*3+8)
                        return {
                            position: "node",
                            nodeId: 3,
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        }
                    return {
                        position: "object",
                        x: position.x - this.position.x,
                        y: position.y - this.position.y
                    }
                }
                else if(position.x > this.position.x +94-7-3 && position.y > this.position.y + 75/4 - 7-3 && position.y < this.position.y + 75/4 + 7+3){
                    return{
                        position: "node",
                        nodeId: 4,
                        x: position.x - this.position.x,
                        y: position.y - this.position.y
                    }
                }
                else if(position.x > this.position.x +94-7-3 && position.y > this.position.y + 75/4*3 - 7-3 && position.y < this.position.y + 75/4*3 + 7+3){
                    return{
                        position: "node",
                        nodeId: 5,
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
        let jk = document.getElementById("jk")
        if(!this.selected){
            jk = document.getElementById("jk")
        }
        else{
            jk = document.getElementById("jk1")
        }
        this.simulation.context.drawImage(jk, this.position.x, this.position.y, 94, 75);
    }

    update = ()=>{
        
        if(this.inputIds[0]!=undefined && this.inputIds[1]!=undefined && this.inputIds[2]!=undefined){
            if(this.previousClk == undefined){
                this.previousClk = this.simulation.components[this.inputIds[1]].outputs[this.inputNodes[1]]
            }
            else{
                this.previousClk = this.currentClk
                this.currentClk = this.simulation.components[this.inputIds[1]].outputs[this.inputNodes[1]]
                if(this.previousClk == 1 && this.currentClk === 0){
                    if(this.simulation.components[this.inputIds[0]].outputs[this.inputNodes[0]] == 0 && this.simulation.components[this.inputIds[2]].outputs[this.inputNodes[2]] == 0){
                        this.outputs[0] = this.outputs[0]
                        this.outputs[1] = this.outputs[1]
                    }
                    else if(this.simulation.components[this.inputIds[0]].outputs[this.inputNodes[0]] == 0 && this.simulation.components[this.inputIds[2]].outputs[this.inputNodes[2]] == 1){
                        this.outputs[0] = 0
                        this.outputs[1] = 1
                    }
                    else if(this.simulation.components[this.inputIds[0]].outputs[this.inputNodes[0]] == 1 && this.simulation.components[this.inputIds[2]].outputs[this.inputNodes[2]] == 0){
                        this.outputs[0] = 1
                        this.outputs[1] = 0
                    }
                    else if(this.simulation.components[this.inputIds[0]].outputs[this.inputNodes[0]] == 1 && this.simulation.components[this.inputIds[2]].outputs[this.inputNodes[2]] == 1 && this.outputs[0] == 0 && this.outputs[1] == 0){
                        this.outputs[0] = 1
                        this.outputs[1] = 0
                    }
                    else {
                        this.outputs[0] = 1 - this.outputs[0]
                        this.outputs[1] = 1 - this.outputs[1]
                    }
                }
            }
        }

        // if(this.previousClk = 1 )

        // this.value = this.simulation.components[this.inputIds[0]].value && this.simulation.components[this.inputIds[1]].value && this.simulation.components[this.inputIds[2]].value
        this.draw()
    }
}