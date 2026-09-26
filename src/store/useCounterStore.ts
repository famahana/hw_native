import {create} from "zustand"


type TypeAction = () => void;
type CounterStore = {
    count:number,
    up:TypeAction,
    down:TypeAction,
    reset:TypeAction,
};
export const UserCounterStore = create<CounterStore>((set)=> ({
    count:0,
    up:() => {
        set((state)=>({
            count:state.count+1,
        }));
    },
    down:() => {
        set((state)=>({
            count:state.count >0? state.count -1 : state.count=0
            
            
        }));
    },
    reset:()=>{
        set((state)=>({
            count:state.count=0,
        }))
    }
}));