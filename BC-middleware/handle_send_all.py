from bot import bot
from handle_chat_ids import read_chat_ids

def handle_send_all(message):
    chat_ids = read_chat_ids()
    print("отправляю сообщения")
    for chat_id in chat_ids:
        bot.send_message(chat_id=chat_id, text=message)
    exit(0)
