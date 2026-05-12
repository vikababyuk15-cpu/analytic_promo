function distributeProvidersProject1() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("");
  
  const CONFIG = {
    sourceRange: "Q2:Q101",
    topRange: "D2:D37",
    recRange: "D38:D73",
    highPerformanceLimit: 20,
    priorityLineEnd: 18,
    lineSize: 6 
  };

  try {
    if (!sheet) throw new Error("Лист '' не найден!");

    const providers = sheet.getRange(CONFIG.sourceRange).getValues().flat().filter(String);
    if (providers.length === 0) throw new Error("Список провайдеров в столбце Q пуст!");

    let topData = sheet.getRange(CONFIG.topRange).getValues();
    let recData = sheet.getRange(CONFIG.recRange).getValues();

    // Вспомогательная функция для проверки дубля в линии
    function isAlreadyInLine(data, providerName, cellIndex) {
      // Определяем начало и конец текущей линии для данной ячейки
      const lineStart = Math.floor(cellIndex / CONFIG.lineSize) * CONFIG.lineSize;
      const lineEnd = lineStart + CONFIG.lineSize;
      
      for (let i = lineStart; i < lineEnd; i++) {
        if (data[i] && data[i][0] === providerName) return true;
      }
      return false;
    }

    function fillSection(data) {
      let updatedData = JSON.parse(JSON.stringify(data)); 
      
      for (let p = 0; p < providers.length; p++) {
        let providerName = providers[p];
        let slotsPlaced = 0;
        let isHigh = (p < CONFIG.highPerformanceLimit);

        // Пытаемся занять 2 слота для каждого провайдера
        for (let attempt = 0; attempt < 2; attempt++) {
          let placed = false;

          let searchIndices = [];
          if (isHigh) {
       
            for (let i = 0; i < CONFIG.priorityLineEnd; i++) searchIndices.push(i);
            // Потом 4-6 линии (18-35)
            for (let i = CONFIG.priorityLineEnd; i < updatedData.length; i++) searchIndices.push(i);
          } else {
        
            for (let i = CONFIG.priorityLineEnd; i < updatedData.length; i++) searchIndices.push(i);
            for (let i = 0; i < CONFIG.priorityLineEnd; i++) searchIndices.push(i);
          }

          for (let i of searchIndices) {

            if (updatedData[i][0] === "" && !isAlreadyInLine(updatedData, providerName, i)) {
              updatedData[i][0] = providerName;
              placed = true;
              slotsPlaced++;
              break;
            }
          }
          if (!placed) break; 
        }
      }
      return updatedData;
    }

    // Заполнение
    const finalTop = fillSection(topData);
    const finalRec = fillSection(recData);

    // Вывод в таблицу
    sheet.getRange(CONFIG.topRange).setValues(finalTop);
    sheet.getRange(CONFIG.recRange).setValues(finalRec);

    SpreadsheetApp.getUi().alert("✅ Готово! Провайдеры расставлены без дублей в линиях.");

  } catch (error) {
    SpreadsheetApp.getUi().alert("❌ Ошибка: " + error.message);
  }
}
