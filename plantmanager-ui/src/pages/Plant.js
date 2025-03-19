import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlantCard from "../components/PlantCard";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Plant = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const deletePlant = async () => {
    const res = await fetch(
      process.env.REACT_APP_API_URL + `/api/plants/${id}`,
      {
        method: "delete",
        credentials: "include",
      }
    );
    console.log(res);
    if (res.ok) {
      toast.success("Your plant was deleted.");
      nav("/features");
    } else {
      toast.error(
        "Whoops, something went wrong and your plant was not deleted."
      );
    }
  };

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
      <Button variant="danger" onClick={() => deletePlant()}>
        Delete
      </Button>
    </>
  );
};

export default Plant;
