export default class Null{
    constructor(simulation, position){
        this.position = position;
        this.value = 0;
        this.simulation = simulation;
        this.selected = 0;
        this.outputs = [0,0]
        this.inputNodes = [undefined,undefined]
        this.inputIds = [undefined,undefined];
        this.outputNodeStart = 1
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