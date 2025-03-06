import React, { useEffect, useState } from 'react'
import '../index.css'
import bgImage from "../assets/bg-desktop.jpg"
import moonImg from "../assets/icon-moon.svg"
import sunImg from "../assets/icon-sun.svg"
import iconcheck from "../assets/icon-check.svg"
import iconcross from "../assets/icon-cross.svg"
import { BiRadioCircle } from 'react-icons/bi'

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [id, setId] = useState(1);
    const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'
    const [darkMode, setDarkMode] = useState(() => {
        // Get initial dark mode state from localStorage
        const savedMode = localStorage.getItem("mode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Save dark mode preference to localStorage
    useEffect(() => {
        localStorage.setItem("mode", JSON.stringify(darkMode));
    }, [darkMode]);

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
        
        setTasks(prevTasks => {
            const updatedTasks = [...prevTasks, newTask];
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        });

        setId(id + 1);
        setInput("");
    }

    // Function to toggle task completion
    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
    };

    // Function to delete a task
    const deleteTask = (taskId) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.filter(task => task.id !== taskId);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
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
        <div className={`w-full min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <div className='w-full h-[320px] text-2xl font-bold'
                style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            </div>

            {/* Form container */}
            <div className='mobile w-4/5 lg:w-2/3 xl:w-3/5 2xl:w-2/5 h-[500px] absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>

                {/* Top Text */}
                <div className='flex items-center justify-between pb-[3rem]'>
                    <p className='todo text-white text-3xl font-semibold md:text-4xl'>T O D O</p>
                    <img 
                        src={darkMode ? sunImg : moonImg} 
                        alt={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} 
                        onClick={toggleDarkMode}
                        className="cursor-pointer"
                    />
                </div>

                {/* Input field */}
                <form onSubmit={addTask}>
                    <div className={`w-full h-[60px] rounded-md flex items-center gap-4 px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className='circle-border1 rounded-full w-5 h-5 flex justify-center items-center cursor-pointer mb-1'></div>
                        <input 
                            type="text" 
                            className={`bg-transparent w-full h-full outline-0 text-lg lg:text-xl ${darkMode ? 'text-white' : 'text-black'} placeholder:${darkMode ? 'text-gray-400' : 'text-black'}`}
                            placeholder='Enter a task here...' 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                </form>

                {/* Todo list container */}
                <div className='mt-8 shadow-lg max-h-fit rounded-md mb-4 overflow-hidden'>
                    {filteredTasks.length === 0 ? (
                        <div className={`w-full h-[65px] flex items-center justify-center p-4 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'}`}>
                            <p className='notask'>No task yet</p>
                        </div>
                    ) : (
                        filteredTasks.map((task) => (
                            <div 
                                key={task.id} 
                                className={`w-full flex items-center justify-between p-4 border-b-[lightgray] border-b-3 group ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                            >
                                <div className='flex items-center gap-4' onClick={() => toggleTaskCompletion(task.id)}>
                                    {task.completed ? (
                                        <div className='rounded-full w-5 h-5 flex justify-center items-center cursor-pointer'
                                            title='un-mark'
                                            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
                                            <img src={iconcheck} alt="" />
                                        </div>
                                    ) : (
                                        <div className={`circle-border rounded-full w-5 h-5 flex justify-center items-center cursor-pointer ${darkMode ? 'border-gray-600' : ''}`}
                                            title='mark'>
                                        </div>
                                    )}
                                    <p className={`fonte text-[14px] lg:text-xl ${task.completed ? "line-through text-gray-400" : darkMode ? "text-white" : "text-black"}`}>
                                        {task.title}
                                    </p>
                                </div>

                                <img src={iconcross}
                                    onClick={() => deleteTask(task.id)}
                                    alt=""
                                    title='remove'
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer right-4" />
                            </div>
                        ))
                    )}

                    {/* Bottom container */}
                    <div className={`flex flex-col gap-2 px-5 py-3 rounded-b-md shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        {/* First Row (Tasks Left & Clear Completed) - Always in one line */}
                        <div className="flex justify-between w-full">
                            <div className='hover:font-bold'>{tasks.filter((task) => !task.completed).length} tasks left</div>

                            <div className='hidden justify-center gap-4 md:flex'>
                                <p className={`cursor-pointer hover:font-bold ${filter === "all" ? "font-bold text-blue-500" : ""}`} onClick={() => setFilter("all")}>All</p>
                                <p className={`cursor-pointer hover:font-bold ${filter === "active" ? "font-bold text-blue-500" : ""}`} onClick={() => setFilter("active")}>Active</p>
                                <p className={`cursor-pointer hover:font-bold ${filter === "completed" ? "font-bold text-blue-500" : ""}`} onClick={() => setFilter("completed")}>Completed</p>
                            </div>

                            <div className="cursor-pointer hover:font-bold text-red-500" onClick={clearCompleted}>
                                Clear Completed
                            </div>
                        </div>

                        {/* Second Row (Filters - All Active Completed) - Moves to next line on md screens */}
                        <div className='flex justify-center gap-4 md:hidden'>
                            <p className={`cursor-pointer hover:font-bold ${filter === "all" ? "font-bold text-blue-500" : ""}`} onClick={() => setFilter("all")}>All</p>
                            <p className={`cursor-pointer hover:font-bold ${filter === "active" ? "font-bold text-blue-500" : ""}`} onClick={() => setFilter("active")}>Active</p>
                            <p className={`cursor-pointer hover:font-bold ${filter === "completed" ? "font-bold text-blue-500" : ""}`} onClick={() => setFilter("completed")}>Completed</p>
                        </div>
                    </div>
                </div>

                <div className={`w-full flex items-center justify-center py-5 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    <p>Todo - List</p>
                </div>
            </div>
        </div>
    )
}

export default Home