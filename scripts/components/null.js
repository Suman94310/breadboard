export default class Null{
    constructor(simulation, position){
        this.position = position;
        this.value = 0;
        this.simulation = simulation;
        this.selected = 0;
        this.input = [undefined];
        this.nodeOffsets = [{x:0, y:0}]
    }

    isClicked = (position)=>{
        return false
    }

    move = (mousePosition)=>{}

    select = ()=>{}

    unSelect = ()=>{}

    draw = ()=>{}

    update = ()=>{}
}