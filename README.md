# Node.js test task

## Backend

### Installation

`npm install`

### Start dev server

`npm run dev`

#### Test connection

`GET http://localhost:8000/api/cars`


## Client

### Installation

- `cd client`
- `npm install`

### In order to use cli command (car) directly from the terminal install it globally

- `npm install -g .`

### Run dev mode

`npm run dev`

Now you can use the cli command `car` from the terminal

### Commands

- `car --help` - show help
- `car --version` - show version
- `car list` - list all cars
- `car add` - add new car
- `car delete <id>` - delete car by id

## Task requirements

Разработать клиент-серверное решение с использованием typescript и node.js для хранения и управления базой данных автомобилей различных брендов.

Решение должно состоять из двух приложений: серверного и клиентского. В приложениях должны быть использованы следующие технологии:

Серверное приложение:

1. Node.JS
2. TypeScript
3. Express или любой express-совместимый web-сервер
4. REST API
5. Методы, которые позволяют добавлять автомобили, удалять и получать список с сортировкой. Опубликовать эти методы в REST API

6А. Информацию об автомобилях хранить в виде JSON файла на диске. Учесть необходимость защиты от одновременной записи файла при запросах к REST API

6Б. Альтернатива п.6А, при выборе будет дополнительным плюсом кандидату: БД MongoDB для персистентного хранения информации об автомобилях. В качестве сервера MongoDB выбрать любой на своё усмотрение, можно публичный MongoDB Atlas

Клиентское приложение:

1. Node.JS
2. TypeScript
3. Интерпретатор командной строки. В параметрах обязательно должны быть действие и аргументы этого действия в любом формате.
4. При запуске из командной строки с параметрами нужно выполнять подключение к Серверу и выполнять REST API операции.
5. Данные, полученные от Сервера выводить в консоль.

Примерная структура "Автомобиль":

- Бренд
- Название
- Год производства
- Цена
- любые дополнительные поля, которые нужны для решения задачи
