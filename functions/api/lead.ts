export interface Env {
    TELEGRAM_BOT_TOKEN: string
    TELEGRAM_CHAT_ID: string
}

export const onRequest: PagesFunction<Env> = async ({request, params, env}) => {
    console.log("request.url:", request.url)
    console.log("env:", env.TELEGRAM_BOT_TOKEN)

    if (request.method !== "POST") {
        return new Response("Method Not Allowed", {status: 405})
    }

    try {
        const body = await request.json()
        const email = String(body.email || "").trim().toLowerCase()
        // // Basic email validation
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        const metadata = body.metadata || {}
        const utmFields = [
            ['Source', metadata.utm_source],
            ['Medium', metadata.utm_medium],
            ['Campaign', metadata.utm_campaign],
            ['Content', metadata.utm_content],
            ['Term', metadata.utm_term]
        ]
        const hasUtms = utmFields.some(([_, value]) => value)

        let text = `👾 Text Humanizer Lead\nEmail: ${email}`
        if (hasUtms) {
            text += `\n🎯 *UTM Tags:*\n`
            utmFields.forEach(([label, value]) => {
                if (value) text += `  ▫️ ${label}: ${value}\n`
            })
        }
        const telegramURL = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`


        const tgResponse = await fetch(telegramURL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                chat_id: env.TELEGRAM_CHAT_ID,
                text
            }),
        })

        if (!tgResponse.ok) {
            return new Response("Telegram error", {status: 500})
        }

        return new Response(
            JSON.stringify({success: true}),
            {status: 200, headers: {"Content-Type": "application/json"}}
        )

    } catch {
        return new Response("Server error", {status: 500})
    }
}
