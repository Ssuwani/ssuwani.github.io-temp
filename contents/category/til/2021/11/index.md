---
title: '[TIL] 2021.11.14 일'
date: '2021-11-14'
category: 'til'
description: ''
emoji: '📚'
---

### Done

- [x]  백준 알고리즘 1문제 풀기
- [x]  파이썬 알고리즘 인터뷰 4장 - 빅오, 자료형 104p → 120p
- [x]  파이썬 알고리즘 인터뷰 5장 - 리스트와 딕셔너리 121p → 135p
- [x]  머신러닝 디자인 패턴 2.1 - 간단한 데이터 표현
- [x]  머신러닝 디자인 패턴 2.2 - 디자인 패턴 1: 특정 해시
- [x]  머신러닝 디자인 패턴 2.3 - 디자인 패턴 2: 임베딩
- [x]  머신러닝 디자인 패턴 2.4 - 디자인 패턴 3: 특징 교차

## **11:10 ~ 11:50 알고리즘 1문제 풀기**

**백준 피보나치 함수**

https://ssuwani.github.io/category/algorithm/boj/dp/fibo/

## 11:50 ~ 12:50 파이썬 알고리즘 인터뷰 4장 - 빅오, 자료형

### **임의 정밀도**

파이썬에서 엄청 큰 수도 오버플로우 없이 저장할 수 있는데 이는 사실 임의 정밀도 정수형으로 변환해서 저장되는 것이다.

아주 큰 수는 다음과 같이 3개의 정수로 변환한 뒤 저장된다.

$$123456789101112131415 = 437976919 * 2^{30*0} + 87719511 \* 2^{30*1} + 107 * 2^{30*1}$$

```python
import ctypes

class PyLongObject(ctypes.Structure):
    _fields_ = [("ob_refcnt", ctypes.c_long),
                ("ob_type", ctypes.c_void_p),
                ("ob_size", ctypes.c_ulong),
                ("ob_digit", ctypes.c_uint * 3)]

bignum = 123456789101112131415

for d in PyLongObject.from_address(id(bignum)).ob_digit:
    print(d)
```

### 가변객체와 불변객체

**파이썬의 모든것은 객체이며 불변 객체와 가변 객체로 나뉜다. 대표적으로 파이썬의 시퀀스 중 문자열, 튜플, 바이트는 불변 자료형이고 리스트는 가변 자료형이다. 그리고 추가적으로 숫자와 문자도 불변 객체이다.**

```python
a = 10
b = a
a = 9
print(b)
```

위의 예제의 결과는 10이 나온다. 파이썬에서 문자와 숫자도 불변 객체이다. a는 10이라는 객체를 참조했고 `b=a` 를 통해 b도 10을 참조했다. `a=9` 에서  10이라는 값이 9로 바뀐것이 아니라 a가 9를 참조했다. 따라서 10을 참조하고 있던 b는 여전히 10을 참조하고 있다.

그렇다면 아래는 어떨까?

```python
a = [1,2,3,4]
b = a
a[1] = 100
print(b)
```

위의 예제는 문제없이 실행되었다는 것만 알아도 출력은 [1, 100, 3, 4]가 나오는 것을 짐작할 수 있다. 파이썬에서 리스트는 가변 시퀀스 객체이기 때문이다. 값이 바뀔 수 있다. 그렇다면 이건 어떨까?

```python
a = [1,2,3,4]
b = a
a = [1,100,3,4]
print(b)
```

조금 헷갈릴 수 있지만(나만 헷갈릴수도 있지만...) 출력값은 [1,2,3,4]이다. a가 처음 참조하는 [1,2,3,4]는 새롭게 정의된 리스트이다. 그리고 `a=b` 를 통해 b 또한 [1,2,3,4]를 참조했다. 그런데 a에 **새롭게 정의된** 리스트가 할당되었다. 기존의 리스트가 변한게 아니라 새로운 리스트가 생성되었다는 게 중요하다.

### **is와 ==**

is는 id() 값을 비교하는 함수, ==은 값을 비교하는 연산

```python
a = [1, 2, 3, 4]

a == list(a) # True
a is list(a) # False

a == copy.deepcopy(a) # True
a is copy.deepcopy(a) # False
```

## 12:50 ~ 13:40 파이썬 알고리즘 인터뷰 5장 - 리스트, 딕셔너리

### 리스트

파이썬의 리스트는 연속된 공간에 요소를 배치한다. 확인해보자

```python
a_list = [1,2,3,4]
for a in a_list:
    print(id(a))

# 4368410928
# 4368410960
# 4368410992
# 4368411024
```

CPython에서 리스트는 요소에 대한 포인터 목록을 갖고 있는 구조체로 선언되어 있다. 리스트는 객체로 되어 있는 모든 자료형을 포인터로 연결한다. 사실상 연결 리스트에 대한 포인터 목록을 배열 형태로 저장하고 있다. 덕분에 파이썬의 리스트는 배열과 연결 리스트를 합친 듯이 강력한 기능을 자랑한다.

