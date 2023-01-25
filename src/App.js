import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import About from "./components/About"

function App() {
  // const name = 'Prathmesh';
  const [showAddTask, setShowAddTask] = useState(false)
  const [taskList, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])


  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/taskList')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/taskList/${id}`)
    const data = await res.json()
    return data
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/taskList', {
      method: 'POST',
      headers: {
        'Content-type': 'application/JSON'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...taskList, data])

    // const id = Math.floor(Math.random()*5000)+1;
    // const newTask = {id, ...task}
    // setTasks([...taskList, newTask])
  }

  //Delete task code
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/taskList/${id}`, {
      method: 'DELETE'
    })

    setTasks(taskList.filter((task) => task.id !== id))
  }

  //Toggle reminder code
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    let res = await fetch(`http://localhost:5000/taskList/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(taskList.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  //&& is used as a ternary operator when we doesn't need any else part
   
  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {taskList.length > 0 ? (
                  <Tasks
                    tasks={taskList}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )

}

export default App;


//return (
  //   <Router>
  //     <div className="container">
  //       <Header
  //         onAdd=
  //         {() =>
  //           setShowAddTask(!showAddTask)
  //         }
  //         showAdd={showAddTask}
  //       />

  //       <Routes>
  //         <Route path="/" exact render={(props) => (
  //           <>
  //             {
  //               showAddTask && <AddTask onAdd={addTask} />
  //             }

  //             {
  //               taskList.length > 0 ?
  //                 (
  //                   <Tasks tasks=
  //                     {taskList} onDelete={deleteTask}
  //                     onToggle={toggleReminder}
  //                   />) : ("No tasks remaining")
  //             }
  //           </>
  //         )} />


  //         <Route path="/about" component={About} />
  //       </Routes>

  //       <Footer />
  //     </div>
  //   </Router>
  // );