## Содержание

Проект содержит исходный файл `index.html`, а так же папку `assets`. Внутри `assets` находятся папки: 
  * `img` - содержит все изображения, используемые в рабте;
  * `js` - содержит файлы c JavaScript;
  * `sounds` - папка со звуками, используемыми в работе;
  * `style` - содержит файлы со стилями.

Файлы, используемые в работе:

Название файла  | Содержание файла
----------------|----------------------
index.html      | Исходный файл, содержащий основную разметку
duckHunt.js     | Файл, содержащий JavaScript проекта
reset.css       | Reset CSS от [Константина Александрова](https://github.com/koalex)
style.css       | Файл каскадной таблицы стилей, в котором описываются все стили проекта
LICENSE         | Лицензионное соглашение, стандартная MIT-лицензия

## Запуск и работа
Для запуска приложения используется файл `index.html`.

### Основные функции
После запуска исходного файла, откроется html-страница, на которой отображается кнопка "Старт" а так же небольшая текстовая инструкция к игре. По нажатию на кнопку, пёс начнет движение к центру страницы. После остановки, собака исчезнет, а на экране начнут летать утки. В верхнем правом углу страницы появится таймер. В верхнем правом углу находится количество патронов, показывающее количество попыток выстрелов по уткам. Условиями окончания игры могут быть:
  * закончившееся время на таймере;
  * попадание по всем уткам;
  * закончившиеся патроны.
  
В конце игры, собака отображает результат попадания по уткам, после чего на экране будет выведен результат, а так же появится кнопку, предлагающая начать сначала. При нажатии на эту кнопку, страница перезагрузится.

****************************************
Увеличение количества уровней и многое другое находится в разработке.