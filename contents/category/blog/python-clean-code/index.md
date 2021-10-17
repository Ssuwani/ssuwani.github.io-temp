---
title: '[책] 파이썬 클린코드 ❗[미완]❗'
date: '2021-10-03'
category: 'blog'
description: ''
emoji: '📚'
---

[[info | 책 "파이썬 클린코드"를 읽고 내용을 정리햇습니다. ]]

<br/>
<br/>

"소프트웨어 문제를 해결하는데 단 **하나의 솔루션만 있는 것은 아니다**" Trade off 가 있는 경우가 많은데 이럴 때 하나의 원칙을 따라가야한다. 책을 읽으면 하나의 원칙을 배울 수 있을 것이다.

> 하지만 정답이라는 것은 없다. **책을 읽고 동의하지 않아도 좋다.** 발전적인 토론을 통해 다양한 의견을 검토하는 것을 권장한다!!

## 목차 (❗❗❗ 아직 작성 중인 글입니다.)

1. 소개, 코드 포매팅과 도구 ✅
2. 파이썬스러운(Pythonic) 코드 ✅
3. 좋은 코드의 일반적인 특징 🔳
4. SOLID 원칙 🔳
5. 데코레이터를 사용한 코드 개선 🔳
6. 디스크립터로 더 멋진 객체 만들기 🔳
7. 제너레이터 사용하기 🔳
8. 단위 테스트와 리팩토링 🔳
9. 일반적인 디자인 패턴 🔳
10. 클린 아키텍처 🔳

<br/>

[[info | 예제 코드 다운로드 ]]
| https://github.com/PacktPublishing/Clean-Code-in-Python

<br/>

# CH1. 소개, 코드 포매팅과 도구

- 프로그래밍 언어의 진정한 의미는 아이디어를 다른 개발자에게 전달하는 것이다.

- 기술부채의 가장 안 좋은 점은, 장기적이고 근본적인 문제를 내포하고 있는 것이다.

- 주석은 가급적 피해야한다. 

- 코드안에서 직접 문서화 하는 방법: Docstring, Annotation

    

    

## Docstring

소스 코드에 포함된 문서, 코드의 특정 컴포넌트(모듈, 클래스, 메서드 또는 함수)에 대한 문서화

```python
def add(a, b):
  """This functions is intented to return the sum of two integer values
  
  :param int a: An integer to be computed
  :param int b: An integer to be computed
  :returns: The sum of two integer values
  """
  return a + b
```



주석은 코드로 아이디어를 제대로 표현하지 못했음을 나타내는 것이다.

프로젝트 문서화를 위한 기본 골격을 만들어주는 도구: Sphinx, autodoc

## Annotation

함수의 인자로 어떤 값이 와야 하는지 힌트를 주는 것

```python
def add(a: int, b: int) -> int:
    return a + b
```

# CH2. 파이썬스러운(pythonic) 코드

고유한 관용구 -> "일반적으로" 더 좋은 성능을 낸다. 

## 인덱스와 슬라이스

```python
my_nums = [1, 2, 3, 4]

my_nums[0:2] # [1, 2]
my_nums[0:3:2] # [1, 3]
```

#### **자체 시퀀스 생성**

파이썬에서는 리스트, 튜플, range, 문자열처럼 값이 연속적으로 이어진 자료형을 시퀀스 자료형(*sequence* types)라고 부른다. 

바로 위에서 인덱싱과 슬라이싱은 시퀀스 객체에서 `__getitem__`, `__len__` 을 구현되어 있기 때문에 사용가능했던 것이다. key 값으로 객체의 특정 요소를 가져오도록 하는것이 `__getitem__` 인데 이를 시퀀스 객체 아닌 경우에도 사용하도록 해보자.

