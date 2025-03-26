import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher'; // 使用命名导入

(async () => {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {logLevel: 'info', output: 'html',outputPath: 'report.html',port: chrome.port};
    const runnerResult = await lighthouse('http://localhost:5173/', options);

    // 输出报告
    console.log(`Report is done for ${runnerResult.lhr.finalUrl}`);
    console.log(`Performance score: ${runnerResult.lhr.categories.performance.score * 100}`);

    await chrome.kill();
})();