import React, { useState } from "react"

const EditTicketModal = ({ ticket, isOpen, onClose, onTicketUpdated }) => {
    // On initialise l'état avec les données actuelles du ticket
    const [formData, setFormData] = useState({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        tags: ticket.tags.join(", "), // On transforme le tableau en string pour l'input
    })

    // Fonction pour fermer si on clique sur le fond sombre uniquement
    const handleOverlayClick = (e) => {
        // e.target est l'élément cliqué
        // e.currentTarget est l'élément qui possède l'événement (l'overlay)
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedData = {
            ...formData,
            tags: formData.tags
                .split(/[\s,]+/)
                .map((tag) => tag.trim())
                .filter((tag) => tag !== ""),
        }

        console.log(updatedData)

        try {
            const response = await fetch(`api/tickets/${ticket.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            })

            if (response.ok) {
                onTicketUpdated() // Rafraîchit la liste et les stats
                onClose()
            }
        } catch (error) {
            console.error("Erreur lors de la modification:", error)
        }
    }

    if (!isOpen) return null

    return (
        <div
            style={styles.overlay}
            onClick={handleOverlayClick}
        >
            <div style={styles.modal}>
                <h2 style={{ marginTop: 0, color: "#2f3542" }}>
                    Modifier le Ticket
                </h2>
                <form
                    onSubmit={handleSubmit}
                    style={styles.form}
                >
                    <input
                        value={formData.title}
                        style={styles.input}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                    />
                    <textarea
                        value={formData.description}
                        style={{ ...styles.input, height: "80px" }}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                    />

                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>Priorité</label>
                            <select
                                value={formData.priority}
                                style={styles.input}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        priority: e.target.value,
                                    })
                                }
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Statut</label>
                            <select
                                value={formData.status}
                                style={styles.input}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        status: e.target.value,
                                    })
                                }
                            >
                                <option value="Open">Open</option>
                                <option value="In progress">In progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                    </div>

                    <input
                        value={formData.tags}
                        placeholder="Tags (bug, ui...)"
                        style={styles.input}
                        onChange={(e) =>
                            setFormData({ ...formData, tags: e.target.value })
                        }
                    />

                    <div style={styles.actions}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={styles.cancelBtn}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            style={styles.submitBtn}
                        >
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
    },
    modal: {
        backgroundColor: "#fff",
        padding: "25px",
        borderRadius: "16px",
        width: "450px",
    },
    form: { display: "flex", flexDirection: "column", gap: "12px" },
    input: {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "0.9rem",
        width: "100%",
        boxSizing: "border-box",
    },
    row: { display: "flex", gap: "10px" },
    field: { flex: 1 },
    label: {
        fontSize: "0.7rem",
        fontWeight: "bold",
        color: "#666",
        marginBottom: "4px",
        display: "block",
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginTop: "10px",
    },
    cancelBtn: {
        padding: "8px 16px",
        border: "none",
        background: "#eee",
        borderRadius: "6px",
        cursor: "pointer",
    },
    submitBtn: {
        padding: "8px 16px",
        border: "none",
        background: "#3498db",
        color: "white",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
    },
}

export default EditTicketModal
