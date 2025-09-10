import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import type { Task } from "../../types/task";
import axios from "axios";
import TaskPreview from "../../components/TaskPreview/TaskPreview";
import addIcon from "../../assets/icons/add.png";
import { useNavigate } from "react-router-dom";
import styles from "./MyPage.module.css"


function MyPage(){
const{userId,authToken}= useAppContext();

const[myTasks, setMyTasks]=useState<Task[]>([])

 const navigate = useNavigate();

useEffect(()=>{
    if (!userId || !authToken) return;
    
    const fetchTasks= async ()=>{
        try{

            const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/users/${userId}/tasks`,
                    { headers: { Authorization: `Bearer ${authToken}` } }
                );
                setMyTasks(response.data);
        } catch(err){
            console.error("Error fetching tasks:", err);
        }
    };

    fetchTasks()

},[userId, authToken])

async function handleAdd() {
const emptyTask:Task = {
    title: "New Task",
    description:"",
    subtasks:[]
}
try {
    console.log(userId, authToken)
 const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/${userId}/tasks`,
                emptyTask,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
             navigate(`/tasks/${response.data.id}`); //redirection to task page
}catch(err){
            console.error("Error when creating task:",
                err
            );
               alert(
                "Can't create task, retry or try later"
            );
}



    }

    return(<>
        <h1>this is my page</h1>
        <div className={styles.content}>
        {myTasks.map((task)=>(
        <TaskPreview key={task.id} task={task} setMyTasks={setMyTasks}/>
        ))}
            <div>
        <button className="icon" onClick={handleAdd}><img className="icon" src={addIcon} alt="add icon" /></button>
    </div>
        </div>
        </>

    )
}

export default MyPage