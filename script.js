document.addEventListener('DOMContentLoaded', () => {
    const calendarWrapper = document.getElementById('calendar-wrapper');
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed

    renderCalendar(year, month, calendarWrapper);
});

function renderCalendar(year, month, wrapper) {
    // 月初めの曜日
    const firstDay = new Date(year, month, 1).getDay();
    // 月の日数
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // 月名表示
    const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    
    let html = `
        <div class="calendar-header">
            <span>${year}年 ${monthNames[month]}</span>
        </div>
        <div class="calendar-grid">
            <div class="cal-head">日</div>
            <div class="cal-head">月</div>
            <div class="cal-head">火</div>
            <div class="cal-head">水</div>
            <div class="cal-head">木</div>
            <div class="cal-head">金</div>
            <div class="cal-head">土</div>
    `;

    // 空白セル
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="cal-cell empty"></div>`;
    }

    // 日付セル
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        const dayOfWeek = currentDate.getDay();
        const isToday = currentDate.toDateString() === new Date().toDateString();
        
        let statusClass = '';
        let statusDot = '';

        // 日曜、木曜は休み、それ以外はランダムで予約状況を表示（デモ用）
        // ただし本日は考慮
        if (dayOfWeek === 0 || dayOfWeek === 4) {
             // 休み（何も表示しない）
        } else {
            // ランダムに予約可、満員を割り振り
            // ドラフト用なので固定パターンでもよいが、ランダム感を出す
            const rand = Math.random();
            if (rand > 0.3) {
                statusDot = '<span class="status-dot ok"></span>';
            } else {
                statusDot = '<span class="status-dot ng"></span>';
            }
        }
        
        html += `
            <div class="cal-cell cal-day ${isToday ? 'today' : ''}">
                ${day}
                ${statusDot}
            </div>
        `;
    }

    html += `</div>`;
    wrapper.innerHTML = html;
}
