import React from "react"
import { useState } from "react"
import Stats from "./components/Stats"
import TicketList from "./components/TicketList"
import AddTicketModal from "./components/AddTicketModal"

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)

    // Cette fonction va forcer le rafraîchissement des tickets et des stats
    const handleTicketAdded = () => {
        setRefreshKey((prev) => prev + 1)
    }
    return (
        // Container principal avec un fond sombre pour matcher tes screenshots
        <div style={styles.appContainer}>
            <div style={styles.content}>
                <header style={styles.header}>
                    <h1 style={styles.title}>Dashboard Tickets</h1>
                </header>

                {/* On passe la refreshKey pour forcer le re-fetch quand elle change */}
                <Stats key={`stats-${refreshKey}`} />

                <div style={{ marginTop: "40px" }}>
                    <h2 style={{ color: "#a4b0be" }}>Liste des tickets</h2>
                    <button
                        style={styles.addBtn}
                        onClick={() => setIsModalOpen(true)}
                    >
                        + Nouveau Ticket
                    </button>
                    <TicketList
                        key={`list-${refreshKey}`}
                        onRefresh={handleTicketAdded}
                    />
                </div>

                <AddTicketModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onTicketAdded={handleTicketAdded}
                />
            </div>
        </div>
    )
}

const styles = {
    appContainer: {
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        padding: "40px", // Padding égal partout
        boxSizing: "border-box",
    },
    content: {
        width: "100%", // Prend toute la largeur
        margin: "0 auto",
    },
    header: {
        marginBottom: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: "2.5rem",
        fontWeight: "800",
        margin: 0,
        letterSpacing: "-1px",
    },
    subtitle: {
        fontSize: "1.5rem",
        marginBottom: "20px",
        color: "#a4b0be",
    },
    section: {
        marginBottom: "50px",
    },
    addBtn: {
        backgroundColor: "#10b981",
        color: "white",
        border: "none",
        padding: "12px 24px",
        borderRadius: "10px",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "1rem",
        margin: "20px",
    },
}

export default App
