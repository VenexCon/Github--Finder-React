import { useState } from "react"


function UserSearch() {
    const [text, setText] =useState('')

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(text === '') {
            return alert('Search is Empty!')
        } else {
            //search for users func goes here, either call the fetchUsers() and pass string as arg
            //Or....
        }
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
        <div className="">
            <button className="btn btn-ghost btn-lg">
                Clear
            </button>
        </div>
    </div>
  )
}

export default UserSearch