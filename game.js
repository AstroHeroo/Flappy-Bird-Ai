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
/**
 * دالة جديدة لرسم شكل يشبه التمرة
 * @param {CanvasRenderingContext2D} ctx - سياق الرسم الخاص بالكانفاس
 * @param {object} bird - كائن الطائر الذي يحتوي على الموقع والحجم
 */
function drawDate(ctx, bird) {
    // ======== 1. رسم جسم التمرة (الشكل البيضاوي) ========
    ctx.beginPath(); // بدء مسار رسم جديد
    ctx.fillStyle = '#8B4513'; // لون بني شبيه بلون التمر

    // نرسم شكل بيضاوي باستخدام موقع وحجم الطائر
    ctx.ellipse(
        bird.x + bird.width / 2,  // المركز الأفقي للشكل
        bird.y + bird.height / 2, // المركز العمودي للشكل
        bird.width / 2,           // نصف العرض (لإنشاء شكل بيضاوي)
        bird.height / 2,          // نصف الارتفاع
        0,                        // لا يوجد دوران
        0,                        // زاوية البداية
        2 * Math.PI               // زاوية النهاية (دائرة كاملة)
    );
    ctx.fill(); // نملأ الشكل باللون المحدد
    ctx.closePath(); // إغلاق مسار الرسم


    // ======== 2. رسم قمع التمرة (الجزء العلوي الصغير) ========
    ctx.beginPath();
    ctx.fillStyle = '#5C2F05'; // لون بني أغمق للقمع

    // نرسم مستطيل صغير على يسار التمرة ليمثل القمع
    ctx.fillRect(
        bird.x,                          // يبدأ من الحافة اليسرى للتمرة
        bird.y + (bird.height / 2) - 4,  // يتوسط ارتفاع التمرة
        6,                               // عرض القمع
        8                                // ارتفاع القمع
    );
    ctx.closePath();
}

// 6. دالة تحديث اللعبة (Game Loop)
function gameLoop() {
    // تحديث موقع الطائر بناءً على الجاذبية
    bird.velocityY += bird.gravity;
    bird.y += bird.velocityY;

    // مسح الشاشة في كل إطار لإعادة الرسم
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // رسم الطائر في موقعه الجديد
    // داخل دالة gameLoop - السطر الجديد
drawDate(ctx, bird);

    // طلب تكرار الدالة مع الإطار التالي للأنميشن
    requestAnimationFrame(gameLoop);
}

// 7. بدء تشغيل حلقة اللعبة
gameLoop();
