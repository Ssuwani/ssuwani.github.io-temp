---
title: '[책] 파이썬 코딩의 기술'
date: '2021-10-31'
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







