### Hexlet tests and linter status:
[![Actions Status](https://github.com/Madixxx22/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Madixxx22/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/fde78d3c3a461cc80289/maintainability)](https://codeclimate.com/github/Madixxx22/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fde78d3c3a461cc80289/test_coverage)](https://codeclimate.com/github/Madixxx22/frontend-project-46/test_coverage)

# Generate difference hexlet project
Generate difference - это проект при запуске, который принимает пути до двух файлов и выдает различия между ними в разных форматах.
Поддерживает файлы типа json и yaml(yml).

## Сборка и запуск

### Установка
`git clone https://github.com/Madixxx22/fullstack-javascript-project-44.git`

`make install`

### Примеры работы

#### stylish
` gendiff <path1> <path2>` или ` gendiff <path1> <path2> -f stylish`
Выводит отличия, учитывая вложеннотсь в файлах.
Работает по умолчанию, при отсутствии параметров
[![asciicast](https://asciinema.org/a/EPNU9YqR2V5gGDhsbRY8NBek9.svg)](https://asciinema.org/a/EPNU9YqR2V5gGDhsbRY8NBek9)

#### Plain
` gendiff <path1> <path2> -f plain`
Выводит файлы в плоском формате
[![asciicast](https://asciinema.org/a/ToXriW4QqFqJmva2F9YlQNWm5.svg)](https://asciinema.org/a/ToXriW4QqFqJmva2F9YlQNWm5)

#### Json
` gendiff <path1> <path2> -f json`
Выводит внутреннее представление построения отличий в файлах
[![asciicast](https://asciinema.org/a/RXb1Dg6PE4tyuB0cebCRc25QE.svg)](https://asciinema.org/a/RXb1Dg6PE4tyuB0cebCRc25QE)
