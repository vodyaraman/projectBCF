import sys

print("Скрипт Python запущен и ожидает получения данных...")

def send_review_to_telegram(review):
    from handle_send_all import handle_send_all
    handle_send_all(message=review)


try:
    data = sys.stdin.buffer.readline().decode('utf-8').strip()
    send_review_to_telegram(review=data)
except Exception as e:
    print("Ошибка при чтении данных из стандартного ввода:", e)


