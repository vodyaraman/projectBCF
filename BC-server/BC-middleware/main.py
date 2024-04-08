from bot import bot

@bot.message_handler(commands=['start'])
def handle_start(message):
    chat_id = message.chat.id
    bot.send_message(chat_id, "Привет! Спасибо за начало общения с ботом!")

@bot.message_handler(func=lambda message: True)
def handle_message(message):
    bot.reply_to(message, "Я не знаю, что с этим делать. Пожалуйста, используйте команду /start или /send_all.")

def handle_polling():
    print("Начинаю прослушку")
    bot.infinity_polling()







