import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';

export default function Dashboard (){
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
    
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            navigate('/dashboard')
        }
        if (!authToken) {
            navigate('/login')
        }
    }, [navigate])
    return(
        <div>
            Dashboard
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}