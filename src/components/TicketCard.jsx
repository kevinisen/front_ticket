import React from "react"

const TicketCard = ({ ticket }) => {
    // Couleur selon la priorité
    const priorityColor =
        {
            High: "#ff4d4d",
            Medium: "#ffa502",
            Low: "#2ed573",
        }[ticket.priority] || "#ccc"

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <span
                    style={{ ...styles.badge, backgroundColor: priorityColor }}
                >
                    {ticket.priority}
                </span>
                <button style={styles.menuBtn}>⋮</button>
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
}

export default TicketCard
