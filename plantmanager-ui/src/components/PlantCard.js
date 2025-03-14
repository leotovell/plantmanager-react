import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

const PlantCard = ({plant, showManageButton = false}) => {

    return (
        <Card style={{width: "18rem"}}>
        <Card.Img variant="top" src={plant.image} />
        <Card.Body>
            <Card.Title>{plant.name}</Card.Title>
            {plant.comments.map((comment) => (
                <Card.Text>{comment}</Card.Text>
            ))}
        </Card.Body>
        {showManageButton && 
            <Button variant="primary" onClick={() => nav(`/plant/${plant._id}`)}>Manage</Button>
        }
    </Card>
    )

}

export default PlantCard;