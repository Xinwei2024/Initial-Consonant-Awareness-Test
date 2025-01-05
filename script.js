let countdownTimer;
let selectedCells = [];
let isPracticeMode = true;  // 当前是练习模式还是正式测试
let isTestStarted = false;  // 标识是否进入正式测试

// 词语数组：练习和正式测试各自不同
let practiceWords = [
    ['活', '中', '休', '他', '播', '节', '走', '用', '补', '前'],
    ['忙', '右', '币', '生', '这', '六', '口', '面', '搬', '字'],
    ['是', '课', '国', '的']
];
let practiceCorrectAnswers = [
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0]
];

let testWords =  [
    ['保', '次', '买', '成', '帮', '京', '高', '饱', '工', '摆'] ,
    ['别', '空', '听', '吧', '部', '笔', '八', '大', '店', '边'] ,
    ['班', '花', '妈', '跑', '爸', '般', '开', '还', '九', '冰'] ,
    ['当', '不', '带', '标', '楼', '去', '白', '板', '把', '被'] ,
    ['菜', '布', '和', '表', '弟', '过', '汉', '手', '比', '本'] ,
    ['定', '法', '门', '关', '车', '出', '步', '个', '变', '东'] ,
    ['吃', '背', '报', '人', '便', '办', '鸡', '半', '北', '飞'] ,
    ['话', '百', '分', '杯', '包', '病', '备', '必', '遍', '并']
];
let testCorrectAnswers = [
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1] ,
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 1] ,
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 1] ,
    [0, 1, 0, 1, 0, 0, 1, 1, 1, 1] ,
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 1] ,
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0] ,
    [0, 1, 1, 0, 1, 1, 0, 1, 1, 0] ,
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 1]
];

let totalTime = 40;  // 倒计时总时长

document.addEventListener("DOMContentLoaded", function() {
    // 页面加载完成后显示图片（指导语），并准备好表格
    displayImage("instruction.jpg");  // 显示指导语的图片（你可以替换为实际的指导语）
    
    // 监听按键事件，只有按下空格键时才开始进入练习或测试
    document.addEventListener("keydown", function(event) {
        if (event.key === " " || event.keyCode === 32) {
            if (!isTestStarted) {
                // 隐藏指导语并进入练习模式
                hideImage();
                createTable(practiceWords, practiceCorrectAnswers); // 创建练习用的表格
                startPracticeMode();
            }
        } else if (event.key === "Enter") {
            if (isPracticeMode) {
                // 练习结束，按下回车进入正式测试
                startTestMode();
            }
        }
    });
});

// 显示图片
function displayImage(imageSrc) {
    let imageElement = document.createElement("img");
    imageElement.src = "/image.jpg";  // 这里传入图片路径
    imageElement.alt = "实验指导语";
    imageElement.id = "experimentImage"; // 给图片一个ID以便以后隐藏
    document.body.appendChild(imageElement);

    // 为图片添加居中样式
    document.body.style.textAlign = "center"; // 水平居中
    imageElement.style.marginTop = "20px";     // 添加一些顶部空白，使图片不紧贴顶部
    imageElement.style.maxWidth = "100%";      // 确保图片不会超出屏幕宽度
}

// 隐藏图片
function hideImage() {
    let imageElement = document.getElementById("experimentImage");
    if (imageElement) {
        imageElement.style.display = "none"; // 隐藏图片
    }
}

// 练习模式：无倒计时，直接进行词语选择
function startPracticeMode() {
    isPracticeMode = true;  // 保持练习模式标记为true
    selectedCells = [];  // 清空之前的选择
    alert("练习开始，按下回车进入正式测试！");
}

// 正式测试模式：开始倒计时
function startTestMode() {
    isTestStarted = true;  // 进入正式测试
    selectedCells = [];  // 清空之前的选择
    createTable(testWords, testCorrectAnswers);  // 创建正式测试的表格
    createCountdown();  // 显示倒计时
    startCountdown();  // 开始倒计时
}

