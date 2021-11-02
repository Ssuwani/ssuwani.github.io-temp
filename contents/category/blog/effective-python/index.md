---
title: '[책] 파이썬 코딩의 기술'
date: '2021-11-02'
category: 'blog'
description: ''
emoji: '📚'
---

[[info | 책 "파이썬 클린코드"를 읽고 내용을 정리햇습니다. ]]

<br/>

<br/>

## 목차

1. [파이썬답게 생각하기](#ch1) 🔳
2. 리스트와 딕셔너리 🔳
3. 함수 🔳
4. 컴프리헨션과 제너레이터 🔳
5. 클래스와 인터페이스 🔳
6. 메타클래스와 애트리뷰트 🔳
7. 동시성과 병렬성 🔳
8. 강건성과 성능 🔳
9. 테스트와 디버깅 🔳
10. 협업 🔳

<br/>

[[info | 예제 코드 다운로드 ]]
| https://github.com/bslatkin/effectivepython

<br/>



<a id="ch1"></a>

# CH1. 파이썬답게 생각하기

파이썬 프로그래머는 명시적인 것을 좋아하고, 복잡한 것보다 단순한 것을 좋아하며, 가독성을 최대한 높이려고 노력한다.

```python
import this
```

```
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

---

## Betterway 1. 사용 중인 파이썬의 버전을 알아두라

파이썬 2는 2020년 1월 1일 수명이 다했다. 더 이상의 버그 수정, 보안 패치, 새로운 기능의 역포팅이 이뤄지지 않음을 의미한다. 

```python
which python # /home/suwan/anaconda3/bin/python
python --version # Python 3.8.8
```

`which` 는 실행파일의 위치(경로)를 찾아주는 명령어이다. 원하는 환경의 파이썬이 실행되고 있는지 확인할 수 있고 문제가 있다면 사용중인 shell의 rc에 접근하여 alias를 설정해주는 임시방편도 있다.

---

## Betterway 2. PEP 8 스타일 가이드를 따르라

PEP 8은 파이썬 코드를 어떤 형식으로 작성할지 알려주는 스타일 가이드다. PEP 8을 따르는 일관된 스타일은 코드에 더 친숙하게 접근하고, 더 쉽게 읽고, 더 쉽게 협력할 수 있게 도와준다. 

공백, 명명규약, 식과 문, 임포트에 대해서 자세하게 가이드 해주고 있다. 외운다기보단 한번 쯤 읽어보고 `Pylint` 를 사용하는 것이 좋을 것 같다. Pylint는 파이썬 소스코드를 분석하는 유명한 정적 분석기이다. PEP 8 스타일 가이드를 자동으로 실행해주고, 오류를 감지해준다. 대부분의 IDE에서 플러그인으로 지원한다.!!   



PEP 8 스타일 가이드에 대한 자세한 정리를 직접 검색해서 꼭 읽어보길 바란다..

---

## Betterway 3. byes와 str의 차이를 알아두라

파이썬에는 문자열 데이터의 시퀀스를 표현하는 두 가지 타입이 있다.

- `bytes`
- `str`

**bytes**

내부 문자를 아스키 코드로 나타낼 수도 있다. 아스키 코드 상 `0x65` 는 문자 `e` 를 나타낸다.

```python
b'h\x65llo' # b'hello'
```

**str**

내부 문자를 유니코드로 나타낼 수도 있다. 유니코드 상 `U+0065` 는 문자 `e`를 나타낸다.

```python
'h\u0065llo' # 'hello'
```



**두개의 타입을 비교, 연산 하기 위해선 하나의 타입으로 통합해줘야 한다.**

- `encoding` : str -> bytes
- `decoding` : bytes -> str



**파이썬 3부터 open을 통해 호출한 파일 핸들관련 연산들은 유니코드 문자열을 요구한다.**

이진 데이터를 기록하고 싶다면  `open(filename.bin, "wb")`즉 이진 쓰기 모드로 파일을 열어야 한다. 읽을 때도 마찬가지로 `rb` 를 사용해야 한다.

---

## Betterway 4. C 스타일 형식 문자열을 str.format과 쓰기보다는 f-문자열을 통한 인터폴레이션을 사용하라.

- 파이썬에서 C 스타일 형식 문자열 즉, `%` 을 사용하는 것은 다양한 문제점들이 있다!
- `str.format` 을 사용하면 C 스타일 형식 문자열의 문제점을 많이 해결할 수 있지만 해결하지 못하는 문제도 있고 가독성 면에서 좋지 못하다.



**인터폴레이션을 통한 형식 문자열 (f-string)**

파이썬 3.6부터 인터폴레이션을 통한 형식 문자열 즉, `f-string`이 도입됐다.

C 스타일 및 format 형식에서 사용했던 형식 지정자를 콜론 뒤에서 사용할 수 있다.

```python
key = 'my_var'
value = 1.234

f'{key:<10} = {value:.2f}' # 'my_var     = 1.23'
```

또한 중괄호 안에서 완전한 파이썬 식을 넣을 수 있다.

```python
f'{key} = {round(value)}' # 'my_var = 1'
f'{key} = {value * 10 if value < 100 else value}' # 'my_var = 12.34'
```

파이썬 식을 형식 지정자 옵션에 넣을 수도 있다. 아래의 예시는 소수점 3자리 까지 소수점을 표현했다.

```python
places = 3
number = 1.23456

f"{number:.3f}" # '1.235'
f"{number:.{places}f}" # '1.235'
```

---

## Better way 5. 복잡한 식을 쓰는 대신 도우미 함수를 작성하라.

- 파이썬 문법을 사용하면 아주 **복잡**하고 읽기 **어려운** 한 줄짜리 식을 쉽게 작성할 수 있다.
- 하지만 코드를 줄여 쓰는 것보다 가독성을 좋게 하는 것이 더 가치가 있다.
- if / else를 사용해서 더 가독성이 좋게 만들자.

or / and를 사용하면 논리연산을 해야하기 때문에 뭔가 더 멋있게 코드를 작성할 수 있는데 그렇게 쓰지 마라고 한다.

같은 로직을 반복해서 사용할 때는 도우미 함수를 꼭 활용하라.



---

## Better way 6. 인덱스를 사용하는 대신 대입을 사용해 데이터를 언패킹하라.

- 파이썬 언패킹은 모든 이터러블 객체에 적용할 수 있다.
- 언패킹을 사용하면 시각적인 잡음을 줄일 수 있다.



언패킹을 사용하지 않을 시 생기는 시각적 잡음을 코드로 나타내 보았다.

```python
menus = [
  ("americano", 3000),
  ("latte", 4000),
  ("milk", 2500),
]
for i in range(len(menus)):
	name = menus[i][0]
  price = menus[i][1]
  print(f"menu: {name} price: {price}")
  
# menu: americano price: 3000
# menu: latte price: 4000
# menu: milk price: 2500
```



아래는 언패킹을 사용해서 개선해보겠다.

```python
for name, price in menus:
  print(f"menu: {name} price: {price}")
  
# menu: americano price: 3000
# menu: latte price: 4000
# menu: milk price: 2500
```

4줄 중 2줄을 줄였다!!  그리고 더 보기 좋다.



---

## Better way 7. range보다는 enumerate를 사용하라

- enumerate를 사용하면 이터레이터에 대해 루프를 돌면서 이터레이터에서 가져오는 원소의 인덱스까지 얻는 코드를 간결하게 작성할 수 있다.
- range에 대해 루프를 돌면서 시퀀스의 원소를 인덱스로 가져오기보다는 enumerate를 사용하라.
- enumerate의 두 번째 파라미터로 어디부터 원소를 가져오기 시작할 지 지정할 수 있다.



이터러블 객체에 루프를 돌면서 index가 필요한 경우를 range를 사용해서 시각적 잡음을 가지도록 코드를 작성해보았다.

```python
numbers = ["one", "two", "three"]

for i in range(len(numbers)):
    print(f"{i+1}번째 요소는 {numbers[i]}입니다.")
    
# 1번째 요소는 one입니다.
# 2번째 요소는 two입니다.
# 3번째 요소는 three입니다.
```

아래는 enumerate를 사용해서 시각적 잡음을 줄여보았다.

```python
for i, num in enumerate(numbers, 1):
    print(f"{i}번째 요소는 {num}입니다.")
    
# 1번째 요소는 one입니다.
# 2번째 요소는 two입니다.
# 3번째 요소는 three입니다.
```