→ 사실 정확하게 이해가 되는 것은 아니나 어떤 의미인지는 알 것 같다. 위의 예시에서 a_list에 있는 각각의 자료형이 가지고 있는 ID 값이 포인터의 주소이고 그 주소들을 리스트가 관리해주는 것이라고 이해했다.

앞선 예제에서 `a_list` 안에 있는 `a` 값들은 연속된 메모리 공간에 저장되었었다. 하지만 파이썬의 리스트에는 다양한 타입을 동시에 저장할 수 있다. 그러나 각 자료형의 크기는 저마다 서로 다르기 때문에 연속된 메모리 공간에 할당하는 것은 불가능하다. 결국 각각의 객체에 대한 참조로 구현할 수 밖에 없다. 그래서 리스트의 인덱스에 접근하기 위해선 포인터의 위치에 찾아가서 타입 코드를 확인하고 값을 일일이 살펴봐야 한다. → 편리한 대신 느리다.

### 딕셔너리

인덱스를 숫자로만 지정할 수 있는 리스트와 달리 딕셔너리는 해시할 수 있는 모든 불변 객체(숫자형, 문자형, 튜플)를 키로 사용할 수 있다. → 이 과정을 해싱이라고 한다.

**defaultdict**

```python
from collections import defaultdict

a = defaultdict(int)
a["A"] += 1
print(a)
# defaultdict(<class 'int'>, {'A': 1})
```

**Counter**

```python
from collections import Counter

a = [1,2,2,3,3,3]

b = Counter(a)
b # Counter({3: 3, 2: 2, 1: 1})

b.most_common(2) # [(3, 3), (2, 2)]
b.most_common(1) # [(3, 3)]
```

**OrderDict**

파이썬 3.7 이하의 딕셔너리에서 입력 순서가 유지되지 않았다.

파이썬 2에서 테스트해보자

```python
# Python 2.7.18

a = dict()
a[2] = 2
a[1] = 1
a # {1: 1, 2: 2}
```

입력한 순서가 유지되지 않는 것을 확인할 수 있다.

파이썬 3에서 테스트해보자.

```python
# Python 3.9.7

a = dict()
a[2] = 2
a[1] = 1
a # {2: 2, 1: 1}
```

만약 실행환경이 3.7 이상인지 정확히 확인이 안된다면 위의 방법대로 하고 순서가 유지되기를 바라면 안된다. 안전하게 OrderDict를 사용하자

```python
from collections import OrderedDict

a = OrderedDict()
a[2] = 2
a[1] = 1
a # OrderedDict([(2, 2), (1, 1)])
```

## 13:40 ~ 14:10 머신러닝 디자인 패턴 2.1 - 간단한 데이터 표현

**2.1.1. 수치입력**

**스케일링이 필요한 이유**

특징의 상대적인 크기가 더 크다면 미분도 큰 경향이 있다.

k-mean clustering 와 같은 알고리즘은 크기가 더 큰 특징에 크게 의존한다.

**스케일링 하는 방법**

- Min-Max Scaling → 아웃라이어 떄문에 문제될 수 있다.
- 클리핑 → 최솟값, 최댓값 대신에 합리적인 값을 사용한다
- Z 점수 정규화 → 평균과 표준편차를 이용해 선형적으로 스케일링 `x1_scaled = (x1 - mean_x1)/stddev_x1`
- 윈저라이징

→ 데이터의 분포에 따라 사용한 스케일러를 선택할 수 있어야한다.

아웃라이어를 버리지마라! → 프로덕션 환경에서 이러한 이상값을 만나지 않으리라는 보장이 없기 때문

다시 말하면 무효한 입력은 버리되 유효한 입력은 버리지 마라

데이터가 균등하게 분포되어 있지 않거나 종형 곡선처럼 분포되지 않았다면 입력에 Log 변환같은 비선형 변환을 적용하는 것이 좋다.

**2.1.2 카테고리 입력**

변수의 독립성을 유지하면서 카테고리형 변수를 매핑하는 가장 간단한 방법은 원-핫 인코딩이다.

경우에 따라서는 수치 입력을 카테고리형으로 처리하고, 이를 원-핫 인코딩한 열에 매핑하는 것이 도움이 될 수 있다.

수치입력이 인덱스인 경우 카테고리형으로 처리하는 것이 좋다 (예를들어 요일 1,2,3,4,5,6,7)

입력과 라벨의 관계가 연속적이지 않을 때 카테고리형으로 처리하는 것이 좋다 (금요일의 교통량과 토요일의 교통량은 관계가 없다)

## 14:10 ~ 15:00 머신러닝 디자인 패턴 2.2 - 디자인 패턴 1: 특정 해시

콜드 스타트 문제를 해결하기 위해 별도의 서빙 인프라가 필요할 수도 있구나.. !

학습 시 사용된 어휘 외 입력을 처리하기 위해 Farm Fingerprint 함수를 사용할 수 있다. 검색해도 많은 정보가 없지만 책을 읽고 이해한 내용은 카테고리를 카테고리로 묶는 느낌이다.

