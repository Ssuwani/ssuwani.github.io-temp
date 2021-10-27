---
title: '[LeetCode - Array] 136. Single Number'
date: '2021-10-28'
category: 'algorithm'
description: ''
emoji: '🔢'
---

[[info | LeetCode 136. Single Number 문제 보러가기]]
| https://leetcode.com/problems/single-number/



## 문제 요약

숫자가 담긴 리스트가 주어지는데 1번만 나오는 요소를 반환하라.

#### 조건

- `1 <= nums.length <= 3 * 104`
- `-3 * 104 <= nums[i] <= 3 * 104`
- Each element in the array appears twice except for one element which appears only once.

## 문제 접근 방식

1. 리스트의 요소가 몇번 나왔는지 세는 문제이므로 Counter를 사용하면 빠르고 손쉽게 구할 수 있다.

## 풀이코드

```python
from collections import Counter
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        for v, i in Counter(nums).items():
            if i == 1:
                return v
```