// 创建倒计时显示元素
function createCountdown() {
    let countdownElement = document.createElement("div");
    countdownElement.id = "countdown";  // 给倒计时元素一个ID
    countdownElement.style.fontSize = "30px";  // 设置字体大小
    countdownElement.style.textAlign = "center"; // 居中显示
    countdownElement.style.marginTop = "20px"; // 为倒计时添加一些顶部间距
    document.body.appendChild(countdownElement);  // 将倒计时元素添加到页面
}

// 开始倒计时
function startCountdown() {
    let countdownElement = document.getElementById("countdown");
    countdownElement.textContent = totalTime;  // 显示倒计时初始值

    countdownTimer = setInterval(function() {
        totalTime--;
        countdownElement.textContent = totalTime;  // 更新倒计时
        if (totalTime <= 0) {
            clearInterval(countdownTimer);  // 停止倒计时
            calculateResults();  // 倒计时结束后计算结果
        }
    }, 1000);
}

// 创建表格
function createTable(wordsArray, answersArray) {
    let table = document.getElementById("gameTable");
    table.innerHTML = ""; // 清空之前的表格

    for (let i = 0; i < answersArray.length; i++) {
        let row = table.insertRow();
        for (let j = 0; j < answersArray[i].length; j++) {
            let cell = row.insertCell();
            cell.textContent = wordsArray[i][j];  // 用词语数组填充单元格
            cell.onclick = function() {
                toggleCellSelection(i, j);
            };
        }
    }
}

// 选择/取消选择单元格
function toggleCellSelection(row, col) {
    let cell = document.getElementById("gameTable").rows[row].cells[col];
    
    if (selectedCells.includes(`${row},${col}`)) {
        // 取消选择
        selectedCells = selectedCells.filter(cellId => cellId !== `${row},${col}`);
        cell.classList.remove("selected");
    } else {
        // 选择
        selectedCells.push(`${row},${col}`);
        cell.classList.add("selected");
    }

    console.log(selectedCells);  // 用于调试，查看选中的单元格
}

// 计算结果
function calculateResults() {
    let correctCount = 0;
    let incorrectCount = 0;
    let detailedResults = [];

    let currentAnswers = isTestStarted ? testCorrectAnswers : practiceCorrectAnswers;  // 根据当前模式选择答案

    for (let i = 0; i < currentAnswers.length; i++) {
        for (let j = 0; j < currentAnswers[i].length; j++) {
            let isSelected = selectedCells.includes(`${i},${j}`);
            let isCorrect = currentAnswers[i][j] === 1;

            // 判断正确与否
            let result = {
                word: (isTestStarted ? testWords : practiceWords)[i][j],
                isSelected: isSelected,
                isCorrect: isCorrect,
                isAnswerCorrect: (isSelected === isCorrect)
            };

            if (result.isAnswerCorrect) {
                correctCount++;
            } else {
                incorrectCount++;
            }

            detailedResults.push(result);
        }
    }

    alert(`正确数量: ${correctCount}, 错误数量: ${incorrectCount}`);
    exportCSV(detailedResults, correctCount, incorrectCount);
}

// 导出CSV
function exportCSV(detailedResults, correctCount, incorrectCount) {
    // CSV 数据的表头
    const header = ["词语", "是否选中", "正确答案", "是否正确"];

    let data = [];
    // 添加详细结果
    detailedResults.forEach(result => {
        data.push([result.word, result.isSelected ? "是" : "否", result.isCorrect ? "是" : "否", result.isAnswerCorrect ? "是" : "否"]);
    });

    // 添加总结行
    data.push(["正确数量", correctCount, "错误数量", incorrectCount]);

    // 构建 CSV 内容
    let csvContent = "data:text/csv;charset=utf-8,";
    // 添加表头
    csvContent += header.join(",") + "\r\n";
    
    // 添加每一行数据
    data.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    // 创建并触发下载
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "results.csv");
    link.click();
}
