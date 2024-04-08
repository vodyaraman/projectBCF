CHAT_ID_FILE = r'C:\Users\user\Desktop\projectBCF\projectBCF\BC-middleware\chat_id.txt'


def read_chat_ids():
    chat_ids = []
    print("читаю сообщения")
    with open(CHAT_ID_FILE, 'r') as f:
        for line in f:
            chat_ids.append(int(line.strip()))
    return chat_ids


def write_chat_id(chat_id):
    chat_ids = read_chat_ids()
    if chat_id not in chat_ids:
        with open(CHAT_ID_FILE, 'a') as f:
            f.write(str(chat_id) + '\n')