1. 시퀀스 객체를 감싸는 래퍼 클래스(캡슐화)

    ```python
    class Items:
        def __init__(self, *values):
            self._values = list(values)
        def __len__(self):
            return len(self._values)
        def __getitem__(self, item):
            return self._values.__getitem__(item)
    ```

    values를 불러와 list로 즉, 시퀀스 데이터로 만들고 시퀀스 객채에서 기본적으로 제공되는 len과 getitem을 사용한 것이다.  values가 시퀀스 객체가 아니더라도 key 값을 통해 특정 객체의 요소를 가져올 수 있는 것이다.

2. collections.UserList 부모 상속

    그렇다고 하는데 이해가 잘 되지는 않는다. ㅠㅠ 

3. 자신만의 시퀀스를 구현 

    - 범위로 인덱싱하는 결과는 해당 클래스와 같은 타입의 인스턴스여야 한다. (인덱싱했는데 갑자기 다른 타입이 나오면 안돼!! )
    - slice에 의해 제공된 범위는 파이썬이 하는 것처럼 마지막 요소는 제외해야 한다.

    

## **컨텍스트 관리자**

주요 동작의 전후에 특정 작업을 꼭 실행하려면 어떻게 해야할까?

```python
f = open(filename)

~ blah blah ~

f.close()
```

위의 코드는 file을 읽고 f에 할당하며 어떠한 일을 한다. 이후에 f에 할당된 리소스를 해제해준다. 이때 만약 blah에서 오류가 발생한다면?? f의 리소스는 해제되지 못하고 메모리에 남아 문제를 일으킬 수 있다. 그래서 다음과 같은 코드로 개선이 가능하다.

```python
f = open(filename)
try:
  ~ blah blah ~
finally:
  f.close()
```

하지만 귀찮고 파이써닉 하지않다! 아래의 코드로 멋있게 구현이 가능하다.

```python
with open(filename) as f:
  ~ blah blah ~
```

with 문은 컨텍스트 관리자로 진입하게 한다. 어려운말로 open 함수는 컨텍스트 관리자 프로토콜을 구현한다.



컨텍스트 관리자는 `__enter__`, `__exit__` 두개의 매직 메소드로 구성된다. 특정 코드의 시작과 끝에서 각각 두개의 함수가 실행된다고 이해하면 간단할 것 같다.



그래서 `__enter__`, `__exit__`를 커스텀해서 주요코드의 앞뒤로 실행되게 할 수 있다.

```python
from datetime import datetime
class TimeHandler:
    def __enter__(self):
        print("start: ", datetime.now())
    def __exit__(self, exc_type, ex_value, ex_traceback):
        print("end: ", datetime.now())

with TimeHandler():
    print("Hello~ suwan")
```

실행결과

```
start:  2021-10-17 11:36:59.408708
Hello~ suwan
end:  2021-10-17 11:36:59.408927
```



위의 TimeHandler에서 `__exit__` 함수를 보면 `exc_type`, `ex_value`, `ex_traceback` 을 확인할 수 있다. 함수가 실행되다가 문제가 발생하면 변수에 저장된다. 또한 코드에 문제가 발생하더라도 `__exit__`는 문제없이 실행되는 것을 아래의 코드로 확인할 수 있다.

```python
with TimeHandler():
    print("Hello~ suwan")
    raise NameError("Error")
```

실행결과

```
start:  2021-10-17 11:40:31.713844
Hello~ suwan
end:  2021-10-17 11:40:31.713978 <- 문제가 발생했지만 실행되었다!
Traceback (most recent call last):
  File "<stdin>", line 3, in <module>
NameError: Error
```



> 주의할 점: `__exit__` 에서 `True` 를 반환하게 하면 Error가 발생하더라도 에러를 반환하지 못한다.



책에서 `contextlib` 를 이용해서 위와 같은 일을하는 두가지 방법을 소개한다. 하나는 `Handler` 클래스를 정의하지 않고 함수 단위에서 제너레이터를 이요한 방법이고 또 하나는 `Handler` 클래스를 `contextlib.ContextDecorator`를 상속하여 정의하고 with 문 대신 데코레이터를 사용하는 방법이다.  두가지 방식의 장점이 명확하고 책에 설명되어 있지만 따로 정리하지는 않았다.

