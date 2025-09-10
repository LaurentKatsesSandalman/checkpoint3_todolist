import type { Task } from "../../types/task";
import styles from "./TaskPreview.module.css";

import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/icons/suppr.png";



interface TaskPreviewProps {
  task: Task;
  setMyTasks:React.Dispatch<React.SetStateAction<Task[]>>;
}

function TaskPreview({ task, setMyTasks }: TaskPreviewProps){
const {authToken, userId} = useAppContext();
 const navigate = useNavigate();



    function handleDelete(){
        setMyTasks((prev)=>(prev.filter((thistask)=> thistask.id===task.id)))
    }

    
    return(<>
    
    <div>
        <button className="icon" onClick={handleDelete}><img className="icon" src={deleteIcon} alt="close icon" /></button>
    </div>
    <div><h1>{task.title}</h1></div>

    
     
    </>)
}

export default TaskPreview