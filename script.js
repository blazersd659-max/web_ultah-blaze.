const SUPABASE_URL = "https://aqcbhwpjksdjiufmyups.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__-HBqwYeccm2vmr50yWabg_s2Q1h83J";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

/* =========================
   START WEBSITE
========================= */

function startWebsite() {

    // Scroll ke bagian intro
    document.querySelector(".intro").scrollIntoView({
        behavior: "smooth"
    });

    // Confetti kecil
    createConfetti(25);
}


/* =========================
   SURPRISE
========================= */

function openGift() {

    const message =
        document.getElementById("surpriseMessage");

    const gift =
        document.getElementById("gift");


    message.classList.toggle("show");


    if (message.classList.contains("show")) {

        gift.innerHTML = "🎉";

        createConfetti(40);

    } else {

        gift.innerHTML = "🎁";

    }
}


/* =========================
   TEXTAREA COUNTER
========================= */

const wish =
    document.getElementById("wish");

const count =
    document.getElementById("count");


wish.addEventListener("input", function () {

    count.textContent =
        wish.value.length;

});


/* =========================
   SEND WISH
========================= */

async function sendWish() {

    const text = wish.value.trim();

    if (text === "") {
        alert("Tulis pesanmu dulu yaa 💗");
        return;
    }

    const button =
        document.querySelector(".wish-box .main-button");

    button.disabled = true;
    button.textContent = "Menyimpan... 💌";

    try {

        const { error } = await supabaseClient
            .from("messages")
            .insert([
                {
                    message: text
                }
            ]);

        if (error) {
            throw error;
        }

        const result =
            document.getElementById("wishResult");

        const wishText =
            document.getElementById("wishText");

        wishText.textContent = text;

        result.classList.add("show");

        wish.value = "";
        count.textContent = "0";

        createConfetti(60);

        setTimeout(() => {
            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 200);

    } catch (error) {

        console.error(error);

        alert(
            "Yahh, pesanannya gagal disimpan 😭\nCoba lagi yaa!"
        );

    } finally {

        button.disabled = false;
        button.textContent = "Pesanmu Tersimpan 💗";

    }
}


/* =========================
   CONFETTI
========================= */

function createConfetti(amount = 30) {

    const symbols = [
        "💗",
        "💜",
        "✨",
        "⭐",
        "🌸",
        "🎉",
        "💕"
    ];


    for (let i = 0; i < amount; i++) {

        const confetti =
            document.createElement("div");


        confetti.innerHTML =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        confetti.style.position = "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top =
            "-30px";

        confetti.style.fontSize =
            Math.random() * 20 + 15 + "px";

        confetti.style.zIndex = "999";

        confetti.style.pointerEvents =
            "none";


        const duration =
            Math.random() * 3 + 2;


        confetti.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ],

            {
                duration:
                    duration * 1000,

                easing:
                    "cubic-bezier(.2,.8,.3,1)"
            }

        );


        document.body.appendChild(confetti);


        setTimeout(() => {

            confetti.remove();

        }, duration * 1000);

    }

}


/* =========================
   FINAL HEART EXPLOSION
========================= */

function heartExplosion() {

    const container =
        document.getElementById(
            "heartContainer"
        );


    const hearts = [
        "💗",
        "💖",
        "💕",
        "💓",
        "💞",
        "💘",
        "💝"
    ];


    // Membuat banyak hati
    for (let i = 0; i < 80; i++) {

        const heart =
            document.createElement("div");


        heart.classList.add("heart");


        heart.innerHTML =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.animationDuration =
            Math.random() * 3 + 3 + "s";


        heart.style.animationDelay =
            Math.random() * 1.5 + "s";


        heart.style.fontSize =
            Math.random() * 25 + 15 + "px";


        container.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 6000);

    }


    // Confetti
    createConfetti(100);

}


/* =========================
   AUTO START LITTLE HEARTS
========================= */

setInterval(() => {

    const finalSection =
        document.querySelector(
            ".final-section"
        );


    if (!finalSection)
        return;


    const heart =
        document.createElement("div");


    heart.classList.add("heart");

    heart.innerHTML = "💗";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.animationDuration =
        Math.random() * 3 + 4 + "s";


    heart.style.fontSize =
        Math.random() * 20 + 15 + "px";


    finalSection.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 7000);


}, 1200);