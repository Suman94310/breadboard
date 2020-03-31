export default class Mux_4_2{
    constructor(simulation, position){
        this.position = position;
        this.value = 0;
        this.simulation = simulation;
        this.selected = 0;
        this.outputs = [0]
        this.inputNodes = [undefined,undefined,undefined,undefined,undefined,undefined]
        this.inputIds = [undefined,undefined,undefined,undefined,undefined,undefined]
        this.selectionNodeStart = 4
        this.outputNodeStart = 6
        this.nodeOffsets = [{x: 0, y: 97/8}, {x: 0, y: 97/8*3}, {x: 0, y: 97/8*5}, {x: 0, y: 97/8*7}, {x: 34, y:115}, {x: 63 , y:115}, {x: 94 , y:97/2}]
    }

    isClicked = (position)=>{
        if(position.x >= this.position.x -3 &&
            position.x <= this.position.x + 94 +3 &&
            position.y >= this.position.y &&
            position.y <= this.position.y + 114 +3)
            {
                this.select(this.simulation.context)
                if(position.x < this.position.x + 7 + 3){
                    if(position.y > this.position.y+97/8-8 && position.y < this.position.y+97/8+8)
                        return {
                            position: "node",
                            nodeId: 1,
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        }
                    else if(position.y > this.position.y+97/8*3-8 && position.y < this.position.y+97/8*3+8)
                        return {
                            position: "node",
                            nodeId: 2,
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        }
                    else if(position.y > this.position.y+97/8*5-8 && position.y < this.position.y+97/8*5+8)
                        return {
                            position: "node",
                            nodeId: 3,
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        }
                    else if(position.y > this.position.y+97/8*7-8 && position.y < this.position.y+97/8*7+8)
                        return {
                            position: "node",
                            nodeId: 4,
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        }
                    return {
                        position: "object",
                        x: position.x - this.position.x,
                        y: position.y - this.position.y
                    }
                }
                else if(position.y > this.position.y+115 -13){
                    if(position.x > this.position.x+34-8 && position.x < this.position.x+34+8)
                        return {
                            position: "node",
                            nodeId: 5,
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        }
                    else if(position.x > this.position.x+63-8 && position.x < this.position.x+63+8)
                        return {
                            position: "node",
                            nodeId: 6,
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        }
                    else return {
                            position:"object", 
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        };
                }
                else if(position.x > this.position.x +94-7-3 && position.y > this.position.y + 97/2 - 7-3 && position.y < this.position.y + 97/2 + 7+3){
                    return{
                        position: "node",
                        nodeId: 7,
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
        let mux_4_2 = document.getElementById("mux_4_2")
        if(!this.selected){
            mux_4_2 = document.getElementById("mux_4_2")
        }
        else{
            mux_4_2 = document.getElementById("mux_4_21")
        }
        this.simulation.context.drawImage(mux_4_2, this.position.x, this.position.y, 94, 114);
    }

    update = ()=>{
        if(this.inputIds[0]!=undefined && this.inputIds[1]!=undefined && this.inputIds[2]!=undefined && this.inputIds[3]!=undefined && this.inputIds[4]!=undefined && this.inputIds[5]!=undefined){
            let selectedNode = 0
            for(let i=this.selectionNodeStart; i<this.inputIds.length; i++){
                selectedNode += this.simulation.components[this.inputIds[i]].outputs[this.inputNodes[i]]*Math.pow(2,this.outputNodeStart-this.selectionNodeStart-1-(i-this.selectionNodeStart))
            }

            this.outputs[0] = this.simulation.components[this.inputIds[selectedNode]].outputs[this.inputNodes[selectedNode]]
        }
            
        this.draw()
    }
}