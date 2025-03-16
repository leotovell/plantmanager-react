import { useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import PlantCard from "../components/PlantCard";

const Features = () => {
    const [show, setShow] = useState(false);
    const [plantName, setPlantName] = useState("");
    const [plantImage, setPlantImage] = useState(null);
    const [comments, setComments] = useState([""]);
    const [plants, setPlants] = useState([]);

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const addComment = () => {
        setComments([...comments, ""]);
    };

    const removeComment = (index) => {
        const newComments = comments.filter((_, i) => i !== index);
        setComments(newComments);
    };

    const handleCommentChange = (index, value) => {
        const newComments = [...comments];
        newComments[index] = value;
        setComments(newComments);
    };

    const addPlant = () => {
        console.log(plantName, plantImage, comments);

        const formData = new FormData();
        formData.append("name", plantName);
        formData.append("image", plantImage);
        formData.append("comments", JSON.stringify(comments));

        fetch(process.env.REACT_APP_API_URL + "/api/plants/new-plant", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

    const fetchAllPlants = async () => {
        fetch(process.env.REACT_APP_API_URL + "/api/plants/all", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPlants([...plants, ...data]);
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <p>Features</p>
            <Button variant="success" onClick={handleOpen}>
                Add Plant
            </Button>

            <Button variant="secondary" onClick={fetchAllPlants}>
                Fetch All (Console)
            </Button>

            {plants.map((plant) => (
                <PlantCard
                    key={plant._id}
                    plant={plant}
                    showManageButton={true}
                />
            ))}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Plant</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please fill in the following:</Modal.Body>

                <Form className="mx-3">
                    <Form.Group className="mb-3" controlId="plantNameControl">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Monstera Deliciosa"
                            value={plantName}
                            onChange={(e) => setPlantName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="plantImageControl">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={(e) => setPlantImage(e.target.files[0])}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="plantCommentsControl"
                    >
                        <Form.Label>Comments</Form.Label>
                        {comments.map((comment, index) => (
                            <InputGroup key={index} className="mb-2">
                                <Form.Control
                                    type="text"
                                    value={comment}
                                    onChange={(e) =>
                                        handleCommentChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                                {index > 0 && (
                                    <Button
                                        variant="secondary"
                                        onClick={() => removeComment(index)}
                                    >
                                        -
                                    </Button>
                                )}
                            </InputGroup>
                        ))}
                        <Button variant="secondary" onClick={addComment}>
                            New Comment
                        </Button>
                    </Form.Group>
                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            addPlant();
                            handleClose();
                        }}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Features;
