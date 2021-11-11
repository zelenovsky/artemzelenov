import { Bot } from "./deps.ts"
import { resultsText, aboutText, neededText, notNeededText } from "./texts.ts"

const token = Deno.env.get("BOT_TOKEN") as string
const bot = new Bot(token)

bot.command("start", (context) => {
  const userName = context.message?.from?.first_name ?? "Незнакомец"
  context.reply(`Привет, ${userName}!`)
})

bot.command("needed", async (context) => {
  await context.reply(neededText, { parse_mode: "HTML" })
})

bot.command("not_needed", async (context) => {
  await context.reply(notNeededText, { parse_mode: "HTML" })
})

bot.command("results", async (context) => {
  await context.reply(resultsText, { parse_mode: "HTML" })
})

bot.command("process", async (context) => {
  await context.reply("test deno deploy, тут будет видос", { parse_mode: "HTML" })
})

bot.command("about", async (context) => {
  await context.reply(aboutText, { parse_mode: "HTML" })
})

bot.start()
