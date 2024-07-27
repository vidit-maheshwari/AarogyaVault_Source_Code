import cv2
import numpy as np
import pytesseract
from matplotlib import pyplot as plt
from flask import Flask, request, jsonify
import google.generativeai as genai
import os
import io
from PIL import Image
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  
# Configure Generative AI
genai.configure(api_key="AIzaSyDVGlH61CANH8ZHyNOJzYQJYq9pMEEDStI")
model = genai.GenerativeModel('gemini-1.5-flash')

# Function to convert an image from BGR to RGB for display
def display(image):
    plt.figure(figsize=(8, 6))
    plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    plt.axis('off')
    plt.show()

# Function to load an image from a file stream
def load_image_from_bytes(image_bytes):
    img = Image.open(io.BytesIO(image_bytes))
    img = np.array(img)
    if len(img.shape) == 2:  # Grayscale image
        img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
    elif img.shape[2] == 4:  # RGBA image
        img = cv2.cvtColor(img, cv2.COLOR_RGBA2BGR)
    return img

# Function for grayscale conversion
def grayscale(image):
    if len(image.shape) == 3:  # Check if image has 3 channels (BGR)
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    elif len(image.shape) == 2:  # Already grayscale
        return image
    else:
        raise ValueError("Unsupported image format")

# Function for binarization
def binarize(image):
    gray = grayscale(image)
    _, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    return binary

# Function to extract text from an image using Tesseract OCR
def extract_text(image):
    custom_config = r'--oem 3 --psm 6'  # Tesseract OCR configuration for single block of text
    text = pytesseract.image_to_string(image, config=custom_config)
    return text

# Function to process text with Generative AI
def process_with_genai(extracted_text):
    response = model.generate_content("Extract the useful information from the given text and provide suggestions to the user to work on the needed area of improvement \n" + extracted_text)
    return response.text

# API endpoint to process the image
@app.route('/process_image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']
    image_bytes = image_file.read()

    # Load the image
    img = load_image_from_bytes(image_bytes)

    # Preprocess the image (grayscale, binarize)
    gray = grayscale(img)
    binarized = binarize(gray)

    # Extract text from the binarized image
    extracted_text = extract_text(binarized)

    # Process the extracted text with Generative AI
    result_text = process_with_genai(extracted_text)

    return jsonify({'extracted_text': extracted_text, 'result_text': result_text})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)  # You can change the port number here
