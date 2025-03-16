import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlantCard from "../components/PlantCard";

const Plant = () => {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPlant() {
            try {
                const res = await fetch(
                    process.env.REACT_APP_API_URL + `/api/plants/${id}`,
                    {
                        credentials: "include",
                    }
                );
                if (!res.ok) {
                    throw new Error("Plant not found");
                }
                const data = await res.json();
                setPlant(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchPlant();
    }, [id]);

    if (loading) return <p>Loading</p>;
    if (error) return <p>Error: {error}</p>;

    // Check if the current visitor is the owner

    return (
        <>
            <p>This is the plants page!</p>
            <PlantCard plant={plant} showManageButton={false} />
        </>
    );
};

export default Plant;
