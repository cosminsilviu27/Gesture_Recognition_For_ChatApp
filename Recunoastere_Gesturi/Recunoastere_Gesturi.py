import cv2
import numpy as np
import os
from matplotlib import pyplot as plt
import time
import mediapipe as mp
 
import requests
import tensorflow as tf

print("TensorFlow version:", tf.__version__)

mp_holistic = mp.solutions.holistic  # Holistic model
mp_drawing = mp.solutions.drawing_utils  # Drawing utilities

# Function to send message via API
def send_message(user_id, reciever_id, message):
    url = "http://127.0.0.1:8000/api/send-messages/"
    data = {
        "user": user_id,
        "sender": user_id,
        "reciever": reciever_id,
        "message": message,
        "is_read": False
    }
    response = requests.post(url, data=data, headers=headers)
    return response

print("TensorFlow version: 1", tf.__version__)
# Function to get token
def get_token():
    url = "http://127.0.0.1:8000/api/token/"
    data = {
        "email": "cosminsilviuhatnean@gmail.com",
        "password": "password7!"
    }
    response = requests.post(url, data=data)
    if response.status_code == 200:
        return response.json()['access']
    else:
        print("Failed to get token:", response.status_code, response.text)
        return None

token = get_token()
if token is None:
    print("Exiting due to authentication failure")
    exit()

headers = {
    "Authorization": f"Bearer {token}"
}

print("TensorFlow version: 2", tf.__version__)

# Function to detect using Mediapipe
def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # COLOR CONVERSION BGR 2 RGB
    image.flags.writeable = False  # Image is no longer writeable
    results = model.process(image)  # Make prediction
    image.flags.writeable = True  # Image is now writeable 
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)  # COLOR COVERSION RGB 2 BGR
    return image, results

# Function to draw landmarks
def draw_landmarks(image, results):
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)  # Draw pose connections
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)  # Draw left hand connections
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)  # Draw right hand connections

# Function to extract keypoints
def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([pose, lh, rh])

# Function to visualize probabilities
def prob_viz(res, actions, input_frame, colors):
    output_frame = input_frame.copy()
    num_actions = len(actions)
    for num, prob in enumerate(res):
        prob_scalar = float(prob)
        print("Action:", actions[num], "Probability:", prob_scalar)
        cv2.rectangle(output_frame, (0, 60 + num * 40), (int(prob_scalar * 100), 90 + num * 40), colors[num % len(colors)], -1)
        cv2.putText(output_frame, actions[num], (0, 85 + num * 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
    return output_frame

from tensorflow.keras.models import load_model

# Load the model
model = load_model('action.h5')

# Actions that the model can detect
actions = np.array(['Call', 'Accepta', 'Revoca', 'DA', 'NU', 'Nu pot raspunde, revin', 'Nu pot raspunde, ce s-a intamplat'])

sequence = []
sentence = []
predictions = []
threshold = 0.99
current_action = None

cap = cv2.VideoCapture(0)

colors = [(245,117,16), (117,245,16), (16,117,245)]

# Set mediapipe model
with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
    while cap.isOpened():
        ret, frame = cap.read()
        image, results = mediapipe_detection(frame, holistic)
        draw_landmarks(image, results)
        
        keypoints = extract_keypoints(results)
        sequence.append(keypoints)
        sequence = sequence[-30:]
        
        if len(sequence) == 30:
            res = model.predict(np.expand_dims(sequence, axis=0))[0]
            print(actions[np.argmax(res)])
            predictions.append(np.argmax(res))
            
            for i, prob in enumerate(res):
                if prob > threshold: 
                    recognized_action = actions[i]
                    if recognized_action != current_action:
                        current_action = recognized_action
                        response = send_message(user_id=3, reciever_id=5, message=recognized_action)
                        print("Message sent:", response.json())
                    break
            
            image = prob_viz(res, actions, image, colors)
            
        cv2.rectangle(image, (0, 0), (640, 40), (245, 117, 16), -1)
        cv2.putText(image, ' '.join(sentence), (3, 30), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
        
        cv2.imshow('OpenCV Feed', image)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()
