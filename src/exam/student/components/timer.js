import { useEffect,useState} from "react"

const formatTime = (secs)=>{
    let hours = ~~(secs/3600);
    let minutes = ~~((secs %3600)/60);
    let seconds = ~~secs % 60;

    let ret = "";
    if(hours > 0){
        ret += `${hours}:${(minutes < 10 ?"0":"")}`;
    }
    ret += `${minutes}:${(seconds < 10 ? "0":"")}`;
    ret += `${seconds}`;
    return ret;
}

export default function Timer({time,cb}){
    const [counter,setCounter] = useState(+(time));
    const [duration,setDuration] = useState("");

    useEffect(()=>{
        setDuration(formatTime(counter));
       const timer = counter > 0 ? setInterval(()=>setCounter(counter - 1),1000):cb();
        
       return ()=> clearInterval(timer);
    },[counter]);
    return(
        <span className="text-danger fw-bold fs-4">Time Left : {duration}</span>
    )
}