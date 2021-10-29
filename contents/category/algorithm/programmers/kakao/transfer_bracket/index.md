---
title: '[프로그래머스-2020 카카오 블라인드 채용] 괄호 변환'
date: '2021-10-29'
category: 'algorithm'
description: ''
emoji: '😊'
---

[[info | 프로그래머스 괄호 변환 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/60058

#### 배운점

최근 푼 문제 중 가장 희열이 느껴졌던 문제였다.!! !!! 

## 문제 요약

괄호가 입력되었을 때 올바른 괄호로 변환하여 반환하라.

#### 조건

- 문자열의 길이는 1,000 이하이다.
- '('와 ')'의 길이는 같다.

## 문제 접근 방식

1. LeetCode에서처럼 Class를 이용해서 문제를 풀고 싶었는데 적절한 문제가 나온거 같아 기분이 좋았다.
2. 문제를 읽으며 이해가 쉽진 않았지만 결국 문제에서 제시하는 걸 따라하면 되는 문제였다.
3. 클래스를 정의하고 전체 프로세스를 담당할 `transfer` 메소드, 균형있는 괄호인지 판단하는 `is_balanced_bracket` 메소드, 적절한 괄호인지 판단하는 `is_proper_bracket` 메소드로 구성되어 있다.
4. 괄호를 뒤집는 기법이 잘 생각이 나지 않아, replace를 3번 사용했다.. 조금 더 좋은 방법이 없을까?

## 풀이코드

```python
class TransferBracket:
    def is_balanced_bracket(self, bracket):
        return bracket.count("(") == bracket.count(")")
    
    def is_proper_bracket(self, bracket):
        check = 0 # if check < 0 -> not proper bracket
        for b in bracket:
            if b == "(":
                check += 1
            elif b == ')':
                check -= 1
            if check < 0:
                return False
        return True
    
    def transfer(self, brackets):
        if not brackets:
            return ""
        for i in range(2, len(brackets)+1, 2):
            if self.is_balanced_bracket(brackets[:i]):
                u, v = brackets[:i], brackets[i:]
                if self.is_proper_bracket(u):
                    return u + self.transfer(v)
                else:
                    
                    temp = "("
                    temp += self.transfer(v)
                    temp += ')'
                    u = u[1:-1].replace("(", "|").replace(")", "(").replace("|", ")")
                    
                    return temp + u             
        return brackets
        

def solution(ps):
    transferbracket = TransferBracket()
    transfered = transferbracket.transfer(ps)
    return transfered
```