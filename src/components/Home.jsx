import React, { useEffect, useState } from 'react'
import '../index.css'
import bgImage from "../assets/bg-desktop.jpg"
import moonImg from "../assets/icon-moon.svg"
import iconcheck from "../assets/icon-check.svg"
import iconcross from "../assets/icon-cross.svg"
import { BiRadioCircle } from 'react-icons/bi'
import { AiOutlineCheckCircle, AiOutlineDelete } from 'react-icons/ai';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [id, setId] = useState(1);

    // Function to add New Task
    const addTask = (e) => {
        e.preventDefault();
        if (input.trim() === "") 
            return;

        const newTask = {
            id: id,
            title: input,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setId(id + 1);
        const updatedTask = [... tasks, newTask];
        setTasks(updatedTask);
        localStorage.setItem("task", JSON.stringify(updatedTask));
        setInput("")
    }

    // Function to toggle task completion
    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
    };

    // Function to delete a task
    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

  return (
    <div className='w-full'>
        <div className='w-full h-[320px] text-2xl font-bold '
    style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
        </div>

        {/* Form container */}
        <div className='w-4/5 lg:w-2/3 xl:w-3/5 2xl:w-2/5 h-[500px] absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>

            {/* Top Text */}
            <div className='flex items-center justify-between pb-[3rem]'>
                <p className='todo text-white text-4xl font-semibold'>T O D O</p>
                <img src={moonImg} alt="" />
            </div>

            {/* Input field */}
            <form onSubmit={addTask}>
                <div className='bg-white w-full h-[65px] rounded-md flex items-center gap-4 px-4' >
                {/* <BiRadioCircle size={45} className='text-slate-300 font-thin'/> */}
                <div className='circle-border1 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer'>
                                        
                  </div>

                <input 
                type="text" 
                className='bg-transparent w-full h-[65px] outline-0 text-lg lg:text-xl'
                placeholder='Enter a task here...' 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
            </div>
            </form>

                

                {/* Todo list container */}
                <div className='mt-8 shadow-lg max-h-fit rounded-md'>
                    {tasks.map((task) => (
                    <div key={task.id} className='bg-white w-full h-[65px] rounded-t-md flex items-center justify-between p-4 border-b-[lightgray] border-b-3 group'>
                            <div className='flex items-center gap-4'
                            onClick={() => toggleTaskCompletion(task.id)}>
                                {task.completed ? (
                                    <div className='rounded-full w-6 h-6 flex justify-center items-center cursor-pointer'
                                    style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
                                        <img src={iconcheck} alt="" />
                                    </div>
                                ) : (
                                    <div className='circle-border rounded-full w-6 h-6 flex justify-center items-center cursor-pointer'>
                                        
                                    </div>
                                )}
                                {/* <p className='text-xl'>{task.title}</p> */}
                                <p className={`text-[14px] lg:text-xl ${task.completed ? "line-through text-gray-400" : "no-underline"}`}>{task.title}</p>
                            </div>

                            <img 
                            src={iconcross} 
                            onClick={() => deleteTask(task.id)} 
                            alt=""
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer right-4" 
                            />
                        </div>
                    ))}
                    
                    {/* bottom container */}
                    <div><br /></div>


                </div>

        </div>

    </div>
  )
}

export default Home