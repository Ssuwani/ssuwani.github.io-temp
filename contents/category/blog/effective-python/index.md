---
title: '[책] 파이썬 코딩의 기술'
date: '2021-10-25'
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

## Betterway 1. 사용 중인 파이썬의 버전을 알아두라

파이썬 2는 2020년 1월 1일 수명이 다했다. 더 이상의 버그 수정, 보안 패치, 새로운 기능의 역포팅이 이뤄지지 않음을 의미한다. 

```python
which python # /home/suwan/anaconda3/bin/python
python --version # Python 3.8.8
```

`which` 는 실행파일의 위치(경로)를 찾아주는 명령어이다. 원하는 환경의 파이썬이 실행되고 있는지 확인할 수 있고 문제가 있다면 사용중인 shell의 rc에 접근하여 alias를 설정해주는 임시방편도 있다.



## Betterway 2. PEP 8 스타일 가이드를 따르라

PEP 8은 파이썬 코드를 어떤 형식으로 작성할지 알려주는 스타일 가이드다. PEP 8을 따르는 일관된 스타일은 코드에 더 친숙하게 접근하고, 더 쉽게 읽고, 더 쉽게 협력할 수 있게 도와준다. 



