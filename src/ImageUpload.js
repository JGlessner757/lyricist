import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
    // Define state variables
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [genre, setGenre] = useState('country');

    // Handle image selection
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    // Handle genre selection
    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    // Handle form submission
    const handleUpload = async (event) => {
        event.preventDefault();

        if (!image) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await axios.post(process.env.REACT_APP_AZURE_ENDPOINT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Ocp-Apim-Subscription-Key': process.env.REACT_APP_AZURE_KEY
                },
                params: {
                    'visualFeatures': 'Objects'
                }
            });

            const labels = response.data.objects.map(obj => obj.object).join(', ');
            generateSong(labels, genre);

        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    // Function to generate a song using OpenAI API
    const generateSong = async (labels, genre) => {
        const prompt = `You are in the role of an award winning songwriter, famous for the imagery and nostalgia in your lyrics. Write a new ${genre} song using the keywords ${labels}. Make the song fun and lively.`;

        try {
            const response = await axios.post("https://api.openai.com/v1/engines/davinci/completions", {
                prompt,
                max_tokens: 150
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
                }
            });

            const song = response.data.choices[0].text;
        navigate('/song', { state: { song, image } });
    } catch (error) {
        console.error("Error generating song:", error);
    }
};

    // Render the component
    return (
        <form onSubmit={handleUpload}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <select value={genre} onChange={handleGenreChange}>
                <option value="country">Country</option>
                <option value="pop">Pop</option>
                <option value="rock">Trop-Rock</option>
            </select>
            <button type="submit">Upload</button>
        </form>
    );
};

export default ImageUpload;

// Got a new error message!

