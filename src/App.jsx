import React from "react"
import Stats from "./components/Stats"

function App() {
    return (
        <div
            style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "40px 20px",
            }}
        >
            <header style={{ marginBottom: "40px" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    Dashboard Tickets
                </h1>
            </header>

            {/* Ton nouveau composant */}
            <Stats />

            {/* La suite (Liste des tickets) viendra ici */}
        </div>
    )
}

export default App
