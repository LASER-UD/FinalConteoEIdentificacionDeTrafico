# import the necessary packages
import numpy as np
import imutils
import cv2
from flask import Flask, render_template, Response
import sys

start_stream = False

app = Flask(__name__,template_folder='.')

camera = cv2.VideoCapture(0)

def gen_frames():
    global start_stream, camera  
    print("Peticion aceptada", file=sys.stderr)
    print(start_stream, file = sys.stderr)    
    while (True):
        print("corriendo", file=sys.stderr)
        success, frame = camera.read()  # read the camera frame
        if not success:
            print("Fallé", file=sys.stderr)
            break
        else:
            if(start_stream):
                ret, buffer = cv2.imencode('.jpg', frame)
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
            else:                
                yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + b'0' + b'\r\n\r\n')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/start')
def start():
    global start_stream    
    print("peticion start", file=sys.stderr)
    start_stream = True
    print(start_stream, file=sys.stderr)
    return Response(status=200)

@app.route('/stop')
def stop():
    global start_stream
    print("peticion stop", file=sys.stderr)    
    start_stream = False
    print(start_stream, file=sys.stderr)
    return Response(status=200)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3500)