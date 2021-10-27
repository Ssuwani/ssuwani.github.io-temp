---
title: '[MLOps] Colab에서 GCP 인증 GOOGLE_APPLICATION_CREDENTIALS'
date: '2021-10-27'
category: 'blog'
description: ''
emoji: '🔑'
---

[[info | Colab에서 GOOGLE_APPLICATION_CREDENTIALS 환경변수 설정하기 ]]
| https://stackoverflow.com/questions/55106556/how-to-refer-a-file-in-google-colab-when-working-with-python



```
DefaultCredentialsError: Could not automatically determine credentials. Please set GOOGLE_APPLICATION_CREDENTIALS or explicitly create credentials and re-run the application. 
```

---

다음과 같은 CredentialsError 에러를 로컬에서도 자주 봤었는데 `zshrc` 에 다음 한 줄 추가로 문제된 적이 없었다. *bash 쉘을 사용한다면 `bashrc`에 추가하면 된다*

```
export GOOGLE_APPLICATION_CREDENTIALS=/Users/suwan/credentials/suwan-mac.json
```

하지만 코렙은 계속해서 새로운 환경이 열리다보니 정리해놓지 않으면 또 헷갈릴 것이기 때문에 정리했다.



구글 드라이브에 credentials 폴더를 하나 만들고 키파일을 위치시킨다. 이후 드라이브를 마운트하고 아래의 코드를 입력 해 Colab의 환경변수로 설정해주면 된다!!

```python
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="/content/drive/MyDrive/credentials/suwan-mac.json"

!echo $GOOGLE_APPLICATION_CREDENTIALS

# /content/drive/MyDrive/credentials/suwan-mac.json
```

