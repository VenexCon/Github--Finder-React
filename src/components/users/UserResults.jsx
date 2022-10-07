import { useContext, useEffect} from "react"
import SpinnerItem from "../layout/Spinner"
import UserItem from "../users/UserItem"
import GithubContext from "../../context/github/GithubContext"




function UserResults() {
    
    const {fetchUsers, loading, users } = useContext(GithubContext);

    useEffect(() => {
        fetchUsers()
    },[])


    if(!loading) {
        return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
            {users.map((user) => (
                <UserItem key = {user.id} user = {user} />
                
            ) )}
        </div>
    )
    } else {
        return <SpinnerItem />
    }
  
}

export default UserResults