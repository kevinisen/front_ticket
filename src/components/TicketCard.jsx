import React, { useState, useEffect, useRef } from "react"
import EditTicketModal from "./EditTicketModal" // On va créer ce composant juste après

const TicketCard = ({ ticket, onRefresh }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const priorityColor =
        {
            High: "#ff4d4d",
            Medium: "#ffa502",
            Low: "#2ed573",
        }[ticket.priority] || "#ccc"

    const handleDelete = async () => {
        if (window.confirm(`Supprimer le ticket "${ticket.title}" ?`)) {
            await fetch(`api/tickets/${ticket.id}`, {
                method: "DELETE",
            })
            onRefresh()
        }
    }

    // 2. Crée la référence
    const menuRef = useRef(null)

    // 3. Détecte le clic à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Si le menu est ouvert ET que le clic n'est pas dans menuRef
            if (
                showMenu &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setShowMenu(false)
            }
        }

        // On attache l'écouteur d'événement
        document.addEventListener("mousedown", handleClickOutside)

        // On nettoie l'écouteur quand le composant disparait
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showMenu]) // On réexécute si showMenu change

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <span
                    style={{ ...styles.badge, backgroundColor: priorityColor }}
                >
                    {ticket.priority}
                </span>
                <div
                    style={{ position: "relative" }}
                    ref={menuRef}
                >
                    <button
                        style={styles.menuBtn}
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        ⋮
                    </button>
                    {showMenu && (
                        <div style={styles.dropdown}>
                            <button
                                style={styles.dropItem}
                                onClick={() => {
                                    setIsEditModalOpen(true)
                                    setShowMenu(false)
                                }}
                            >
                                Modifier ✏️
                            </button>
                            <button
                                style={{ ...styles.dropItem, color: "red" }}
                                onClick={handleDelete}
                            >
                                Supprimer 🗑️
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <h4 style={styles.title}>{ticket.title}</h4>
            <p style={styles.desc}>{ticket.description}</p>

            <div style={styles.footer}>
                <div style={styles.tags}>
                    {ticket.tags.map((tag) => (
                        <span
                            key={tag}
                            style={styles.tag}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                <span style={styles.date}>{ticket.createdAt}</span>
            </div>

            {/* Modale d'édition */}
            {isEditModalOpen && (
                <EditTicketModal
                    ticket={ticket}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onTicketUpdated={onRefresh}
                />
            )}
        </div>
    )
}

const styles = {
    card: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        position: "relative", // Ajouté pour le dropdown
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    badge: {
        padding: "4px 8px",
        borderRadius: "6px",
        color: "#fff",
        fontSize: "0.7rem",
        fontWeight: "bold",
    },
    menuBtn: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.2rem",
        color: "#666",
    },
    title: { margin: 0, fontSize: "1.1rem", color: "#2f3542" },
    desc: {
        margin: 0,
        fontSize: "0.9rem",
        color: "#747d8c",
        lineHeight: "1.4",
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "10px",
    },
    tag: { fontSize: "0.75rem", color: "#70a1ff", marginRight: "5px" },
    date: { fontSize: "0.7rem", color: "#a4b0be" },
    // Nouveaux styles pour le menu sans casser le reste
    dropdown: {
        position: "absolute",
        right: 0,
        top: "25px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        borderRadius: "8px",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        padding: "5px",
    },
    dropItem: {
        background: "none",
        border: "none",
        padding: "8px 12px",
        cursor: "pointer",
        textAlign: "left",
        fontSize: "0.85rem",
        whiteSpace: "nowrap",
        color: "#2f3542",
    },
}

export default TicketCard
