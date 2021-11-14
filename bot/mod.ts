import { Bot } from "./deps.ts"
import { buildCommands } from "./commands.ts"

const token = Deno.env.get("BOT_TOKEN") as string
const bot = new Bot(token)
const adminChatId = 1768713296

buildCommands(bot)

bot.on("message", async (context) => {
  const text = context.msg.text
  const chatId = context.msg.chat.id
  const messageId = context.msg.message_id

  const isMessageFromAdmin = () => chatId === adminChatId

  if (!text) return

  // handle replied messages from admin
  if (isMessageFromAdmin() && context.msg.reply_to_message) {
    const senderChatId = context.msg.reply_to_message.forward_from!.id
    await context.api.sendMessage(senderChatId, text)
    return
  }

  // forward all messages to admin
  await context.api.forwardMessage(adminChatId, chatId, messageId)
})

bot.start()
