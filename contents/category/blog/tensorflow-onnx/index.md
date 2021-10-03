---
title: 'Tensorflow ONNX'
date: '2021-10-02'
category: 'blog'
description: ''
emoji: ''
---

> 기본적인 사용법만을 작성한 글입니다. 

> 모델 성능 확인을 위해 MNIST 데이터로 학습하는 과정을 추가했습니다.

참고한 사이트

- [tensorflow-onnx](https://github.com/onnx/tensorflow-onnx)

## 목차

1.  MNIST 모델 학습 및 저장
2.  ONNX
    1.  tf2onnx 설치
    2. ONNX로 모델 변환
    3. ONNX로 추론하기
    4. 정확도 비교
    5. 속도 비교
    6. 조금 더 복잡한 CNN 모델 속도 비교
3.  결론



## MNIST 모델 학습 및 저장

```python
import tensorflow as tf

# 데이터 불러오기
(train_x, train_y), (test_x, test_y) = tf.keras.datasets.mnist.load_data()
train_x, test_x = train_x / 255.0, test_x / 255.0

# 모델 정의
model = tf.keras.Sequential(
    [
        tf.keras.layers.Flatten(input_shape=(28, 28)),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(10, activation='softmax')
    ]
)

# 학습 과정 설정
model.compile(
    loss='sparse_categorical_crossentropy',
    optimizer='adam',
    metrics=['accuracy']
)

model.fit(train_x, train_y) # 모델 학습

model.save('tf_model', include_optimizer=False) # 모델 저장
```

코드를 보면 특이한 점이 하나 있을 것이다. 제일 아래 `model.save`에 `include_optimizer=False`가 추가되었다. 없이 실행하면 다음과 같은 오류를 확인할 수 있다.

```bash
slot_variable = optimizer_object.add_slot(
AttributeError: '_UserObject' object has no attribute 'add_slot'
```

최적화 함수인 `optimizer`에 관련되어 있음을 확인하였고 [여기](https://www.python2.net/questions-1719470.htm)에서 힌트를 얻어 파라미터를 추가하니 문제없이 동작하였다.

## ONNX

#### 1. tf2onnx 설치

```bash
pip install -U tf2onnx

# 현재 나의 버전은 1.10.0
# 알고있겠지만 -U는 --upgrade와 같다.
```

#### 2. ONNX로 모델 변환

```bash
python -m tf2onnx.convert --saved-model tf_model --output model.onnx --opset 12
```

CLI로 모델을 변환할 수 있었다. 이전에 저장한 `tf_model` 을 `model.onnx` 로 변환한다. 또한 `opset` 이라는 인자가 있는데 정확한 의미는 잘 모르겠지만 ONNX의 버전이라고 생각하면 좋을 거 같다. 사용 가능한 버전 및 자세한 정보는 [여기](https://github.com/onnx/tensorflow-onnx#tf2onnx---convert-tensorflow-keras-tensorflowjs-and-tflite-models-to-onnx) 를 확인하면 된다


#### 3. ONNX로 추론하기

```python
import onnxruntime
from tensorflow.keras.datasets import mnist
import numpy as np

# 추론을 위한 MNIST 데이터 불러오기
(_, _), (test_x, test_y) = mnist.load_data()
# 학습시 입력과 데이터 형태를 맞춰주었다. 이전 학습시 float32는 하지 않았지만 자동적으로 변환되었던 부분이다.
test_x = (test_x / 255.0).astype('float32')

# 모델 불러오기
ort_model = onnxruntime.InferenceSession('model.onnx')
# 추론하기
result = ort_model.run(None, {'flatten_input': test_x[0:1]})[0]

print("predict: ", np.argmax(result))
print("real: ", test_y[0])

#   >>>
### predict:  7
### real:  7
```

이전에 보지 못했던 `flatten_input`이라는 것을 확인할 수 있다. 입력을 명확히 해주는 부분이라 이해했는데 이렇게 해주는 이유는 여러 다양한 라이브러리를 통해 만들어진 모델을 ONNX로 변환하다보니 문제가 될 수 있는 부분을 사전에 방지하기 위해서라고 생각한다.

그래서 저 부분에 필요한 `flatten_input` 이라는 key값은 다음의 코드의 결과에서 가져왔다

```python
input_names = [n.name for n in model.inputs]

### ['flatten_input']
```

당연히 모델이 변경되면 추론에 필요항 key값도 변경된다. 아래는 모델이 변경되었을 때의 예시이다. 참고만 하면된다.

```python
inputs = tf.keras.Input(shape=(28, 28))
x = tf.keras.Dense(128, activation='relu')(inputs)
outputs = tf.keras.Dense(10, activation='softmax')(x)

model = tf.keras.Model(inputs=inputs, outputs=outputs)

input_names = [n.name for n in model.inputs]

### ['input_1']
```

#### 4. 추론 정확도 비교

```python
import tensorflow as tf
import onnxruntime
from sklearn.metrics import accuracy_score
import numpy as np

(_, _), (test_x, test_y) = tf.keras.datasets.mnist.load_data()
test_x = (test_x / 255.0).astype('float32')

tf_model = tf.keras.models.load_model('tf_model')
ort_model = onnxruntime.InferenceSession('model.onnx')

tf_result = tf_model(test_x)
ort_result = ort_model.run(None, {'flatten_input': test_x})[0]

print("tf result: ", accuracy_score(np.argmax(tf_result, axis=1), test_y))
print("onnx result: ", accuracy_score(np.argmax(ort_result, axis=1), test_y))


#   >>>
### tf   result:  0.9584
### onnx result:  0.9584
```

성능의 변화가 전혀 없었다. 신기하네..

#### 5. 추론 속도 비교

```python
import tensorflow as tf
import onnxruntime
from sklearn.metrics import accuracy_score
import numpy as np
import time

(_, _), (test_x, test_y) = tf.keras.datasets.mnist.load_data()
test_x = (test_x / 255.0).astype('float32')

tf_model = tf.keras.models.load_model('tf_model')
ort_model = onnxruntime.InferenceSession('model.onnx')

tf_start = time.time()
for i in range(100):
    tf_model(test_x)
print("tf running time: ", time.time() - tf_start)

ort_start = time.time()
for i in range(100):
    ort_model.run(None, {'flatten_input': test_x})[0]
print("onnx running time: ", time.time() - ort_start)

#   >>>
### tf   running time:  1.4453675746917725
### onnx running time:  1.1688730716705322
```

약 10% 정도 ONNX가 더 빠르다고 볼 수 있다. 조금 더 복잡한 모델을 정의해서 테스트 해봐야겠다.

#### 6. 조금 더 복잡한 CNN 모델 속도 비교

```python
model = tf.keras.Sequential(
    [
        tf.keras.layers.Conv2D(32, kernel_size=(3, 3), activation="relu", input_shape=(28, 28, 1)),
        tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
        tf.keras.layers.Conv2D(64, kernel_size=(3, 3), activation="relu"),
        tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
        tf.keras.layers.Conv2D(64, kernel_size=(3, 3), activation="relu"),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(10, activation="softmax"),
    ]
)
```

나머지는 동일해서 작성하지 않겠다!!

결과는 약 2배 차이 🙌

```bash
tf   running time:  76.62953901290894
onnx running time:  36.256043434143066
```

## 결론

사실 이 ONNX를 사용하려던 주목적은 다양한 라이브러리(Tensorflow, PyTorch, Scikit-Learn, ---)로 만들어진 모델을 통일성있게 서빙하기 위함이였는데 이러한 장점뿐만 아니라 속도 테스트에서 봤다시피 약 두배정도 빠르다. 사용하지 않을 이유가 없을 것 같다. ~
