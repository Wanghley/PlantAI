from keras.models import model_from_json
from keras.preprocessing.image import img_to_array
import numpy as np
import pickle, os, cv2, werkzeug, flask
import base64
from werkzeug.utils import secure_filename
import sqlite3
from sqlite3 import Error


# Global Variables and Constants
global model, labels, predict, database
DEFAULT_IMAGE_SIZE = tuple((256, 256))
UPLOAD_FOLDER = 'uploads/'
DB_PATH = 'database/PlantAI.db'
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
        json_file = open('model/model.json', 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        loaded_model = model_from_json(loaded_model_json)
        # load weights into new model
        loaded_model.load_weights("model/model.h5")
        model = loaded_model
        labels = pickle.load(open("model/labels.pkl", "rb"))


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

class DataBase():
    def __init__(self,path):
        self.conn = None
        try:
            self.conn = sqlite3.connect(path,check_same_thread=False)
        except Error as e:
            print(e)

    def selectPlant(self,plant):
        self.conn.row_factory = sqlite3.Row
        self.cur = self.conn.cursor()
        self.cur.execute("SELECT * FROM ESPECIE WHERE ID=?",(plant,))

        result = dict()

        for r in self.cur.fetchall():
            result.update(r)
        return result

    def selectCondition(self,condition_id):
        self.conn.row_factory = sqlite3.Row
        self.cur = self.conn.cursor()
        self.cur.execute("SELECT * FROM DOENCA WHERE ID=?",(condition_id,))

        result = dict()

        for r in self.cur.fetchall():
            result.update(r)
        return result
    
    def close(self):
        try:
            self.conn.cursor().close()
        except Exception as e:
            return flask.Response("Contact the system admin. ERROR code: failed to close db",status=500)

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


            metadata = dict(database.selectPlant(plant))
            diagnosis = dict(database.selectCondition(condition))

            #image processing
            image = metadata.get('IMAGE',None)
            with open("uploads/image.jpg", "wb") as binary_file:
                binary_file.write(image)
            # fh = open('uploads/image.jpg','rb')
            # image = fh.read()
            with open('uploads/image.jpg', 'rb') as binary_file:
                binary_file_data = binary_file.read()
                base64_encoded_data = base64.b64encode(binary_file_data)
                base64_message = base64_encoded_data.decode('utf-8')
            image = base64_message

            imageD = diagnosis.get('IMAGE',None)
            with open("uploads/imageD.jpg", "wb") as binary_file:
                binary_file.write(imageD)
            # fh = open('uploads/imageD.jpg','rb')
            # imageD = base64.b64encode(fh.read())
            with open('uploads/imageD.jpg', 'rb') as binary_file:
                binary_file_data = binary_file.read()
                base64_encoded_data = base64.b64encode(binary_file_data)
                base64_message = base64_encoded_data.decode('utf-8')
            imageD = base64_message

            result = {
                'STATUS':'success',
                'ID':plant,
                'ID_DIAG':condition,
                'SPECIE': metadata.get('NOME',None),
                'S_IMAGE': image,
                'DIAG': diagnosis.get('NOME',None),
                'DESC': diagnosis.get('DESCRICAO',None),
                'D_IMAGE': imageD,
                'CAUSE': diagnosis.get('CAUSAS',None),
                'TREAT': diagnosis.get('TRATAMENTOS',None),
                'INFO': diagnosis.get('INFOS',None)
            }
            
            database.close()

            if os.path.exists(f_path):
                os.remove(f_path)
            if os.path.exists('uploads/image.jpg'):
                os.remove('uploads/image.jpg')
            if os.path.exists('uploads/imageD.jpg'):
                os.remove('uploads/imageD.jpg')

            resp = flask.jsonify(result)
            resp.status_code=202

            return resp



if __name__ == '__main__':
    global predict, database
    database = DataBase(DB_PATH)
    predict = Prediction()
    app.run(port=8000, debug=True)