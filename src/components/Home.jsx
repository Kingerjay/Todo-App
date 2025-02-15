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
    const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'


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
        setTasks(filteredTasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
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
        localStorage.setItem("tasks", JSON.stringify(updatedTask));
    }, [tasks]);

    // Function to clear completed tasks
  const clearCompleted = () => {
    const activeTasks = tasks.filter((task) => !task.completed);
    setTasks(activeTasks);
    localStorage.setItem("tasks", JSON.stringify(activeTasks));
  };

  // Get filtered tasks based on filter state
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

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
                <div className='circle-border1 rounded-full w-5 h-5 flex justify-center items-center cursor-pointer'>
                                        
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
                                    <div className='rounded-full w-5 h-5 flex justify-center items-center cursor-pointer'
                                    title='un-mark'
                                    style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
                                        <img src={iconcheck} alt="" />
                                    </div>
                                ) : (
                                    <div className='circle-border rounded-full w-5 h-5 flex justify-center items-center cursor-pointer'
                                    title='mark'>
                                        
                                    </div>
                                )}
                                {/* <p className='text-xl'>{task.title}</p> */}
                                <p className={`text-[14px] lg:text-xl ${task.completed ? "line-through text-gray-400" : "no-underline"}`}>{task.title}</p>
                            </div>

                            <img 
                            src={iconcross} 
                            onClick={() => deleteTask(task.id)} 
                            alt=""
                            title='remove'
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer right-4" 
                            />
                        </div>
                    ))}
                    
                    {/* bottom container */}
                    <div className='flex justify-between items-center px-5 py-3'>
                        <div>{tasks.filter((task) => !task.completed).length} items left</div>
                        <div className='flex gap-4'>
                            <p
                className={`cursor-pointer ${
                  filter === "all" ? "font-bold text-blue-500" : ""
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </p>
              <p
                className={`cursor-pointer ${
                  filter === "active" ? "font-bold text-blue-500" : ""
                }`}
                onClick={() => setFilter("active")}
              >
                Active
              </p>
              <p
                className={`cursor-pointer ${
                  filter === "completed" ? "font-bold text-blue-500" : ""
                }`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </p>
                        </div>
                        <div
              className="cursor-pointer text-red-500"
              onClick={clearCompleted}
            >
              Clear Completed
            </div>
                    </div>


                </div>

        </div>

    </div>
  )
}

export default Home