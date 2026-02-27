function importAll(r) {
  const keys = r.keys();

  const firstFile = './window/window.js'; // файл, который должен импортироваться первым

  // Отфильтровать firstFile из общего списка
  const filteredKeys = keys.filter(key => key !== firstFile).sort();

  // Импортируем сначала нужный файл, если он есть
  if (keys.includes(firstFile)) {
    r(firstFile);
  }

  // Импортируем остальные по алфавиту
  filteredKeys.forEach(r);
}

importAll(require.context('./', true, /\.js$/));