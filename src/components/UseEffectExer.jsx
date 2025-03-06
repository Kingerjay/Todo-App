// import React, { useState, useEffect } from 'react'
// import Toggle from './Toggle'

// const useEffectExer = () => {
//     const storedValue = JSON.parse(localStorage.getItem("mode"))
    
//     const [darkMode, setDarkMode] =useState(storedValue);

    

    
//         // localStorage.setItem("mode", darkMode)

//     useEffect(() => {
//         localStorage.setItem("mode", darkMode)
//     }, [darkMode])
        

//   return (
//     <div 
//     className='w-full h-screen flex items-center justify-center'
//     style={{color: darkMode ? "white" : "black", backgroundColor: darkMode ? "black" : "white"}} >
//         <Toggle
//         label={darkMode ? "Dark Mode" : "Light Mode"}
//         checked={darkMode}
//         handleToggle={setDarkMode}
//         />
//     </div>
//   )
// }

// export default useEffectExer