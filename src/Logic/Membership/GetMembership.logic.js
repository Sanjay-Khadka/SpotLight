import {useState, useEffect, useCallback } from 'react'
import client from '../../appwrite.config.js'
import { Teams, Databases } from 'appwrite' 

function GetMembershipLogic() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [teams, setTeams] = useState(null)
    const [teamsCount, setTeamsCount] = useState(0)

    const getUserTeams = useCallback(async () => {
        try {
            setLoading(prev => true)
            const teams = new Teams(client)
            const response = await teams.list()
            setTeams(prev =>response.teams)
            setTeamsCount(prev => response.total)        
        }
        catch(err) {
            console.log(err);
        }
        finally {
            setLoading(prev => false)
        }
    }, [])

    useEffect(() => {
        getUserTeams()
    } , [getUserTeams])

    const deleteInvitation = async (e) => {
        e.preventDefault()
        
    }

    return { loading, error, teams, teamsCount, deleteInvitation }
  
}

export default GetMembershipLogic