a, b, c, d, e, f 라는 카테고리가 있다면 각 카테고리를 해시화 해서 그룹으로 묶는다. 그래서 a, e, f가 하나의 그룹으로 묶이고 b, c, d가 하나의 그룹으로 묶였다고 가정하면 z라는 새로운 카테고리가 입력되면 해시화 했을 때 두개의 카테고리 중 하나에 속하게 된다;.

콜드 스타트와 관련해서 처음 입력되는 카테고리는 특정 해시 카테고리에 속하게 되어 결과를 안좋게 낼 것이다. 하지만 **모델을 주기적으로 재학습** 한다면 새로운 데이터에 대한 예측을 제대로 할 수 있을 것이다.

콜드 스타트가 문제되지 않는다면(카테고리에 대해 다 알고 있다면 ex) 월, 화, 수, 목, 금, 토, 일) 특징 해시를 쓰지 않는 것이 좋다.

특징 해시를 사용하기 위해선 해시 카테고리의 수 즉 버킷의 수를 정해야 히는데 버킷의 수에 따라 다양한 충돌(문제)가 발생할 수 있다. 따라서 버킷의 수를 하이퍼파라미터로 설정하여 튜닝을 진행하는 것을 권장한다.

## 17:50 ~ 20:20 머신러닝 디자인 패턴 2.3 - 디자인 패턴 2: 임베딩

카테고리형 데이터를 원-핫 인코딩을 사용해 학습 가능한 데이터로 변환할 수 있지만 이는 데이터간의 종속성을 완전히 무시한 변환이다.

이미지 데이터에서 각 픽셀은 서로 독립적이지 않고, walk라는 단어는 book보다 run에 더 가깝다.

임베딩은 고차원의 카테고리형 입력 변수를 저차원 공간의 실수 벡터로 매핑한다.

임베딩 계층의 가중치는 훈련 중에 파라미터로 학습된다.

이미지 임베딩에서 ImageNet으로 학습된 CNN 모델에 최종 소프트맥스 분류기 계층이 없으면 모델을 사용하여 주어진 입력에 대한 특징 벡터를 추출할 수 있다. 이 특징 벡터는 이미지의 모든 관련 정보를 포함하므로, 입력 이미지의 저차원 임베딩에 해당한다.

임베딩 계층의 출력 차우너이 너무 작으면 많은 정보가 작은 벡터 공간에 강제로 들어가 콘텍스트 정보가 손실될 수 있다. 반면에 임베딩 차원이 너무 크면 임베딩의 특징 각각의 중요성을 잃게 된다. 원-핫 인코딩은 임베딩 차원이 극단적으로 큰 예시라고 할 수 있다.

→ 최적의 임베딩 차원 수를 찾아야 한다. 시간을 아끼기 위해 경험적으로 나온 몇가지 규칙을 사용할 수 있다.

1. 고유한 카테고리형 원소 총수의 네제곱근을 한다
2. 임베딩 차원이 고유한 카테고리형 원소 총 수 제곱근의 약 1.6배여야 한다.

1과 2의 범위내에서 찾아보는 것이 좋다.

...

중간중깐 멈추는 일들이 있었지만 늦은 이유는 제대로 이해를 못해서이다 ㅠㅠ. 데이터 웨어하우스, 콘텍스트 언어모델에 대한 개념이 약한 것 같다! 그래도 각각을 모른다고 깊게 들어가기보단 전반적인 흐름을 보고 다시와서 읽어보자

## 20:20 ~ 21:00 머신러닝 디자인 패턴 2.4 - 디자인 패턴 3: 특징 교차

특징교차: 카테고리형 변수를 처리하는 방법

특징 교차 디자인 패턴은 입력값의 각 조합을 별도의 특징으로 명시적으로 만들어, 모델이 입력 간의 관계를 더 빨리 학습하도록 도와준다.

두 특징을 결합하면 비선형성을 모델 안에서 인코딩할 수 있으며, 이를 통해 각 특징이 개별적으로 제공할 수 있었던 것 이상의 예측을 가지게 된다. 결과적으로 특징 교차는 모델 학습 속도를 높여 비용을 절감하고, 모델 복잡성을 줄여 필요한 학습 데이터를 줄일 수 있다.

특징 교차만을 사용하면 저밀도 벡터를 생성하게 될 수 있다. 이때는 특징 교차의 결과를 임베딩 계층으로 보내서 저차원 벡터를 만들 수도 있다.

위도와 경도 같은 공간에 대한 특징 교차를 진행하면 카디널리티가 매우 크기 때문에 오버피팅된다. 이를 막기위해 특징 교차를 수행한 후 특징의 밀도를 높이는 L1 정규화 혹은 과대적합을 제한하는 L2 정규화와 함께 쓰는 것이 좋다.

상관관계가 높은 두 특징을 교차하는 방식은 권하지 않는다. 두 특징의 상관관계가 높으면 특징 교차의 결과물이 모델에 새로운 정보를 가져다주지 못하기 때문