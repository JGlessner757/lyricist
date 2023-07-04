import React, { useState } from 'react';
import axios from 'axios';


const ImageUpload = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);

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
                
                console.log(response.data); // log the response to see the objects detected
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
            

    return (
        <form onSubmit={handleUpload}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button type="submit">Upload</button>
        </form>
    );
  
    
    }
    
}

export default ImageUpload;
