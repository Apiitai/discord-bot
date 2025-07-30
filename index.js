require("dotenv").config();
const { Client } = require("discord.js-selfbot-v13");
const express = require("express");
const app = express();

// ======= Express serwer — żeby Replit nie zasypiał =======
app.get("/", (req, res) => {
    res.send("Bot działa 🟢");
});

app.listen(3000, () => {
    console.log("Express serwer wystartował na porcie 3000");
});

// ======= Selfbot Discord =======
const client = new Client();

client.on("ready", async () => {
    console.log(`✅ Zalogowano jako ${client.user.tag}`);

    let channel;
    try {
        channel = await client.channels.fetch(process.env.BUMP_CHANNEL);
    } catch (err) {
        console.error(
            "❌ Nie udało się pobrać kanału. Sprawdź BUMP_CHANNEL:",
            err,
        );
        process.exit(1);
    }

    async function bump() {
        try {
            await channel.sendSlash("302050872383242240", "bump");
            console.count("✅ Bump wysłany!");
        } catch (err) {
            console.error("❌ Błąd podczas bumpa:", err);
        }
    }

    function loop() {
        const randomTime =
            Math.floor(Math.random() * (9000000 - 7200000 + 1)) + 7200000; // 2–2.5h
        setTimeout(async () => {
            await bump();
            loop();
        }, randomTime);
    }

    await bump(); // pierwsze bumpnięcie od razu
    loop(); // uruchomienie pętli
});

client.login(process.env.TOKEN);
