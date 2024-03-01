from flask import Flask, request, render_template
from steganography import encode_message, decode_message

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/encode', methods=['POST'])
def encode():
    # Get the image file and message from the form
    image_file = request.files['image']
    message = request.form['message']

    # Perform steganography encoding
    encoded_image = encode_message(image_file, message)

    # You can return the encoded image or do something else with it
    return encoded_image

@app.route('/decode', methods=['POST'])
def decode():
    # Get the image file from the form
    image_file = request.files['image']

    # Perform steganography decoding
    decoded_message = decode_message(image_file)

    # You can return the decoded message or do something else with it
    return decoded_message

if __name__ == '__main__':
    app.run(debug=True)
