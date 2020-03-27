export default class And{
    constructor(simulation, position){
        this.position = position;
        this.value = 0;
        this.simulation = simulation;
        this.selected = 0;
        this.inputIds = [undefined];
        this.nodeOffsets = [{x: 3, y: 40}, {x: 95 - 3, y: 40}]
    }

    isClicked = (position)=>{
        if(position.x >= this.position.x  &&
            position.x <= this.position.x + 95 &&
            position.y >= this.position.y &&
            position.y <= this.position.y + 80)
            {
                this.select(this.simulation.context)
                if(position.x < this.position.x +10 && position.y > this.position.y+40-5 && position.y < this.position.y+40+5){
                    console.log("blyat")
                    return {
                        position: "node",
                        nodeId: 1,
                        x: position.x - this.position.x,
                        y: position.y - this.position.y
                    }
                }
                else if(position.x > this.position.x +95-10 && position.y > this.position.y + 40 - 10){
                    return{
                        position: "node",
                        nodeId:2,
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
        let and = document.getElementById("not")
        this.simulation.context.drawImage(and, this.position.x, this.position.y, 95, 80);
    }

    update = ()=>{
        if(this.inputIds[0]!=undefined )
            this.value = !this.simulation.components[this.inputIds[0]].value 
        this.draw()
    }
}