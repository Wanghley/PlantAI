from keras.models import model_from_json
from keras.preprocessing.image import img_to_array
import numpy as np
import pickle, os, cv2, werkzeug, flask
from werkzeug.utils import secure_filename


# Global Variables and Constants
global model, labels, predict
DEFAULT_IMAGE_SIZE = tuple((256, 256))
UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_CONTENT_PATH = 5242880  # 5MB

# App iniciation
app = flask.Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_PATH'] = MAX_CONTENT_PATH


class Prediction():
    def __init__(self):
        global model, labels
        # load json and create model
        json_file = open('../model/model.json', 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        loaded_model = model_from_json(loaded_model_json)
        # load weights into new model
        loaded_model.load_weights("../model/model.h5")
        model = loaded_model
        labels = pickle.load(open("../model/labels.pkl", "rb"))


    def convert_image_to_array(self,image_dir):
        try:
            image = cv2.imread(image_dir)
            if image is not None:
                image = cv2.resize(image, DEFAULT_IMAGE_SIZE)
                return img_to_array(image)
            else:
                return np.array([])
        except Exception as e:
            print(f"Error : {e}")
            return None


    def predict_disease(self,image_path):
        image_array = self.convert_image_to_array(image_path)
        np_image = np.array(image_array, dtype=np.float16)/225.0
        np_image = np.expand_dims(np_image, 0)

        result = model.predict_classes(np_image)
        return labels.classes_[result][0]



def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if flask.request.method == 'POST':
        if 'image' not in flask.request.files:
            return flask.Response("{error:'no image was sent. Could not identify the key in the request'}", status=400, mimetype='application/json')
        f = flask.request.files['image']
        if f.filename == '':
            return flask.Response("{error:'image was not selected.'}", status=400, mimetype='application/json')
        if f and allowed_file(f.filename):
            filename = secure_filename(f.filename)
            f_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            f.save(f_path)

            plant, condition = predict.predict_disease(f_path).split('___')

            result = {
                'status':'success',
                'plant':plant,
                'condition':condition
            }

            resp = flask.jsonify(result)
            resp.status_code=202

            return resp



if __name__ == '__main__':
    global predict
    predict = Prediction()
    app.run(port=8000, debug=True)
