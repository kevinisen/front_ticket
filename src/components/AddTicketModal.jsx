import React, { useState } from "react"

const AddTicketModal = ({ isOpen, onClose, onTicketAdded }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Low",
        status: "Open",
        tags: "",
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

        // On transforme la chaîne de tags "bug, ui" en tableau ["bug", "ui"]
        const formattedData = {
            ...formData,
            tags: [
                ...new Set( // Le "Set" filtre les doublons
                    formData.tags
                        .trim()
                        .split(/[\s,]+/)
                        .filter((tag) => tag !== ""),
                ),
            ],
        }

        console.log("formattedData", formattedData)

        try {
            const response = await fetch("api/tickets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            })

            if (response.ok) {
                onTicketAdded() // Notifier le parent pour rafraîchir la liste
                onClose() // Fermer la modale
                setFormData({
                    title: "",
                    description: "",
                    priority: "Medium",
                    status: "Open",
                    tags: "",
                })
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout:", error)
        }
    }

    if (!isOpen) return null

    return (
        <div
            style={styles.overlay}
            onClick={handleOverlayClick}
        >
            <div style={styles.modal}>
                <h2 style={{ marginTop: 0 }}>Nouveau Ticket</h2>
                <form
                    onSubmit={handleSubmit}
                    style={styles.form}
                >
                    <input
                        placeholder="Titre"
                        style={styles.input}
                        required
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                    />
                    <textarea
                        placeholder="Description"
                        style={{ ...styles.input, height: "100px" }}
                        required
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                    />
                    <div style={styles.row}>
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
                        <input
                            placeholder="Tags (séparés par des virgules)"
                            style={styles.input}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    tags: e.target.value,
                                })
                            }
                        />
                    </div>
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
                            Créer le ticket
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
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "16px",
        width: "500px",
        color: "#333",
    },
    form: { display: "flex", flexDirection: "column", gap: "15px" },
    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "1rem",
        flex: 1,
    },
    row: { display: "flex", gap: "10px" },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginTop: "10px",
    },
    cancelBtn: {
        padding: "10px 20px",
        border: "none",
        background: "#eee",
        borderRadius: "8px",
        cursor: "pointer",
    },
    submitBtn: {
        padding: "10px 20px",
        border: "none",
        background: "#3498db",
        color: "white",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
    },
}

export default AddTicketModal
