export default class Jk{
    constructor(simulation, position){
        this.position = position;
        this.values = [undefined,undefined];
        this.simulation = simulation;
        this.selected = 0;
        this.inputIds = [undefined,undefined,undefined];
        this.nodeOffsets = [{x: 0, y: 75/4}, {x: 0, y:75/2}, {x: 0, y: 75/4*3}, {x: 95 -2, y: 75/2 }]
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
                this.previousClk = this.simulation.components[this.inputIds[1]].value
            }
            else{
                this.previousClk = this.currentClk
                this.currentClk = this.simulation.components[this.inputIds[1]].value
                if(this.previousClk == 1 && this.currentClk === 0){
                    
                }
            }
        }
        //     this.value = this.simulation.components[this.inputIds[0]].value && this.simulation.components[this.inputIds[1]].value && this.simulation.components[this.inputIds[2]].value
        this.draw()
    }
}