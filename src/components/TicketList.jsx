import React, { useState, useEffect } from "react"
import TicketCard from "./TicketCard"

const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    // Préparation pour les filtres
    const [filter, setFilter] = useState("")

    useEffect(() => {
        fetch("api/tickets")
            .then((res) => res.json())
            .then((data) => {
                setTickets(data)
                setLoading(false)
            })
    }, [])

    // Logique de filtrage côté client (très rapide)
    const filteredTickets = tickets.filter(
        (t) =>
            t.title.toLowerCase().includes(filter.toLowerCase()) ||
            t.status.toLowerCase().includes(filter.toLowerCase()),
    )

    if (loading)
        return <p style={{ color: "white" }}>Chargement des tickets...</p>

    return (
        <div>
            {/* Barre de recherche simple pour l'instant */}
            <input
                type="text"
                placeholder="Rechercher un ticket..."
                style={styles.search}
                onChange={(e) => setFilter(e.target.value)}
            />

            <div style={styles.grid}>
                {filteredTickets.map((ticket) => (
                    <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                    />
                ))}
            </div>
        </div>
    )
}

const styles = {
    grid: {
        display: "grid",
        // 'auto-fill' va créer autant de colonnes de 350px que possible
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "25px",
        width: "100%",
    },
    search: {
        width: "100%",
        boxSizing: "border-box", // Important pour que le padding ne dépasse pas
        padding: "15px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: "#2f3542",
        color: "white",
        marginBottom: "30px",
        fontSize: "1rem",
    },
}

export default TicketList
