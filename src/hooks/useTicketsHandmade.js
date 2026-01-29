import { useState, useEffect } from "react"
import { ticketService } from "../services/ticketService"

export const useTicketsHandmande = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchTickets = async () => {
        try {
            setIsLoading(true)
            const tickets = await ticketService.getAll()
            setData(tickets)
            setError(null)
        } catch (err) {
            setError("Impossible de charger les tickets")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTickets()
    }, [])

    return { data, isLoading, error, refetch: fetchTickets }
}