## 프로퍼티, 속성과 객체 메서드의 다른 타입들

#### 파이썬에서의 밑줄

java, cpp, c# 등에선 `public`, `private`, `protected` 를 통해 프토퍼티들의 공개 범위를 지정할 수 있다. 하지만 파이썬에선 모든 것이 `public` 이다. 단지 몇가지 규칙사항이 있을 뿐이다. 강제하는 것은 아니다.



아래의 코드가 많은 것을 대신 설명해주리라 생각한다.

```python
class A:
    def __init__(self):
        self.a = 1
        self._b = 2
        self.__c = 3
        
a = A()
vars(a)

>>> {'a': 1, '_b': 2, '_A__c': 3}
```

밑줄로 시작하는 속성은 해당 객체에서 private를 의미하고 호출되지 않기를 원하지만 말그대로 원할 뿐이다. 호출하려면 호출할 수 있다. 그리고 많은 사람들이 헷갈려하는 부분이 밑줄 두개에 대한 부분이다. 위의 예에서 보다시피 함수명 앞에 밑줄 두개를 넣으면 파이썬이 다른 이름으로 속성을 만든다. 이를 **맹글링(name mangling)**이라 한다. 

이중 밑줄을 사용하면 조금은 복잡하게 함수명이 만들어지니 private한 속성를 정의했다고 말할수도 있겠지만 사실 이는 파이써닉하지 못하다. 맹글링은 사실 여러 번 확장되는 클래스의 메서드를 이름 충돌 없이 오버라이드하기 위해 만들어졌기 때문이다. 

따라서 속성를 private으로 정의하려면 밑줄 하나만을 사용하고 파이썬스러운 관습을 지키도록하자!

#### **프로퍼티**

객체의 값을 저장할 때 일반적으로 속성을 사용한다. 때로는 객체의 속성을 기반으로 다른 속성을 계속하고자 할 때도 있다. 이때 `프로퍼티`를 사용하는 것은 좋은 선택이다. 예제를 보면 조금 더 빠르게 이해가 된다.

```python
import re

EMAIL_FORMAT = re.compile(r"[^@]+@[^@]+[^@]+")

def is_valid_email(potentially_valid_email: str):
    return re.match(EMAIL_FORMAT, potentially_valid_email) is not None

class User:
    def __init__(self, username):
        self.username = username
        self._email = None

@property
def email(self):
    return self._email
  
@email_setter
def email(self, new_email):
    if not is_valid_email(new_email):
        raise ValueError("유효한 이메일이 아님")
		self._email = new_email
  
```

email 이라는 속성에 값을 넣을건데, 넣을 때 추가적으로 유효성 검사를 거치는 예제이다. 이를 `property` 가 아닌 방법으로 구현하려면 새로운 메소드(set_)를 만들어줘야 하는데 이는 실제 코드가 무엇을 하는지 혼돈스럽고 어려운 경우를 초례할 수 있다. 객체의 속성에 값을 부여하는 것과 적절성을 판단하는 것은 같은 맥락에서의 이야기이다.  관련해서 아래의 중요한 조언이 이야기된다.

> 메서드는 한 가지만 수행해야 한다. 작업을 처리한 다음, 상태를 확인하려면 메서드를 분리해야 한다.



## 이터러블 객체

파이썬에서 list, tuple, set, dict는 기본적으로 for 루프를 통해 반복적으로 값을 가져올 수 있다. 즉 iterable하다.

그러나 이외에도 직접 iterable한 객체를 만들 수 있다. iterable은 `__iter__` 매직 메서드를 구현한 객체, 이터레이터는 `__next__` 매직 메서드를 구현한 객체를 말한다.

파이썬에서 객체를 반복할 수 있는지 확인하기 위해 두가지 과정을 순차적으로 거친다.

