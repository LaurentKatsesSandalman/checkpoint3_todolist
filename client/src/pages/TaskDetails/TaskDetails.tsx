import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import type { Subtask, Task } from "../../types/task";
import { useEffect, useState } from "react";
import axios from "axios";
import backIcon from "../../assets/icons/back.png";
import { Link } from "react-router-dom";
import styles from "./TaskDetails.module.css"

function TaskDetails(){
        const {
        authToken,
        setAuthToken,
        userId

    } = useAppContext();

const emptyTask:Task = {
    title: "New Task",
    description:"",
    subtasks:[]
}


const [task, setTask] = useState<Task>(emptyTask);
const {task_id} = useParams<{task_id: string}>()

    useEffect(() => {
        const getTask = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL
                    }/api/users/${userId}/tasks/${task_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setTask(response.data);
            } catch (err: any) {
                if (
                    err.response?.status === 403 ||
                    err.response?.status === 401
                ) {
                    setAuthToken(null);
                }
            }
        };
        getTask();
    }, [authToken, task_id, setAuthToken]);

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/users/${userId}/tasks/${task_id}`,
                {
                    task: task,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
        } catch (err: any) {
            if (err.response?.status === 403 || err.response?.status === 401) {
                setAuthToken(null);
            }
        }
    };

const handleChange = (
        string: "title" | "description",
        eventTargetValue: string
    ) => {
        if (string === "title") {
            setTask((prev) => ({ ...prev, title: eventTargetValue }));
        }
        if (string === "description") {
            setTask((prev) => ({ ...prev, description: eventTargetValue,
            }));
        }
    };

    const addSub =()=> {
        const newSub:Subtask ={
            position:task.subtasks?.length+1,
            title:"",
            isDone:false
        }
        setTask((prev)=>({...prev, subtasks:[...prev.subtasks,newSub]}))
    }


    return(<>
        <div>
                            <Link to="/tasks">
                    <img className="icon" src={backIcon} alt="close icon" />
                </Link>
        </div>
        <form onSubmit={handleSubmit}>
        <div>
            <input type="text" value={task.title} onChange={(event) => {
                                    event.preventDefault();
                                    handleChange("title", event.target.value);
                                }} className={styles.taskTitle} maxLength={100}/>
        </div>
        <div>
            <input type="text" value={task.description} onChange={(event) => {
                                    event.preventDefault();
                                    handleChange("description", event.target.value);
                                }} className={styles.taskDesc} maxLength={250}/>
        </div>
        <button
                        
                        type="submit"
                        className={styles.submitBtn}
                    >
                        Save
                    </button>
        </form>
    </>)
}

export default TaskDetails