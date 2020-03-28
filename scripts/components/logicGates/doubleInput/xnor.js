export default class xnor{
    constructor(simulation, position){
        this.position = position;
        this.value = 0;
        this.simulation = simulation;
        this.selected = 0;
        this.inputIds = [undefined,undefined];
        this.nodeOffsets = [{x: 0, y: 75/4}, {x: 0, y: 75/4*3}, {x: 95 -2, y: 75/2 }]
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
                else if(position.x > this.position.x +94-7-3 && position.y > this.position.y + 75/2 - 7-3 && position.y < this.position.y + 75/2 + 7+3){
                    return{
                        position: "node",
                        nodeId: 3,
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
        let xnor = document.getElementById("xnor")
        if(!this.selected){
            xnor = document.getElementById("xnor")
        }
        else{
            xnor = document.getElementById("xnor1")
        }
        this.simulation.context.drawImage(xnor, this.position.x, this.position.y, 94, 75);
    }

    update = ()=>{
        if(this.inputIds[0]!=undefined && this.inputIds[1]!=undefined)
            this.value = (this.simulation.components[this.inputIds[0]].value && this.simulation.components[this.inputIds[1]].value) || (!this.simulation.components[this.inputIds[0]].value && !this.simulation.components[this.inputIds[1]].value)
        this.draw()
    }
}