1. 객체가 `__next__` 나 `__iter__` 이터레이터 메서드 중 하나를 포함하는지 여부
2. 객체가 시퀀스이고 `__len__` 과 `__getitem__` 를 모두 가졌는지 여부



두가지 방법에 대해 기본 구현을 해보았다.

```python
# __iter__ 를 활용
class Iterable_iter():
		def __init__(self):
				self.values = [1,2,3,4]
				self._idx = 0
		def __iter__(self):
				while self._idx != len(self.values):
						yield self.values[self._idx]
						self._idx += 1
            
i_obj = Iterable_iter()
for i in i_obj:
    print(i)
    
>>>
1
2
3
4
```



```python
# __getitem__ 를 활용
class Iterable_getitem:
    def __init__(self):
        self.values = [1, 2, 3, 4]
    def __len__(self):
        return len(self.values)
    def __getitem__(self, i):
        return self.values[i]
      
i_obj = Iterable_getitem()
for i in i_obj:
    print(i)
    
>>>
1
2
3
4
```



## 컨테이너 객체

컨테이너 객체는 `__contains__` 메서드를 구현한 객체를 말한다. 이는 파이썬에서 in 키워드가 발견될 때 호출된다. 사용자는 `__contains__` 매직 메서드가 구현되어 있지 않은 객체도 직접 구현을 통해 컨테이너 객체를 만들어 `in` 을 사용할 수 있다.

행복한 사람인지 체크하는 예제를 만들어보았다!

```python
class Person:
    def __init__(self, name, happy):
        self.name = name
        self.happy = happy

class HappyCheck:
    def __init__(self, threshold):
        self.happy_threshold = threshold
    def __contains__(self, person):
        return person.happy >= self.happy_threshold

          
p1 = Person("suwan", 7)
p2 = Person("gildong", 3)

hc = HappyCheck(threshold = 5)

for p in [p1, p2]:
    if p in hc:
        print(f"{p.name}은 행복한사람")
    else:
        print(f"{p.name}은 그렇지 않은 사람..ㅠㅠ")
        
>>>
suwan은 행복한사람
gildong은 그렇지 않은 사람..ㅠㅠ
        
```



## 객체의 동적인 속성

객체에서 속성을 얻고자 할 때 속성이 있다면 손쉽게 값을 받아오지만 그렇지 않을 경우 에러를 반환한다. 지정되지 않은 속성에 접근할 때 내부적으로 `__getattr__` 메소드를 거치는데, 이를 직접 정의하면 새로운 속성을 정의하는 등 예외적인 재미있는 일들을 할 수 있다.



## 호출형(callable) 객체

매직 메서드 `__call__` 을 사용하면 객체를 일반 함수처럼 호출할 수 있다.

입력된 파라미터와 동일한 값으로 몇 번이나 호출되었는지 카운팅하는 책의 예제이다.

```python
from collections import defaultdict


class CallCount:
    def __init__(self):
        self._counts = defaultdict(int)
    def __call__(self, argument):
        self._counts[argument] += 1
        return self._counts[argument]

>>> cc = CallCount()
>>> cc(1)
1
>>> cc(1)
2
>>> cc(2)
1
>>> cc(1)
3
>>> cc("something")
1
```





## 매직 메서드 요약

| 문장                                   | 매직메서드                                                 | 파이썬 컨셉                |
| -------------------------------------- | ---------------------------------------------------------- | -------------------------- |
| obj[key]<br />obj[i:j]<br />obj[i:j:k] | \_\_getitem__(key)                                         | 첨자형(subscriptable) 객체 |
| with obj: ...                          | \_\_enter__ / \_\_exit__                                   | 컨텍스트 관리자            |
| for i in obj: ...                      | \_\_iter__ / \_\_next\_\_<br />\_\_len__ / \_\_getitem\_\_ | 이터러블 객체<br />시퀀스  |
| obj(*args, **kwargs)                   | \_\_call\_\_(*args, **kwargs)                              | 호출형 객체                |
