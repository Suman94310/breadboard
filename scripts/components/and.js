export default class Led{
    constructor(simulation, position){
        this.position = position;
        this.value = 0;
        this.simulation = simulation;
        this.selected = 0;
        this.inputIds = [null,null];
        this.nodeOffsets = [{x:this.position.x + 3, y:this.position.y + 20}, {x:this.position.x + 3, y:this.position.y + 60}, {x:this.position.x + 95 - 3, y:this.position.y + 40}]
    }

    isClicked = (position)=>{
        if(position.x >= this.position.x  &&
            position.x <= this.position.x + 95 &&
            position.y >= this.position.y &&
            position.y <= this.position.y + 80)
            {
                this.select(this.simulation.context)
                if(position.x < this.position.x +10){
                    if(position.y > this.position.y+20-5 && position.y < this.position.y+20+5)
                        return {
                            position: "node",
                            nodeId: 1,
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        }
                    else if(position.y > this.position.y+60-5 && position.y < this.position.y+60+5)
                        return {
                            position: "node",
                            nodeId: 2,
                            x: position.x - this.position.x,
                            y: position.y - this.position.y
                        }
                }
                else if(position.x > this.position.x +95-10 && position.y > this.position.y + 40 - 10){
                    return{
                        position: "node",
                        nodeId: 3,
                        x: position.x - this.position.x,
                        y: position.y - this.position.y
                    }
                }
                else return {position:"object", 
                x: position.x - this.position.x,
                y: position.y - this.position.y};
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
        let and = document.getElementById("and")
        this.simulation.context.strokeRect(this.position.x+85, this.position.y+35, 10,10);
        this.simulation.context.strokeRect(this.position.x, this.position.y+20-5, 10,10);
        this.simulation.context.strokeRect(this.position.x, this.position.y+60-5, 10,10);
        this.simulation.context.drawImage(and, this.position.x, this.position.y, 95, 80);
    }

    update = ()=>{
        this.value = this.inputIds[1] && this.inputIds[2]
        this.draw()
    }
}