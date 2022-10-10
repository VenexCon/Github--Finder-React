import { useState, useContext } from "react"
import GithubContext from '../../context/github/GithubContext'
import AlertContext from "../../context/github/alert/AlertContext"

function UserSearch() {
    const [text, setText] =useState('')

    const {users, searchUsers, clearUsers} = useContext(GithubContext)
    const {setAlert} = useContext(AlertContext)

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(text === '') {
           setAlert("Please Enter Something", 'error')
        } else {
            searchUsers(text)
            setText('')
        }
    }

    const handleClearUser = () => {
        clearUsers()
    }



  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2
    mb-8 gap-8 ">
        <div className="">
            <form className="form-control" onSubmit={handleSubmit}>
                <div className="relative">
                    <input type="text" className="w-full pr-4- bg-grey-200 input input-lg 
                    text-black bg-white" placeholder="Search" aria-label="Search Input" 
                    value = {text} onChange = {handleChange}/>
                    <button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                        Go
                    </button>
                </div>
            </form>
        </div>
        {users.length > 0 && (<div className="">
            <button className="btn btn-ghost btn-lg" onClick={handleClearUser}>Clear</button>
        </div>)}
    </div>
  )
}

export default UserSearch