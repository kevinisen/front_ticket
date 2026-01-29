import React, { useState, useEffect } from "react"

const Stats = () => {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("api/tickets/stats")
            .then((res) => res.json())
            .then((data) => {
                setStats(data)
                setLoading(false)
            })
            .catch((err) => console.error("Erreur stats:", err))
    }, [])

    if (loading)
        return (
            <div style={{ color: "white", padding: "20px" }}>Chargement...</div>
        )

    return (
        <div style={styles.container}>
            {/* Stat: Open */}
            <div style={{ ...styles.card, borderLeft: "6px solid #ff4d4d" }}>
                <div style={styles.iconBox}>🔥</div>
                <div style={styles.info}>
                    <p style={styles.label}>À TRAITER</p>
                    <h3 style={styles.value}>{stats?.["Open"] || 0}</h3>
                </div>
            </div>

            {/* Stat: In Progress */}
            <div style={{ ...styles.card, borderLeft: "6px solid #ffa502" }}>
                <div style={styles.iconBox}>⚙️</div>
                <div style={styles.info}>
                    <p style={styles.label}>EN COURS</p>
                    <h3 style={styles.value}>{stats?.["In progress"] || 0}</h3>
                </div>
            </div>

            {/* Stat: Done */}
            <div style={{ ...styles.card, borderLeft: "6px solid #2ed573" }}>
                <div style={styles.iconBox}>✅</div>
                <div style={styles.info}>
                    <p style={styles.label}>TERMINÉS</p>
                    <h3 style={styles.value}>{stats?.["Done"] || 0}</h3>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "flex", // C'est ça qui aligne horizontalement
        flexWrap: "wrap",
        flexDirection: "row", // Force la ligne
        justifyContent: "center", // Aligne au début (gauche)
        gap: "20px",
        width: "100%",
        marginBottom: "40px",
        padding: "10px 0",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        minWidth: "220px", // Largeur minimum pour chaque carte
        maxWidth: "300px", // Évite qu'elles deviennent trop larges sur grand écran
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        flex: "1 1 300px", // "1" pour grandir, "300px" comme base de largeur
        minHeight: "100px",
    },
    iconBox: {
        fontSize: "2.2rem",
        marginRight: "18px",
        backgroundColor: "#f1f2f6",
        width: "55px",
        height: "55px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
    },
    info: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        margin: 0,
        fontSize: "0.75rem",
        fontWeight: "700",
        color: "#a4b0be",
        letterSpacing: "1px",
    },
    value: {
        margin: 0,
        fontSize: "1.8rem",
        fontWeight: "800",
        color: "#2f3542",
    },
}

export default Stats
