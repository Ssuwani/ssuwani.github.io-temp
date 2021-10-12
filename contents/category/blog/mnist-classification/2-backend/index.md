---
title: '[MNIST Classification - 2] MNIST 학습 및 모델 서빙'
date: '2021-10-09'
category: 'blog'
description: ''
emoji: '📚'
---

# MNIST 학습 및 모델 서빙

실험 날짜: 2021년 10월 9일
실험자: Suwan Jang


학습된 모델을 불러와 프론트엔드에서 전달받은 이미지를 분석하고 결과를 반환한다.

### 📚 Stack

- Flask
- PyTorch (M1 Mac에서 Tensorflow가 넘 귀찮다..)

**Todo**

- [x]  Flask Project Structure
- [x]  Make model
- [x]  Train & Save Model code
- [x]  Load Model & Prediction
- [x]  Flask Project Complete

학습과 테스트를 위한 코드는 여기를 참고했습니다!!(거의 똑같음)
모델 성능 향상을 테스트 하기 위해 DNN 모델, epochs: 1 로 학습하였습니다.

[examples/main.py at master · pytorch/examples](https://github.com/pytorch/examples/blob/master/mnist/main.py)

## Logs

---

**✓ Flask Project Structure**

- `app.py`
    
    ```python
    from flask import Flask
    
    app = Flask(__name__)
    
    # Load Model
    
    def preprocessing(image):
        """Preprocessing Function
    
        Input:
            Image
        Output:
            Image
        """
        # return image
    
    def predict(image):
        """Predict Function
    
        Input:
            Image
        Output:
            value
        """
    
        # return value
    
    @app.route("/")
    def root_route():
        return {"error": "use POST /prediction instead of root route"}
    
    @app.route("/")
    def prediction_route():
        """Prediction Router
    
        Input:
            formData from Flask
        Output:
            Json: ("class_name": value)
            example:
                 {"class_name": 1}
        """
    
        # return {"class_name": value}
    ```
    
- Load Model
- Preprocess function
- Predict function
- root router
- prediction router

**✓ Make model**

- `train.py`
    
    ```python
    import torch
    import torch.nn as nn
    import torch.nn.functional as F
    
    class Net(nn.Module):
        def __init__(self):
            super(Net, self).__init__()
            self.fc1 = nn.Linear(28 * 28, 128)
            self.fc2 = nn.Linear(128, 10)
    
        def forward(self, x):
            x = torch.flatten(x, 1)
            x = self.fc1(x)
            x = F.relu(x)
            x = self.fc2(x)
            output = F.log_softmax(x, dim=1)
            return output
    ```
    

**✓ Train & Save Model**

- `train.py`
    
    ```python
    from __future__ import print_function
    import argparse
    import torch
    import torch.nn.functional as F
    import torch.optim as optim
    from torchvision import datasets, transforms
    from torch.optim.lr_scheduler import StepLR
    from model import Net
    
    def train(args, model, device, train_loader, optimizer, epoch):
        model.train()
        for batch_idx, (data, target) in enumerate(train_loader):
            data, target = data.to(device), target.to(device)
            optimizer.zero_grad()
            output = model(data)
            loss = F.nll_loss(output, target)
            loss.backward()
            optimizer.step()
            if batch_idx % args.log_interval == 0:
                print(
                    "Train Epoch: {} [{}/{} ({:.0f}%)]\tLoss: {:.6f}".format(
                        epoch,
                        batch_idx * len(data),
                        len(train_loader.dataset),
                        100.0 * batch_idx / len(train_loader),
                        loss.item(),
                    )
                )
                if args.dry_run:
                    break
    
    def test(model, device, test_loader):
        model.eval()
        test_loss = 0
        correct = 0
        with torch.no_grad():
            for data, target in test_loader:
                data, target = data.to(device), target.to(device)
                output = model(data)
                test_loss += F.nll_loss(
                    output, target, reduction="sum"
                ).item()  # sum up batch loss
                pred = output.argmax(
                    dim=1, keepdim=True
                )  # get the index of the max log-probability
                correct += pred.eq(target.view_as(pred)).sum().item()
    
        test_loss /= len(test_loader.dataset)
    
        print(
            "\nTest set: Average loss: {:.4f}, Accuracy: {}/{} ({:.0f}%)\n".format(
                test_loss,
                correct,
                len(test_loader.dataset),
                100.0 * correct / len(test_loader.dataset),
            )
        )
    
    def main():
        # Training settings
        parser = argparse.ArgumentParser(description="PyTorch MNIST Example")
        parser.add_argument(
            "--batch-size",
            type=int,
            default=64,
            metavar="N",
            help="input batch size for training (default: 64)",
        )
        parser.add_argument(
            "--test-batch-size",
            type=int,
            default=1000,
            metavar="N",
            help="input batch size for testing (default: 1000)",
        )
        parser.add_argument(
            "--epochs",
            type=int,
            default=14,
            metavar="N",
            help="number of epochs to train (default: 14)",
        )
        parser.add_argument(
            "--lr",
            type=float,
            default=1.0,
            metavar="LR",
            help="learning rate (default: 1.0)",
        )
        parser.add_argument(
            "--gamma",
            type=float,
            default=0.7,
            metavar="M",
            help="Learning rate step gamma (default: 0.7)",
        )
        parser.add_argument(
            "--no-cuda", action="store_true", default=False, help="disables CUDA training"
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            default=False,
            help="quickly check a single pass",
        )
        parser.add_argument(
            "--seed", type=int, default=1, metavar="S", help="random seed (default: 1)"
        )
        parser.add_argument(
            "--log-interval",
            type=int,
            default=10,
            metavar="N",
            help="how many batches to wait before logging training status",
        )
        parser.add_argument(
            "--save-model",
            action="store_true",
            default=False,
            help="For Saving the current Model",
        )
        args = parser.parse_args()
        use_cuda = not args.no_cuda and torch.cuda.is_available()
    
        torch.manual_seed(args.seed)
    
        device = torch.device("cuda" if use_cuda else "cpu")
    
        train_kwargs = {"batch_size": args.batch_size}
        test_kwargs = {"batch_size": args.test_batch_size}
        if use_cuda:
            cuda_kwargs = {"num_workers": 1, "pin_memory": True, "shuffle": True}
            train_kwargs.update(cuda_kwargs)
            test_kwargs.update(cuda_kwargs)
    
        transform = transforms.Compose(
            [transforms.ToTensor(), transforms.Normalize((0.1307,), (0.3081,))]
        )
        dataset1 = datasets.MNIST("../data", train=True, download=True, transform=transform)
        dataset2 = datasets.MNIST("../data", train=False, transform=transform)
        train_loader = torch.utils.data.DataLoader(dataset1, **train_kwargs)
        test_loader = torch.utils.data.DataLoader(dataset2, **test_kwargs)
    
        model = Net().to(device)
        optimizer = optim.Adadelta(model.parameters(), lr=args.lr)
    
        scheduler = StepLR(optimizer, step_size=1, gamma=args.gamma)
        for epoch in range(1, args.epochs + 1):
            train(args, model, device, train_loader, optimizer, epoch)
            test(model, device, test_loader)
            scheduler.step()
    
        if args.save_model:
            torch.save(model.state_dict(), "models/mnist.pt")
    
    if __name__ == "__main__":
        main()
    ```
    

```bash
python train.py --epochs 1 --save-model
```

**✓ Load Model & Prediction**

- `test.py`
    
    ```python
    import torch
    from model import Net
    import argparse
    from PIL import Image
    import numpy as np
    from torchvision import transforms
    
    def load_model():
        model = Net()
        PATH = "./models/mnist.pt"
        model.load_state_dict(torch.load(PATH))
        return model
    
    def preprocess(image_path):
        transform = transforms.Compose(
            [transforms.ToTensor(), transforms.Normalize((0.1307,), (0.3081,))]
        )
        image = Image.open(image_path)
        image = transform(image)
        return image
    
    def predict(model, x):
        x = x.unsqueeze(0)
        output = model(x)
        pred = output.argmax(dim=1, keepdim=True)
    
        return pred.item()
    
    def main():
        parser = argparse.ArgumentParser(description="PyTorch MNIST Test Example")
    
        parser.add_argument(
            "--image_path",
            type=str,
            help="input test image path",
        )
        args = parser.parse_args()
    
        model = load_model()
        
        image = preprocess(args.image_path)
        
        result = predict(model, image)
        
        print("result: ", result)
    
    if __name__ == "__main__":
        main()
    ```
    

```python
python test.py --image_path 'images/img_0.jpg'

# Return:
# result:  1
```

**✓ Flask Project Complete**

- `app.py`
    
    ```python
    import torch
    from flask import Flask, request
    from model import Net
    import argparse
    from torchvision import transforms
    from PIL import Image
    from test import preprocess
    
    app = Flask(__name__)
    
    def load_model(model_path):
        model = Net()
        model.load_state_dict(torch.load(model_path))
        return model
    
    def preprocessing(data):
        """Preprocessing Function
    
        Input:
            Flask Class 'FileStorage'
        Output:
            Image
        """
        transform = transforms.Compose(
            [transforms.ToTensor(), transforms.Normalize((0.1307,), (0.3081,))]
        )
        image = Image.open(data)
        image = transform(image)
        return image
    
    def predict(x):
        """Predict Function
    
        Input:
            Image
        Output:
            value
        """
    
        x = x.unsqueeze(0)
        output = model(x)
        pred = output.argmax(dim=1, keepdim=True)
    
        return pred.item()
    
    @app.route("/")
    def root_route():
        return {"error": "use POST /prediction instead of root route"}
    
    @app.route("/prediction", methods=["POST"])
    def prediction_route():
        """Prediction Router
    
        Input:
            formData from Flask
        Output:
            Json: ("class_name": value)
            example:
                 {"class_name": 1}
        """
    
        data = request.files.get("file")
    
        image = preprocess(data)
        result = predict(image)
    
        print("result: ", result)
        return {"class_name": result}
    
    def main():
        parser = argparse.ArgumentParser(description="Flask App")
    
        parser.add_argument(
            "--model_path",
            type=str,
            help="input model path",
        )
        args = parser.parse_args()
        global model
        model = load_model(args.model_path)
    
        app.run(debug=True)
    
    if __name__ == "__main__":
        main()
    ```
    

```bash
python app.py --model_path models/mnist.pt
```

test

- img_1.jpg
    
    ![img_1.jpg](./images/img_1.jpg)
    

```bash
curl -F "file=@images/img_1.jpg" localhost:5000/prediction

# Return:
{
  "class_name": 1
}

```