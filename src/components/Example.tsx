import { useDispatch } from "react-redux"
import {increment} from "../redux/counter/counterSlice";


export const Example = () => {
    const dispatch = useDispatch()


    return <button onClick={() => {dispatch(increment())}}>Incrementa</button>
}