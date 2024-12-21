from dotenv import load_dotenv

load_dotenv()

import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


def detect(job):
    """
    Detects and generates new content based on the input post.

    Parameters:
        post (str): The post to detect and generate new content from.

    Returns:
        str: The newly generated content based on the input post.
    """
    # Create a gener    ative model for generating new content
    model = genai.GenerativeModel("gemini-pro")

    # Path to the file containing the prompt
    file_path = "./prompt.txt"

    # Read the content of the prompt file
    with open(file_path, "r", encoding="utf-8") as file:
        prompt = file.read()

    # Combine the prompt and the post to create input for the model
    input_text = prompt + str(job)

    # Generate new content based on the input
    response = model.generate_content(input_text)

    # Return the newly generated content
    return response.text
