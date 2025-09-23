// 1. الحصول على لوحة الرسم (Canvas) والسياق (Context)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 2. خصائص الطائر
const bird = {
    x: 50,
    y: 150,
    width: 40,
    height: 30,
    color: 'yellow',
    velocityY: 0,       // سرعة السقوط العمودية
    gravity: 0.4,       // قوة الجاذبية
    jumpStrength: 8     // قوة القفزة
};

// ==========================================
// ==========  الأجزاء الجديدة هنا ==========
// ==========================================

// 3. دالة القفز
// هذه الدالة تغير سرعة الطائر العمودية إلى قيمة سالبة ليرتفع للأعلى
function jump() {
    bird.velocityY = -bird.jumpStrength;
}

// 4. ربط الأحداث (Events)
// نستمع للمس الشاشة على الجوال
document.addEventListener('touchstart', jump);

// نستمع لضغط زر المسافة "Space" على الكمبيوتر (لتسهيل التجربة)
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});


// ==========================================
// ==========================================


// 5. دالة لرسم الطائر
function drawBird() {
    ctx.fillStyle = bird.color;
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

// 6. دالة تحديث اللعبة (Game Loop)
function gameLoop() {
    // تحديث موقع الطائر بناءً على الجاذبية
    bird.velocityY += bird.gravity;
    bird.y += bird.velocityY;

    // مسح الشاشة في كل إطار لإعادة الرسم
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // رسم الطائر في موقعه الجديد
    drawBird();

    // طلب تكرار الدالة مع الإطار التالي للأنميشن
    requestAnimationFrame(gameLoop);
}

// 7. بدء تشغيل حلقة اللعبة
gameLoop();
